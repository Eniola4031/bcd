import { useEffect, useState } from "react";
import { data } from "../data/db.json";

const useFetch = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const fetchData = () => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
          setTasks(storedTasks);
        }
      };

      fetchData();
    }, 1000);
  }, []);

  return { tasks };
};

export default useFetch;
