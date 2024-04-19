import { useState } from "react";
import { useHistory } from 'react-router-dom';
import useFetch from "../hooks/useFetch";

const Create = () => {
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const { tasks } = useFetch();
  const [reward, setReward] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const sortedSkills = skills.split(',');
    const id = (tasks.length + 1).toString()
    const task = {
      employer: 'New Employer',
      title,
      description,
      skills: sortedSkills,
      deadline: "",
      reward,
      isCompleted: false,
      worker: null,
      id
    };

    // Update localStorage
    const updatedTasks = [...tasks, task];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      history.push('/');
    }, 1000);
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
              placeholder="Enter list of skills separated by comma (e.g., Java, Android, Python)"
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
              placeholder="Enter the reward you want to give for this task"
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
          <div className="create-cancel">
            <button type="button" className="btn" onClick={() => history.push('/')}>Cancel</button>
            <button type="submit" className="cta-button btn" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
