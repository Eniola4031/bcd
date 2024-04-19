import { Link } from "react-router-dom";
import Tasks from "./Tasks";
import useFetch from "../hooks/useFetch";

const Feature = () => {
  const { tasks } = useFetch();



  const latest = [];

  const getLatestTAsks = () => {
    for (let i = tasks.length - 1; i > 0; i--) {
      latest.push(tasks[i]);
    }
    return latest;
  };

  return (
    <div className="featured-tasks-cont container">
      <h2 className="section-heading">Featured Tasks</h2>
      <div className="featured-tasks row">
        {!tasks && (
          <div
            style={{ color: "green", textAlign: "center", fontSize: "18px" }}
          >
            Loading ...
          </div>
        )}
        {tasks && <Tasks tasks={getLatestTAsks()} endIndex={6} />}{" "}
        {/* Reversing the order here */}
      </div>
      <Link to="/explore" className="btn more">
        Explore More
      </Link>
    </div>
  );
};

export default Feature;
