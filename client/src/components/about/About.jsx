import React, { useEffect, useState } from "react";

import useGetHistory from "../../hooks/useGetHistory";
import useHistoryStorage from "../../zustand/useHistoryStorage";
import useListenHistory from "../../hooks/socketListener/useListenHistory";
import { motion } from "framer-motion";
import { fadeIn } from "../../assets/variants";

const About = () => {
  useGetHistory();
  const { history } = useHistoryStorage();
  const mission = history?.mission?.image;
  const vision = history?.vision?.image;
  const values = history?.values?.image;
  useListenHistory();

  return (
    <div
      className="bg-black overflow-clip w-full z-10 h-auto py-10 md:p-20 "
      id="service"
    >
      <div className="flex w-full h-auto flex-col gap-12">
        <motion.div
          className="flex gap-8 md:flex-row flex-col"
          variants={fadeIn("left", 0, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false }}
        >
          <div className="w-full md:w-[300px] overflow-hidden lg:w-[500px] h-[350px] rounded-lg shadow-lg shadow-gray-600">
            <img
              src={`http://localhost:3001/about/${mission}`}
              alt=""
              className="object-cover object-center w-full h-full hover:scale-110 duration-500 rounded-xl"
            />
          </div>
          <div className=" text-white flex-1 flex flex-col justify-center">
            <h1 className="font-bold text-xl mb-4">Our Mission</h1>
            <p>
              {history && history.mission ? history.mission.description : ""}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="flex gap-8 md:flex-row-reverse flex-col"
          variants={fadeIn("right", 0, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false }}
        >
          <div className="w-full md:w-[300px] overflow-hidden lg:w-[500px] h-[350px] rounded-lg shadow-lg shadow-gray-600">
            <img
              src={`http://localhost:3001/about/${vision}`}
              alt=""
              className="object-cover object-center w-full h-full hover:scale-110 duration-500  rounded-xl"
            />
          </div>
          <div className="text-white flex-1 flex flex-col justify-center">
            <div className=" self-end ">
              <h1 className="font-bold text-xl mb-4 ">Our Vision</h1>
              <p>
                {history && history.mission ? history.vision.description : ""}
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="flex gap-8 md:flex-row flex-col"
          variants={fadeIn("left", 0, 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false }}
        >
          <div className="w-full md:w-[300px] overflow-hidden lg:w-[500px] h-[350px] rounded-lg shadow-lg shadow-gray-600">
            <img
              src={`http://localhost:3001/about/${values}`}
              alt=""
              className="object-cover object-center w-full hover:scale-110 duration-500 h-full rounded-xl"
            />
          </div>
          <div className="text-white flex-1 flex flex-col justify-center">
            <h1 className="font-bold text-xl mb-4">Our Values</h1>
            <p>
              {history && history.mission ? history.values.description : ""}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
