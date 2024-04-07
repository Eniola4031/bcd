import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className='hero container'>
      <h2>Unlock Your Earnings Potential</h2>
      <p>Get Paid Instantly for Quick Tasks in Cryptocurrency!</p>
      <p className="small">
        BCD is a micro-task marketplace where you can earn
        cryptocurrency for completing small, quick tasks. Whether you're a
        freelancer looking for flexible work opportunities or an employer
        seeking efficient task completion, we've got you covered. Start earning
        today!
      </p>
      <div className='hero-actions'>
        <Link href='/' className='btn cta-button connect'>
          Create New Task
        </Link>
        <Link to='/explore' className='btn explore'>
          Browse Tasks
        </Link>
      </div>
    </div>
  );
};

export default Hero;
