import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import TaskDetails from "../components/TaskDetails";
import data from "../data/db.json";
const TaskPage = () => {
  const { id } = useParams();

  // const tasks = JSON.parse(localStorage.getItem('tasks'))
  const { tasks } = useFetch();
  const task = tasks ? tasks.find((tsk) => tsk.id === id) : null;
  const handleAcceptTask = () => {};
  return (
    <div className="task-page container">
      {!task && (
        <div style={{ color: "green", textAlign: "center", fontSize: "18px" }}>
          Loading ...{" "}
        </div>
      )}
      {task && <TaskDetails tasks={task} onAccept={handleAcceptTask} />}
    </div>
  );
};

export default TaskPage;
