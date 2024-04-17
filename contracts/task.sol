// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC20 token standard
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MicrotaskMarketplace {
    // Structure to represent a microtask
    struct Task {
        uint256 id;
        address payable employer;
        address payable freelancer;
        string description;
        uint256 reward; // ERC20 token
        address acceptedToken; // Address of ERC20 token accepted 
        bool completed;
    }

    // Mapping of task id to Task struct
    mapping(uint256 => Task) public tasks;

    // Event to notify of a new task being created
    event TaskCreated(uint256 taskId, address employer, string description, uint256 reward, address acceptedToken);

    // Event to notify of a task being marked completed
    event TaskCompleted(uint256 taskId, address freelancer);

    // Modifier to restrict functions to registered employers (simple example, not production-ready)
    modifier onlyEmployer() {
        require(msg.sender != address(0), "Only registered employer can call this function");
        _;
    }

    // Function to create a new microtask
    function createTask(
        string memory _description,
        uint256 _reward,
        address _acceptedToken // Address of ERC20 token or 0 for Etherlink
    ) public payable onlyEmployer {
        // Ensure employer has deposited enough funds (Etherlink or ERC20)
        if (_acceptedToken == address(0)) {
            require(msg.value >= _reward, "Insufficient Etherlink deposited");
        } else {
            IERC20 token = IERC20(_acceptedToken);
            require(token.transferFrom(msg.sender, address(this), _reward), "Failed to transfer ERC20 token");
        }

        uint256 taskId = tasks.length + 1; // Generate unique task ID
        tasks[taskId] = Task(taskId, payable(msg.sender), payable(address(0)), _description, _reward, _acceptedToken, false);
        emit TaskCreated(taskId, msg.sender, _description, _reward, _acceptedToken);
    }

    // Function for freelancer to accept a task
    function acceptTask(uint256 _taskId) public {
        Task storage task = tasks[_taskId];
        require(!task.completed, "Task is already completed");
        require(task.freelancer == address(0), "Task is already assigned");
        task.freelancer = payable(msg.sender);
    }

    // Function for freelancer to mark a task as completed
    function completeTask(uint256 _taskId) public {
        Task storage task = tasks[_taskId];
        require(task.freelancer == msg.sender, "Only assigned freelancer can mark task complete");
        require(!task.completed, "Task is already completed");
        task.completed = true;
        emit TaskCompleted(_taskId, msg.sender);
    }

    // Function for employer to release payment upon successful completion
    function releasePayment(uint256 _taskId) public onlyEmployer {
        Task storage task = tasks[_taskId];
        require(task.completed, "Task is not yet completed");

        if (task.acceptedToken == address(0)) {
            task.freelancer.transfer(task.reward);
        } else {
            IERC20 token = IERC20(task.acceptedToken);
            token.transfer(task.freelancer, task.reward);
        }
    }
}