import { Link } from "react-router-dom";

const Feature = () => {
  const tasks = [
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "10",
      id: 1,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "15",
      id: 2,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "20",
      id: 3,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "50",
      id: 4,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "100",
      id: 5,
    },
    {
      title: "Data Entry",
      description: "Enter data into a spreadsheet. Must be detail-oriented.",
      payment: "40",
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
            <div>
              <p className='task-payment'>{task.payment} USD</p>
              <button className='btn cta-button'>Apply now</button>
            </div>
          </div>
        ))}
      </section>
      <Link to="/" className="btn more">Explore More</Link>
    </div>
  );
};

export default Feature;
