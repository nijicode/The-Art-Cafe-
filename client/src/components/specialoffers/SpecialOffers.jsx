import React, { useEffect, useRef } from "react";

import { Link } from "react-scroll";
import CardSlider from "./CardSlider";
import useOfferStorage from "../../zustand/useOfferStorage";
import useGetOffers from "../../hooks/useGetOffers";
import useListenOffers from "../../hooks/socketListener/useListenOffers";
import { motion } from "framer-motion";
import { fadeIn } from "../../assets/variants";

const SpecialOffers = () => {
  const { loading } = useGetOffers();
  const { offers } = useOfferStorage();
  const scrollContainerRef = useRef(null);
  useListenOffers();

  return (
    <div
      className="w-full overflow-clip bg-black text-white py-10 md:p-20 grid gap-10 grid-cols-1 lg:grid-cols-2"
      id="offers"
    >
      <motion.div
        className="flex flex-col items-center justify-center h-[400px]"
        variants={fadeIn("right", 0, 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false }}
      >
        <div className="text-center">
          <h1 className="text-3xl mb-5 md:text-5xl leading-tight md:mb-10 font-bold md:max-w-[21ch]">
            {offers ? offers.mainTitle : ""}
          </h1>
          <span className="text-sm md:text-lg">
            {offers ? offers.subTitle : ""}
          </span>
          <div className="w-full flex justify-center mt-10">
            <Link
              to="menu"
              spy={true}
              smooth={true}
              offset={-55}
              duration={500}
              className="bg-white duration-500 text-sm md:text-md cursor-pointer border-4 border-white hover:bg-gray-500 hover:text-white text-black font-bold block py-2 px-5 rounded-full "
            >
              ORDER NOW!
            </Link>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0, 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false }}
      >
        <CardSlider autoSlide={true} offers={offers} />
      </motion.div>
    </div>
  );
};

export default SpecialOffers;
