import React, { useEffect, useState } from "react";

import useGetHistory from "../../hooks/useGetHistory";
import useHistoryStorage from "../../zustand/useHistoryStorage";
import useListenHistory from "../../hooks/socketListener/useListenHistory";
import { motion } from "framer-motion";
import { fadeIn } from "../../assets/variants";

const About = () => {
  useGetHistory();
  const { histories } = useHistoryStorage();
  const [isLoaded, setIsLoaded] = useState(false);
  useListenHistory();

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
    <div
      className="bg-black overflow-clip w-full z-10 h-auto py-10 md:p-20 "
      id="service"
    >
      <div className="flex w-full h-auto flex-col gap-12">
        {histories.map((history, index) => (
          <motion.div
            key={index}
            className={`flex gap-8 ${
              index === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } flex-col`}
            variants={fadeIn(index === 1 ? "right " : "left", 0, 1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false }}
          >
            <div className="w-full md:w-[300px] overflow-hidden lg:w-[500px] h-[350px] rounded-lg shadow-lg shadow-gray-600">
              <img
                src={history.imageURL}
                alt=""
                className={`object-cover object-center w-full h-full hover:scale-110 duration-500 rounded-xl ${
                  isLoaded ? "blur-0" : "blur-md"
                } `}
                onLoad={handleImageLoad}
              />
            </div>
            <div className=" text-white flex-1 flex flex-col justify-center">
              <div className={`${index === 1 ? "self-end" : ""}`}>
                <h1 className="font-bold text-xl mb-4">
                  Our <span className="capitalize">{history.title}</span>
                </h1>
                <p>{history.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
