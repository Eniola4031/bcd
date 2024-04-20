const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MicrotaskManagement", function () {
  let MicrotaskManagement;
  let microtaskManagement;
  let EtherlinkToken;
  let etherlinkToken;
  let owner;
  let employer;
  let freelancer;

  beforeEach(async function () {
    [owner, employer, freelancer] = await ethers.getSigners();

    // Deploy EtherlinkToken
    EtherlinkToken = await ethers.getContractFactory("EtherlinkToken");
    etherlinkToken = await EtherlinkToken.deploy(10000);

    // Deploy MicrotaskManagement
    MicrotaskManagement = await ethers.getContractFactory("MicrotaskManagement");
    microtaskManagement = await MicrotaskManagement.deploy(etherlinkToken.address);

    // Mint some tokens for employer and freelancer
    await etherlinkToken.connect(owner).transfer(employer.address, 1000);
    await etherlinkToken.connect(owner).transfer(freelancer.address, 1000);
  });

  it("should create a task", async function () {
    await etherlinkToken.connect(employer).approve(microtaskManagement.address, 100);
    await microtaskManagement.connect(employer).createTask("Task Description", 100, "Skill", 1000);
    const task = await microtaskManagement.tasks(0);
    expect(task.id).to.equal(0);
    expect(task.description).to.equal("Task Description");
    expect(task.reward).to.equal(100);
    expect(task.skillRequired).to.equal("Skill");
    expect(task.employer).to.equal(employer.address);
    expect(task.freelancer).to.equal("0x0000000000000000000000000000000000000000"); // freelancer should be empty initially
    expect(task.deadline).to.be.above(0);
    expect(task.completed).to.be.false;
  });

  it("should accept a task", async function () {
    await etherlinkToken.connect(employer).approve(microtaskManagement.address, 100);
    await microtaskManagement.connect(employer).createTask("Task Description", 100, "Skill", 1000);
    await microtaskManagement.connect(freelancer).acceptTask(0);
    const task = await microtaskManagement.tasks(0);
    expect(task.freelancer).to.equal(freelancer.address);
  });

  it("should release payment for a completed task", async function () {
    await etherlinkToken.connect(employer).approve(microtaskManagement.address, 100);
    await microtaskManagement.connect(employer).createTask("Task Description", 100, "Skill", 1000);
    await microtaskManagement.connect(freelancer).acceptTask(0);
    await ethers.provider.send("evm_increaseTime", [2000]); // Increase time to pass deadline
    await ethers.provider.send("evm_mine"); // Mine a new block to update the blockchain's state
    await microtaskManagement.connect(employer).releasePayment(0);
    const freelancerBalance = await etherlinkToken.balanceOf(freelancer.address);
    expect(freelancerBalance).to.equal(100); // assuming no gas fees deducted
  });

  it("should complete a task", async function () {
    await etherlinkToken.connect(employer).approve(microtaskManagement.address, 100);
    await microtaskManagement.connect(employer).createTask("Task Description", 100, "Skill", 1000);
    await microtaskManagement.connect(freelancer).acceptTask(0);
    await microtaskManagement.connect(freelancer).completeTask(0);
    const task = await microtaskManagement.tasks(0);
    expect(task.completed).to.be.true;
  });
});
