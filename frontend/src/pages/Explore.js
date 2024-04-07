import { useState } from "react";
import Tasks from "../components/Tasks";
import useFetch from "../hooks/useFetch";

const Explore = () => {
  const { tasks, isPending, error } = useFetch("http://localhost:8000/tasks");
  const [endIndex, setEndIndex] = useState(6);
  const latest = [];

  const getLatestTAsks = () => {
    for (let i = tasks.length - 1; i > 0; i--) {
      latest.push(tasks[i]);
    }
    return latest;
  };

  const handleExploreMore = () => {
    setEndIndex(endIndex + 3);
  };
  return (
    <div className='explore-container container'>
      <div className='latest'>
        <div className='latest-top'>
          <h3>Latest Tasks</h3>
          <div></div>
        </div>
        <div className='row'>
          {isPending && (
            <div
              style={{ color: "green", textAlign: "center", fontSize: "18px" }}>
              Loading ...
            </div>
          )}
          {error && (
            <div
              style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
              {error}
            </div>
          )}
          {tasks && <Tasks tasks={getLatestTAsks()} endIndex={3} />}
        </div>
      </div>
      <div className='all'>
        <div className='all-top'>
          <h3>All Tasks</h3>
          <div></div>
        </div>
        <div className='row'>
          {isPending && (
            <div
              style={{ color: "green", textAlign: "center", fontSize: "18px" }}>
              Loading ...
            </div>
          )}
          {error && (
            <div
              style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
              {error}
            </div>
          )}
          {tasks && <Tasks tasks={tasks} endIndex={endIndex} />}
        </div>
      </div>
      <button
        className='btn'
        style={{ alignSelf: "center" }}
        onClick={handleExploreMore}>
        Explore more
      </button>
    </div>
  );
};

export default Explore;
