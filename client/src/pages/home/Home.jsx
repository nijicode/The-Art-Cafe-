import React from "react";
import Nav from "../../components/navbar/Nav";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import SpecialOffers from "../../components/specialoffers/SpecialOffers";
import Menu from "../../components/menu/Menu";
// import Footer from "../../components/footer/Footer";
import Testimonials from "../../components/testmonials/Testimonials";
import Footer2 from "../../components/footer/Footer2";

const Home = () => {
  return (
    <div className=" scrollbar scrollbar-thumb-black">
      <Nav />
      <Hero />
      <div className="px-10">
        <About />
        <SpecialOffers />
        <Menu />
        <Testimonials />
      </div>

      <Footer2 />
    </div>
  );
};

export default Home;
