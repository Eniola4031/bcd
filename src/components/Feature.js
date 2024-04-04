import { Link } from "react-router-dom";

const Feature = () => {
  const tasks = [
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "$10 in cryptocurrency",
      id: 1,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "$15 in cryptocurrency",
      id: 2,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "$20 in cryptocurrency",
      id: 3,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "$50 in cryptocurrency",
      id: 4,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "$100 in cryptocurrency",
      id: 5,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "$40 in cryptocurrency",
      id: 6,
    },
  ];
  return (
    <div className='featured-tasks-cont container'>
      <h2 className='section-heading'>Featured Tasks</h2>
      <section className='featured-tasks row'>
        {tasks.map((task, index) => (
          <div className='task-card' key={index}>
            <h3 className='task-title'>{task.title}</h3>
            <p className='task-description'>{task.description}</p>
            <p className='task-payment'>Payment: {task.payment}</p>
            <button className='btn cta-button'>Apply</button>
          </div>
        ))}
      </section>
      <Link to="/" className="btn more">Explore More</Link>
    </div>
  );
};

export default Feature;
