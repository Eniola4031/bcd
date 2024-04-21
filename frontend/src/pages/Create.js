import { ethers, formatEther, parseEther } from "ethers";
import { useState } from "react";
import {useHistory} from 'react-router-dom'
import abi from '../abi/MicroTaskAbi.json'

const Create = () => {
  const [title, setTitle] = useState('')
  const [skills, setSkills] = useState([])
  const [days, setDays] = useState([])
  const [description, setDescription] = useState('')
  const [reward, setReward] = useState(1)
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()

  const contractAddress = '0xD8Cb8994307932623E0deC952C1e23be6Ded698A'
  const depositAmount = parseEther('0.1')
  formatEther(depositAmount)

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true);

    try {
      // Connect to the provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const daysInSeconds = days * 24 * 60 * 60; 
      // Call the createTask function on the contract
      await contract.createTask(title, description, reward, skills, daysInSeconds, { value: depositAmount });

      setIsPending(false);
      history.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
      setIsPending(false);
    }
  };

  return (
    <div className="create container">
      <h2>Create a new Task</h2>
      <div className="connect-acc">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="Enter a title for your task"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="skills">
            Required skills
            <input
              type="text"
              name="skills"
              id="skills"
              value={skills}
              placeholder="Enter list of skills seperated by comma (JAVA, Android, Phython)"
              required
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          <label htmlFor="days">
            Days to complete project
            <input
              type="number"
              name="days"
              id="days"
              value={days}
              placeholder="How many days is required to complete this task?"
              required
              onChange={(e) => setDays(e.target.value)}
            />
          </label>
          <label htmlFor="reward">
            Preferred reward
            <input
              type="number"
              name="reward"
              id="reward"
              value={reward}
              placeholder="Enter the reward you want to give for this task)"
              min={0}
              required
              onChange={(e) => setReward(e.target.value)}
            />
          </label>
          <label htmlFor="desc">
            Description
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="15"
              value={description}
              placeholder="Enter a short description for your task"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          <div
            className="create-cancel"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button type="submit" className="btn">
              Cancel
            </button>
            {isPending && <button type="submit" className="cta-button btn">Creating...</button>}
            {!isPending && <button type="submit" className="cta-button btn">Create</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
