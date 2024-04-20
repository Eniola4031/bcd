// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EtherlinkToken.sol";

contract Microtask {
    struct Task {
        uint256 id;
        string description;
        uint256 reward;
        string skillRequired;
        address employer;
        address freelancer;
        uint256 deadline;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public nextTaskId;

    address public etherlinkTokenAddress;
    uint256 public depositAmount = 0.1 ether;

    event TaskCreated(uint256 id, string description, uint256 reward, string skillRequired, address indexed employer);
    event TaskAccepted(uint256 id, address indexed freelancer);
    event PaymentReleased(uint256 id, address indexed freelancer, uint256 amount);
    event TaskCompleted(uint256 id, address indexed freelancer);

    constructor(address _etherlinkTokenAddress) {
        etherlinkTokenAddress = _etherlinkTokenAddress;
    }

    modifier onlyEmployer(uint256 _taskId) {
        require(msg.sender == tasks[_taskId].employer, "Only employer can perform this action");
        _;
    }

    modifier onlyFreelancer(uint256 _taskId) {
        require(msg.sender == tasks[_taskId].freelancer, "Only freelancer can perform this action");
        _;
    }

    function createTask(string memory _description, uint256 _reward, string memory _skillRequired, uint256 _deadline) external payable {
        require(msg.value >= depositAmount, "Insufficient deposit");
        
        uint256 taskId = nextTaskId++;
        tasks[taskId] = Task({
            id: taskId,
            description: _description,
            reward: _reward,
            skillRequired: _skillRequired,
            employer: msg.sender,
            freelancer: address(0),
            deadline: block.timestamp + _deadline,
            completed: false
        });
        
        emit TaskCreated(taskId, _description, _reward, _skillRequired, msg.sender);
    }

    function acceptTask(uint256 _taskId) external {
        Task storage task = tasks[_taskId];
        require(task.freelancer == address(0), "Task already accepted");
        task.freelancer = msg.sender;
        emit TaskAccepted(_taskId, msg.sender);
    }

    function releasePayment(uint256 _taskId) external onlyEmployer(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.completed, "Task not completed");
        require(block.timestamp > task.deadline, "Deadline not reached");

        uint256 amount = task.reward;
        payable(task.freelancer).transfer(amount);
        emit PaymentReleased(_taskId, task.freelancer, amount);
    }

    function completeTask(uint256 _taskId) external onlyFreelancer(_taskId) {
        Task storage task = tasks[_taskId];
        require(!task.completed, "Task already completed");
        task.completed = true;
        emit TaskCompleted(_taskId, msg.sender);
    }
}
