import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import TaskDetails from "../components/TaskDetails";

const TaskPage = () => {
  const { id } = useParams();
  const { tasks, isPending, error } = useFetch("http://localhost:8000/tasks/" + id);
  return (
    <div className='task-page container'>
      {isPending && <div style={{color: 'green', textAlign: "center", fontSize: '18px'}}>Loading ... </div>}
      {error && <div style={{color: 'red', textAlign: "center", fontSize: '18px'}}>{error}</div>}
      {tasks && <TaskDetails tasks={tasks}/>}
    </div>
  );
};

export default TaskPage;
