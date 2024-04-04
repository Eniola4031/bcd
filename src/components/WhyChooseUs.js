const WhyChooseUs = () => {
  return (
    <div className='why-choose-us container'>
      <h2 className='section-title'>Why Choose Us</h2>
      <section className='reasons row'>
        <div className='reason'>
          <div className='icon'>1</div>
          <h3 className='reason-title'>Low Fees and Fast Transactions</h3>
          <p className='reason-description'>
            Experience cost-effective and efficient micro-transactions with
            Etherlink's low fees and high transaction speed.
          </p>
        </div>
        <div className='reason'>
          <div className='icon'>2</div>
          <h3 className='reason-title'>Secure and Decentralized</h3>
          <p className='reason-description'>
            Benefit from the security advantages of decentralized blockchain
            technology, ensuring the integrity and transparency of transactions.
          </p>
        </div>
        <div className='reason'>
          <div className='icon'>3</div>
          <h3 className='reason-title'>Fair Escrow System</h3>
          <p className='reason-description'>
            Utilize our fair escrow system, securely holding payments until
            tasks are satisfactorily completed, fostering trust and equitable
            transactions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
