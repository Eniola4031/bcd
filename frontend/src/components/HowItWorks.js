const HowItWorks = () => {
  return (
    <div className='how-it-works container'>
      <h2>How It Works</h2>
      <section className='row'>
        <div className='step'>
          <i class='fa-solid fa-magnifying-glass'></i>
          <div className='step-info'>
            <h3>Browse Available Tasks</h3>
            <p>
              Explore a variety of micro-tasks posted by users from around the
              world.
            </p>
          </div>
          <button className='btn more'>Load more</button>
        </div>
        <div className='step'>
          <i class='fa-solid fa-heart'></i>
          <div className='step-info'>
            <h3>Choose a Task</h3>
            <p>Select a task that matches your skills and interests.</p>
          </div>
          <button className='btn more'>Load more</button>
        </div>
        <div className='step'>
          <i class='fa-solid fa-bolt-lightning'></i>
          <div className='step-info'>
            <h3>Apply for the Task</h3>
            <p>Apply for the task by submitting your proposal or bid.</p>
          </div>
          <button className='btn more'>Load more</button>
        </div>
        <div className='step'>
          <i class='fa-solid fa-check-to-slot'></i>
          <div className='step-info'>
            <h3>Complete the task</h3>
            <p>
              Once accepted, complete the task according to the provided
              instructions and deadline.
            </p>
          </div>
          <button className='btn more'>Load more</button>
        </div>
        <div className='step'>
          <i class='fa-solid fa-money-check-dollar'></i>
          <div className='step-info'>
            <h3>Receive Payment</h3>
            <p>
              Receive payment in cryptocurrency upon successful completion and
              verification of the task.
            </p>
          </div>
          <button className='btn more'>Load more</button>
        </div>
        <div className='step'>
          <i class='fa-solid fa-comments'></i>
          <div className='step-info'>
            <h3>Provide Feedback</h3>
            <p>
              Optionally, provide feedback on the task completion process and
              rate the employer or worker.
            </p>
          </div>
          <button className='btn more'>Load more</button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
