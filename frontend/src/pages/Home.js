import CallToAction from "../components/CallToAction";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <Feature />
      <FAQ />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
