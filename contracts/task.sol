//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

contract MicroTask {

  // Define a struct to store details of a micro-task
  struct Task {
    uint id;
    address payable employer;
    string description;
    string skillsRequired;
    uint deadline; // Unix timestamp
    uint reward; // Amount in Wei
    bool completed;
  }

  // Mapping to store tasks with their unique IDs
  mapping(uint => Task) public tasks;

  // Counter for assigning unique IDs to tasks
  uint public taskCount;

  // Function to create a new micro-task
  function createTask(string memory _description, string memory _skillsRequired, uint _deadline, uint _reward) public payable {
    require(_deadline > block.timestamp, "Deadline must be in the future");
    require(msg.value >= _reward, "Insufficient funds provided for reward");

    tasks[taskCount] = Task(taskCount, msg.sender, _description, _skillsRequired, _deadline, _reward, false);
    taskCount++;
  }

  // Function to allow workers to accept a task
  function acceptTask(uint _taskId) public {
    Task storage task = tasks[_taskId];
    require(!task.completed, "Task already completed");
    require(task.employer != msg.sender, "Employer cannot accept their own task");
  }

  // Function to allow employers to mark a task as completed and release payment
  function completeTask(uint _taskId) public {
    Task storage task = tasks[_taskId];
    require(task.employer == msg.sender, "Only employer can complete their task");
    require(!task.completed, "Task already completed");
    require(block.timestamp > task.deadline, "Task deadline not reached yet");

    task.completed = true;
    msg.sender.transfer(task.reward); // Transfer reward to worker's address
  }

  // Function to retrieve details of a specific task
  function getTask(uint _taskId) public view returns (Task memory) {
    return tasks[_taskId];
  }
}