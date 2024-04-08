pragma solidity ^0.8.0;

// Define a token interface (replace with your specific token contract address)
interface Token {
  function transferFrom(address from, address to, uint amount) external;
  function balanceOf(address account) external view returns (uint);
}

contract MicroTask {

  // Struct to store details of a micro-task
  struct Task {
    uint id;
    address payable employer;
    string description;
    string skillsRequired;
    uint deadline; // Unix timestamp
    uint reward; // Amount in Wei (or token amount)
    bool completed;
    address payable worker; // Worker who accepted the task
  }

  // Mapping to store tasks with their unique IDs
  mapping(uint => Task) public tasks;

  // Counter for assigning unique IDs to tasks
  uint public taskCount;

  // Token address for platform token (if applicable)
  address public tokenAddress;

  // Mapping to store user reputation scores (can be extended for different categories)
  mapping(address => uint) public reputation;

  // Function to create a new micro-task
  function createTask(string memory _description, string memory _skillsRequired, uint _deadline, uint _reward, address _tokenAddress) public payable {
    require(_deadline > block.timestamp, "Deadline must be in the future");
    if (_tokenAddress != address(0)) { // Check if token address is provided
      require(Token(_tokenAddress).balanceOf(msg.sender) >= _reward, "Insufficient token balance");
    } else {
      require(msg.value >= _reward, "Insufficient funds provided for reward");
    }

    tasks[taskCount] = Task(taskCount, msg.sender, _description, _skillsRequired, _deadline, _reward, false, address(0));
    taskCount++;
    tokenAddress = _tokenAddress; // Store token address if provided
  }

  // Function to allow workers to accept a task
  function acceptTask(uint _taskId) public {
    Task storage task = tasks[_taskId];
    require(!task.completed, "Task already completed");
    require(task.employer != msg.sender, "Employer cannot accept their own task");
    task.worker = msg.sender;
  }

  // Function to allow employers to mark a task as completed and release payment, also update worker reputation
  function completeTask(uint _taskId, uint _rating) public {
    Task storage task = tasks[_taskId];
    require(task.employer == msg.sender, "Only employer can complete their task");
    require(!task.completed, "Task already completed");
    require(block.timestamp > task.deadline, "Task deadline not reached yet");
    require(task.worker != address(0), "No worker has accepted the task");

    task.completed = true;
    if (tokenAddress != address(0)) { // Transfer tokens if using token system
      Token(tokenAddress).transferFrom(msg.sender, task.worker, task.reward);
    } else {
      task.worker.transfer(task.reward); // Transfer Wei if no token used
    }

    // Update worker reputation based on rating (adjust logic as needed)
    reputation[task.worker] += _rating; // Simple example, consider weighted ratings
  }

  // Function to retrieve details of a specific task
  function getTask(uint _taskId) public view returns (Task memory) {
    return tasks[_taskId];
  }

  // Function to get a user's reputation score
  function getReputation(address _user) public view returns (uint) {
    return reputation[_user];
  }

}
pragma solidity ^0.8.0;

// Import ERC20 interface from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MicroTask {

  // Struct to store details of a micro-task
  struct Task {
    uint id;
    address payable employer;
    string description;
    string skillsRequired;
    uint deadline; // Unix timestamp
    uint reward; // Amount in Wei (or token amount)
    bool completed;
    address payable worker; // Worker who accepted the task
  }

  // Mapping to store tasks with their unique IDs
  mapping(uint => Task) public tasks;

  // Counter for assigning unique IDs to tasks
  uint public taskCount;

  // Token address for platform token (if applicable)
  address public tokenAddress;

  // Mapping to store user reputation scores (can be extended for different categories)
  mapping(address => uint) public reputation;

  // Function to create a new micro-task
  function createTask(string memory _description, string memory _skillsRequired, uint _deadline, uint _reward, address _tokenAddress) public payable {
    require(_deadline > block.timestamp, "Deadline must be in the future");
    if (_tokenAddress != address(0)) { // Check if token address is provided
      require(IERC20(_tokenAddress).balanceOf(msg.sender) >= _reward, "Insufficient token balance");
    } else {
      require(msg.value >= _reward, "Insufficient funds provided for reward");
    }

    tasks[taskCount] = Task(taskCount, msg.sender, _description, _skillsRequired, _deadline, _reward, false, address(0));
    taskCount++;
    tokenAddress = _tokenAddress; // Store token address if provided
  }

  // Function to allow workers to accept a task
  function acceptTask(uint _taskId) public {
    Task storage task = tasks[_taskId];
    require(!task.completed, "Task already completed");
    require(task.employer != msg.sender, "Employer cannot accept their own task");
    task.worker = msg.sender;
  }

  // Function to allow employers to mark a task as completed and release payment, also update worker reputation
  function completeTask(uint _taskId, uint _rating) public {
    Task storage task = tasks[_taskId];
    require(task.employer == msg.sender, "Only employer can complete their task");
    require(!task.completed, "Task already completed");
    require(block.timestamp > task.deadline, "Task deadline not reached yet");
    require(task.worker != address(0), "No worker has accepted the task");

    task.completed = true;
    if (tokenAddress != address(0)) { // Transfer tokens if using token system
      IERC20(tokenAddress).transferFrom(msg.sender, task.worker, task.reward);
    } else {
      task.worker.transfer(task.reward); // Transfer Wei if no token used
    }

    // Update worker reputation based on rating (adjust logic as needed)
    reputation[task.worker] += _rating; // Simple example, consider weighted ratings
  }

  // Function to retrieve details of a specific task
  function getTask(uint _taskId) public view returns (Task memory) {
    return tasks[_taskId];
  }

  // Function to get a user's reputation score
  function getReputation(address _user) public view returns (uint) {
    return reputation[_user];
  }

}
