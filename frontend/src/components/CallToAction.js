import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className='c-t-a container'>
      <section className='call-to-action'>
        <h2 className='section-title'>Join BCD Today</h2>
        <div>
          <p className='cta-description'>
            Join our decentralized micro-task marketplace today and earn
            cryptocurrency by completing quick tasks!
          </p>
          <Link to='/connect' className='btn'>
            Connect Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
