import React, { useState } from "react";

const Hot = ({ id, img, name, lPrice, mPrice }) => {
  const [heartCount, setHeartCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      id={id}
      className="bg-white duration-500 hover:scale-105 p-5 rounded-lg w-full h-full text-black shadow-lg shadow-gray-700"
    >
      <div className="relative">
        <img
          src={img}
          alt=""
          className="h-[220px] mb-2 w-full wtf object-cover object-center rounded-lg "
        />
        <div className="absolute duration-500 opacity-0 hover:opacity-100 rounded-lg top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]">
          <div className="flex justify-center items-center w-full h-full ">
            <div className="text-white flex gap-1">
              <div className="text-xl">
                <ion-icon name="heart"></ion-icon>
              </div>
              <span>{heartCount}</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className="font-bold text-center uppercase">{name}</h2>
      <div className="flex justify-around items-center">
        <table className="">
          <tr>
            <td>Medium</td>
            <td>|</td>
            <td>Large</td>
          </tr>
          <tr>
            <td>${mPrice}</td>
            <td></td>
            <td>${lPrice}</td>
          </tr>
        </table>
        <button
          onClick={() => {
            if (!isClicked) {
              setHeartCount((prev) => prev + 1);
            }
            setIsClicked((prev) => !prev);
          }}
          className={`text-3xl ${
            isClicked ? "text-red-500" : "text-black "
          } hover:scale-125 duration-500`}
        >
          <ion-icon name="heart"></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Hot;
