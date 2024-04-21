import { Link } from "react-router-dom";
import Tasks from "./Tasks";
import useFetch from "../hooks/useFetch";


const Feature = () => {
  const {tasks, isPending, error} = useFetch('getAllTasks')
  return (
    <div className='featured-tasks-cont container'>
      <h2 className='section-heading'>Featured Tasks</h2>
      <div className='featured-tasks row'>
        {isPending && <div style={{color: 'green', textAlign: "center", fontSize: '18px'}}>Loading ... </div>}
        {error && <div style={{color: 'red', textAlign: "center", fontSize: '18px'}}>{error}</div>}
        {tasks && <Tasks tasks={tasks} endIndex={6} />}
      </div>
      <Link to="/explore" className='btn more'>
        Explore More
      </Link>
    </div>
  );
};

export default Feature;
