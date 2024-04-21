import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import TaskInfo from "../components/TaskDetails";
import { useEffect, useState } from "react";
const TaskPage = () => {

  const { id } = useParams();
  const { tasks, error, isPending } = useFetch('getTask', id);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      // Check if MetaMask is installed
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Set the current user
          setCurrentUser(accounts[0]);
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }
    }

    getCurrentUser();
  }, []);
  return (
    <div className="task-page container">
      {isPending && (
        <div style={{ color: "green", textAlign: "center", fontSize: "18px" }}>
          Loading ...{" "}
        </div>
      )}
      {error && (
        <div style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
          {error}
        </div>
      )}
      {tasks && <TaskInfo task={tasks} currentUser={currentUser} />}
    </div>
  );
};

export default TaskPage;
