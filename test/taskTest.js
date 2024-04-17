const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MicrotaskMarketplace", function () {
  let marketplace;

  beforeEach(async function () {
    // Deploy the contract before each test
    const Marketplace = await ethers.getContractFactory("MicrotaskMarketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed();
  });

  describe("Task Creation", function () {
    it("Should create a new task", async function () {
      const description = "Write a blog post";
      const reward = 100; // Assuming Etherlink (0 for ERC20 token)
      const tx = await marketplace.createTask(description, reward, ethers.constants.AddressZero);
      await tx.wait();

      const taskCount = await marketplace.tasks.call();
      expect(taskCount).to.equal(1);

      const task = await marketplace.tasks(1); // Task ID starts at 1

      expect(task.description).to.equal(description);
      expect(task.reward).to.equal(reward);
      expect(task.completed).to.equal(false);
    });

    it("Should revert if insufficient Etherlink is deposited", async function () {
      const description = "Write a blog post";
      const insufficientReward = 50; // Less than the expected reward

      await expect(marketplace.createTask(description, insufficientReward, ethers.constants.AddressZero)).to.be.revertedWith("Insufficient Etherlink deposited");
    });
  });

  describe("Task Acceptance and Completion", function () {
    let taskId;
    let freelancer;

    beforeEach(async function () {
      const description = "Write a blog post";
      const reward = 100;
      const tx = await marketplace.createTask(description, reward, ethers.constants.AddressZero);
      await tx.wait();
      taskId = await marketplace.tasks.call();
      freelancer = (await ethers.getSigners())[1]; // Use the second signer as the freelancer
    });

    it("Should allow a freelancer to accept a task", async function () {
      const tx = await marketplace.connect(freelancer).acceptTask(taskId);
      await tx.wait();

      const task = await marketplace.tasks(taskId);
      expect(task.freelancer).to.equal(freelancer.address);
    });

    it("Should revert if a freelancer tries to accept a completed task", async function () {
      const tx1 = await marketplace.connect(freelancer).acceptTask(taskId);
      await tx1.wait();

      // Mark the task as completed (simulating another user)
      await marketplace.completeTask(taskId);

      await expect(marketplace.connect(freelancer).acceptTask(taskId)).to.be.revertedWith("Task is already completed");
    });

    it("Should allow a freelancer to mark a task as completed", async function () {
      const tx1 = await marketplace.connect(freelancer).acceptTask(taskId);
      await tx1.wait();

      const tx2 = await marketplace.connect(freelancer).completeTask(taskId);
      await tx2.wait();

      const task = await marketplace.tasks(taskId);
      expect(task.completed).to.equal(true);
    });

    it("Should revert if a non-assigned freelancer tries to mark a task as completed", async function () => {
      await expect(marketplace.completeTask(taskId)).to.be.revertedWith("Only assigned freelancer can mark task complete");
    });
  });

  describe("Payment Release", function () {
    let employer;
    let freelancer;
    let taskId;

    beforeEach(async function () {
      employer = (await ethers.getSigners())[0]; // Use the first signer as the employer
      freelancer = (await ethers.getSigners())[1]; // Use the second signer as the freelancer

      const description = "Write a blog post";
      const reward = 100;
      const tx = await marketplace.connect(employer).createTask(description, reward, ethers.constants.AddressZero);
      await tx.wait();
      taskId = await marketplace.tasks.call();

      const tx2 = await marketplace.connect(freelancer).acceptTask(taskId);
      await tx2.wait();

      const tx3 = await marketplace.connect(freelancer).completeTask(taskId);
      await tx3.wait();
    });

    it("Should allow employer to release payment to freelancer after task completion", async function () {
      const initialFreelancerBalance = await freelancer.getBalance();

      const tx = await marketplace.connect(employer).releasePayment(taskId);
      await tx.wait();

      const finalFreelancerBalance = await freelancer.getBalance();
      expect(finalFreelancerBalance.sub(initialFreelancerBalance)).to.equal(reward);
    });

    it("Should revert if employer tries to release payment for an incomplete task", async function () {
      await expect(marketplace.connect(employer).releasePayment(taskId)).to.be.revertedWith("Task is not yet completed");
    });
  });
});