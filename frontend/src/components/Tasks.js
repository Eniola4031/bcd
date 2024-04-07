import { Link } from "react-router-dom";

const Tasks = ({ tasks, endIndex }) => {
  const tasksToDisplay = tasks.slice(0, endIndex);
  return tasksToDisplay.map((task, index) => (
    <Link to={`tasks/${task.id}`} className='task-card' key={index}>
      <div className='title-desc'>
        <h3 className='task-title'>{task.title}</h3>
        <p className='task-description'>{task.description}</p>
      </div>
      <ul className='skills'>
        {task.skills.map((skill, ind) => (
          <li key={ind}>{skill}</li>
        ))}
      </ul>
      <div className='pay-btn'>
        <p className='task-payment'>{task.reward} USD</p>
        <button className='btn cta-button'>Apply now</button>
      </div>
    </Link>
  ));
};

export default Tasks;
