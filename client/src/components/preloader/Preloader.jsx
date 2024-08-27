import React, { useEffect } from "react";
import PreloaderLogo from "./PreloaderLogo";
import { motion, useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";

const Preloader = () => {
  const controls = useAnimation(); // Framer Motion animation control
  const title = useAnimation();
  const svgControl = useAnimation();
  const location = useLocation();
  const strokeDashDuration = 4;

  useEffect(() => {
    // Trigger animation on page change
    controls.start({
      opacity: [1, 0],
    });

    svgControl.start({
      strokeDashoffset: [4500, 0],
      transition: {
        duration: 6, // Duration of the strokeDashoffset animation
      },
    });

    svgControl.start({
      fill: ["white"],
      fillOpacity: [0, 1],
      transition: {
        delay: 2, // Start fill opacity animation after strokeDashoffset is done
        duration: 1, // Adjust duration as needed
      },
    });

    title.start({
      opacity: [0, 1],
      y: [50, 0],
    });
  }, [location.pathname]);

  return (
    <motion.div
      className="fixed bg-gradient-to-r from-zinc-950 to-black pointer-events-none flex flex-col gap-3 justify-center items-center top-0 left-0 w-full h-full z-[100]"
      animate={controls}
      initial={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 3.5 }}
    >
      <PreloaderLogo
        color="white"
        width={300}
        height={200}
        svgControl={svgControl}
      />

      <motion.div
        className="uppercase text-white text-2xl "
        animate={title}
        initial={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <span>The Art café</span>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
