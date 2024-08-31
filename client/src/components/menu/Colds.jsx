import React, { useRef, useState } from "react";
import comingsoon from "../../assets/animation/comingsoon.json";
import heartAnimation from "../../assets/animation/hearts.json";
import Lottie from "lottie-react";
import heartPopSound from "../../assets/sounds/heart.mp3";
import useUpdateHearts from "../../hooks/useUpdateHearts";
import { motion } from "framer-motion";

const Colds = ({
  id,
  img,
  name,
  mPrice,
  lPrice,
  hearts,
  description,
  createdAt,
}) => {
  const url = "https://the-art-cafe.onrender.com/";
  const [isClicked, setIsClicked] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { updateHearts } = useUpdateHearts();
  const animationRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleHeartCount = async (id, name, hearts) => {
    const newHeartCount = hearts + 1;

    await updateHearts(newHeartCount, id, name);
  };
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleAnimationComplete = () => {
    setIsVisible(false); // Hide the component after animation completes
  };

  const isNew = () => {
    const createdAtDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdAtDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to days

    return diffDays <= 7;
  };

  return (
    <div
      className=" select-none duration-500 hover:scale-105 "
      onClick={handleFlip}
    >
      <div
        id={id}
        className={`bg-white relative cursor-pointer duration-[1500ms]  ${
          isFlipped ? "rotate-y-180" : ""
        }  p-5 rounded-lg w-full h-full text-black shadow-lg shadow-gray-700 `}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="front  " style={{ backfaceVisibility: "hidden" }}>
          {isNew() && (
            <div id="new" className="absolute top-1 right-[-25px] z-10">
              <p className=" rotate-45 py-1 border-2 rounded-full font-bold border-white text-white px-5 bg-black">
                <span className=" ">New!</span>
              </p>
            </div>
          )}
          <div className="relative">
            <img
              src={`${img}`}
              alt={`${name} image`}
              className={`h-[220px] mb-2 w-full wtf object-cover object-center rounded-lg ${
                isLoaded ? "blur-0" : "blur-md"
              } `}
              onLoad={handleImageLoad}
            />
            <div className="absolute duration-500 opacity-0 hover:opacity-100 rounded-lg top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]">
              <div className="flex justify-center items-center w-full h-full ">
                <div className="text-white flex gap-1">
                  <div className="text-xl">
                    <ion-icon name="heart"></ion-icon>
                  </div>
                  <span>{hearts}</span>
                </div>
              </div>
            </div>
          </div>
          <h2 className="font-bold text-center uppercase">{name}</h2>
          <div className="flex justify-around items-center">
            <table className="">
              <thead>
                <tr>
                  <th>Medium</th>
                  <th>|</th>
                  <th>Large</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mPrice} SAR</td>
                  <td></td>
                  <td>{lPrice} SAR</td>
                </tr>
              </tbody>
            </table>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isClicked) {
                    handleHeartCount(id, name, hearts);
                    setIsVisible(true);
                    if (animationRef.current) {
                      animationRef.current.goToAndStop(0, true); // Restart animation
                      animationRef.current.play(); // Start animation
                    }
                    const sound = new Audio(heartPopSound);
                    sound.play();
                  }
                  setIsClicked((prev) => !prev);
                  if (isClicked) {
                    setIsVisible(false);
                  }
                }}
                className={`text-3xl ${
                  isClicked ? "text-red-300 animate-shake" : "text-black "
                } hover:scale-125 duration-500`}
              >
                <ion-icon name="heart"></ion-icon>
              </button>
              {isVisible && (
                <div className="absolute  bottom-[40%] right-[-50%] text-white w-[60px] pointer-events-none">
                  <Lottie
                    animationData={heartAnimation}
                    lottieRef={animationRef}
                    loop={false}
                    onComplete={handleAnimationComplete}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className=" flex flex-col text-center overflow-hidden border-4 border-red-300 justify-center items-center font-bold bg-white rounded-lg p-5 top-0 left-0 rotate-y-180 absolute w-full h-full "
          style={{ backfaceVisibility: "hidden" }}
        >
          {description ? (
            <div>{description}</div>
          ) : (
            <div>
              <p>Stay Tuned For Coffee Info</p>
              <div className="w-[200px]">
                <Lottie animationData={comingsoon} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Colds;
