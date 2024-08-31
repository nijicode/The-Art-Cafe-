import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import useGetHero from "../../hooks/useGetHero";
import useHeroStorage from "../../zustand/useHeroStorage";
import useListenHero from "../../hooks/socketListener/useListenHero";
import { motion } from "framer-motion";
import { fadeIn } from "../../assets/variants";
const Hero = () => {
  useGetHero();
  const { hero } = useHeroStorage();
  const [subTitle, setSubTitle] = useState(null);
  const [mainTitle, setMainTitle] = useState(null);
  const [video, setVideo] = useState(null);
  useListenHero();

  useEffect(() => {
    if (hero) {
      setMainTitle(hero.mainTitle || "");
      setSubTitle(hero.subTitle || "");
      setVideo(hero.videoURL || "");
    }
  }, [hero]);

  return (
    <div className="w-full h-screen z-0 relative " id="hero">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.9)]"></div>
      <video
        className="w-full h-full object-cover object-center"
        src={`${video}`}
        autoPlay
        loop
        muted
      ></video>
      <div className=" absolute text-white top-0 w-full h-full flex flex-col justify-center items-center transition-all duration-500 p-10">
        <motion.div
          className="flex flex-col items-center"
          variants={fadeIn("up", 0, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false }}
        >
          <span className="md:text-sm lg:text-base text-xs mb-2 text-gray-400">
            {mainTitle}
          </span>
          <h1 className=" md:mt-3 md:text-5xl lg:text-6xl text-3xl font-bold md:w-[21ch] md:py-0 py-6 text-center ">
            {subTitle}
          </h1>
          <div className="mt-4 md:mt-9 lg:mt-10">
            <Link
              to="offers"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className="mr-5 cursor-pointer font-bold md:mr-10 text-xs md:text-sm lg:text-base border-solid bg-white px-5 py-2 border-4 text-black rounded-full hover:bg-gray-500 hover:text-white transition-all duration-500"
            >
              SIP NOW!
            </Link>
            <Link
              to="service"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="px-5 cursor-pointer font-bold py-2 text-xs md:text-sm lg:text-base border-solid border-4 text-white rounded-full  hover:bg-gray-500 hover:text-white transition-all duration-500"
            >
              LEARN MORE
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
