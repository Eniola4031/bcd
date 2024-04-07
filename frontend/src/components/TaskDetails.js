const TaskDetails = ({tasks}) => {
    return (
        <div className="task-details container">
            <article>
                <h2 className="task-title">{tasks.title}</h2>
                <p className="class-desc">{tasks.description}</p>
            </article>
        </div>
     );
}
 
export default TaskDetails;