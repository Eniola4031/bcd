const Footer = () => {
  return (
    <footer className='footer'>
      <div className='foot container row'>
        <div className='brand'>
          <h1 className='logo'>
            B<span>C</span>D
          </h1>
          <p>
            Revolutionizing Task Completion with Decentralization and Direct
            Micro-Payments
          </p>
          <div className='socials'>
            <a href='/'>
              <i className='fa-brands fa-square-x-twitter'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-discord'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-telegram'></i>
            </a>
            <a href='/'>
              <i className='fa-brands fa-medium'></i>
            </a>
          </div>
        </div>
        <div className='quick-links'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href='/'>Explore</a>
            </li>
            <li>
              <a href='/'>About</a>
            </li>
            <li>
              <a href='/'>How it works</a>
            </li>
            <li>
              <a href='/'>Create</a>
            </li>
          </ul>
        </div>
        <div className='company'>
          <h3>company</h3>
          <ul>
            <li>
              <a href='/'>Terms of Service</a>
            </li>
            <li>
              <a href='/'>Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className='support'>
          <h3>Support</h3>
          <ul>
            <li>
              <a href='/'>Help</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
