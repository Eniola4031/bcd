
const TaskDetails = ({ tasks, onAccept }) => {
  const handleAccept = () => {
    onAccept()
};

  return (
    <div className="tasks-info">
      <div className="tasks-container">
        <div className="cancel-tasks">X</div>
        <div className="img-name">
          <p>{tasks.employer}</p>
        </div>
        <div className="tasks-card">
          <div className="texts">
            <p className="title" style={{ fontWeight: 600, color: "#ffffff" }}>
              {tasks.title}
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#FFFFFFCC",
                fontWeight: 400,
              }}
            >
              {tasks.description}
            </p>
          </div>
          <div className="skills-req">
            <p
              style={{
                fontSize: "1.125rem",
                color: "#FFFFFFCC",
                fontWeight: 400,
              }}
            >
              Skills required:
            </p>
            <div className="skills">
              {tasks.skills.map((skill, index) => (
                <p key={index} className="skill">
                  {skill}
                </p>
              ))}
            </div>
          </div>
          <div className="pay-btn">
            <p className="task-payment">{tasks.reward} USD</p>
            <button
              className="btn cta-button"
              onClick={handleAccept}
            >
              {tasks.status || "Accept task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
