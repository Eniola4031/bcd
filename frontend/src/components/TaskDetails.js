import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/MicroTaskAbi.json';
import { useParams } from "react-router-dom";
import { useAccount } from 'wagmi';

const TaskInfo = ({ task, currentUser }) => {
  const {address, isConnecting, isDisconnected} = useAccount()
  const { id } = useParams();
  const contractAddress = "0xD8Cb8994307932623E0deC952C1e23be6Ded698A";

  const truncateAddress = (address) => {
    if (typeof address === "string") {
      const prefix = address.substring(0, 6);
      const suffix = address.substring(address.length - 4);
      return `${prefix}...${suffix}`;
    } else {
      return ""; // or some default value if address is not a string
    }
  };

  const handleAccept = async () => {
    try {
    
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Call the acceptTask function on the contract
        await contract.acceptTask(id);

        // Update state and UI
        console.log("Task accepted successfully!");
    } catch (error) {
      console.error("Error accepting task:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleComplete = async () => {
    try {
    
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        // Call the makePayment function on the contract
        await contract.completeTask(id);

    } catch (error) {
      console.error("Error making payment:", error);
      // Optionally, you can show an error message to the user
    }
  };

  const handleButtonClick = async () => {
    try {
    
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Call the makePayment function on the contract
      await contract.releasePayment(id);

  } catch (error) {
    console.error("Error making payment:", error);
    // Optionally, you can show an error message to the user
  }
  }

  const renderDeadline = (deadlineInSeconds) => {
    const deadlineInDays = Math.ceil(
      (deadlineInSeconds - Date.now() / 1000) / (24 * 60 * 60)
    ); // Convert seconds to days
    return `${deadlineInDays} day${deadlineInDays !== 1 ? "s" : ""}`;
  };
  return (
    <div className="tasks-info">
      <div className="tasks-container">
        <div className="cancel-tasks">X</div>
        <div className="img-name">
          <p>{truncateAddress(task.employer)}</p>
        </div>
        <div className="tasks-card">
          <div className="texts">
            <p className="title" style={{ fontWeight: 600, color: "#ffffff" }}>
              {task.title}
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#FFFFFFCC",
                fontWeight: 400,
              }}
            >
              {task.description}
            </p>
          </div>
          <div className="skills-req">
            <p
              style={{
                fontSize: "1.125rem",
                color: "#FFFFFFCC",
                fontWeight: 400,
              }}
            >
              Skills required:
            </p>
            <div className="skills">
              {typeof task.skillRequired === "string" &&
                task.skillRequired.split(",").map((skill, index) => (
                  <p key={index} className="skill">
                    {skill}
                  </p>
                ))}
            </div>
          </div>
          <div className="pay-btn">
            <p className="task-payment">{parseInt(task.reward)} XTZ</p>
            <p>{task.completed ? 'Task has been completed' : renderDeadline(parseInt(task.deadline))}</p>
            {address !== task.employer && <button 
              className="btn cta-button" 
              onClick={task.accepted ? handleComplete : handleAccept} 
              disabled={task.completed}
            >
              {task.accepted ? (task.completed ? 'Completed' : 'Complete Task') : "Accept Task"}
            </button>}
            {task.completed && address === task.employer && 
              <button className="btn cta-button"  onClick={handleButtonClick}>Approve Payment</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
