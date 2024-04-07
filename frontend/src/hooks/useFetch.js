import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [tasks, setTasks] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url, { mode: "cors" })
        .then((res) => {
          if (!res.ok) {
            throw Error("resources cannot be fetched");
          }
          return res.json();
        })
        .then((result) => {
          setIsPending(false);
          setTasks(result);
          setError(null)
        })
        .catch((err) => {
          setError(err.message);
          setIsPending(false)
        });
    }, 1000);
  }, [url]);

  return { tasks, isPending, error };
};

export default useFetch;
