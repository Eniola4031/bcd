import { useState } from "react";
import {useHistory} from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('')
  const [skills, setSkills] = useState([])
  const [description, setDescription] = useState('')
  const [reward, setReward] = useState(1)
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const sortedSkills = skills.split(',')
    const task = {employer: 'New Employer', title, description, skills:sortedSkills, deadline:"", reward, isCompleted: false, worker: null, status: null}
    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(() => {
      setIsPending(true)
      history.push('/')
    })
  }
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
          <label htmlFor="reward">
            Preferred reward
            <input
              type="number"
              name="reward"
              id="reward"
              value={reward}
              placeholder="Enter the reward you want to give for this task)"
              min={1}
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
