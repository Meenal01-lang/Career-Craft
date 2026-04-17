import { useEffect } from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "CareerCraft — AI-powered resumes & career tools";
  }, []);

  return (
    <div className="min-h-screen bg-cc-bg text-cc-text">
      <Banner />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
