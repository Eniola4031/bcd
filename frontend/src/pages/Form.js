const Form = () => {
  return (
    <div className='forms container'>
      <h1 className='logo'>
        B<span>C</span>D
      </h1>
      <h2>Sign in to your Account</h2>
      <div className="connect-acc">
          <form>
            <label htmlFor='email'>
              Email
              <input type='email' name='email' id='email' />
            </label>
            <label htmlFor='password'>
              Password
              <input type='password' name='password' id='password' />
            </label>
            <button type='submit' className='cta-button btn'>
              Log in
            </button>
          </form>
          <p style={{textAlign:"center", borderBottom: "1px solid #40a9ff", paddingBottom:"20px"}}>OR</p>
          <div className='wallets'>
            <div className="meta-mask btn">
                <p>Connect with Metamask</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Form;
