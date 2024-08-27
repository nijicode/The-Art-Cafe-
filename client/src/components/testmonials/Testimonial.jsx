import React from "react";
import Ratings from "./Ratings";

const Testimonial = ({ name, ratings, message }) => {
  return (
    <div className=" bg-white w-full h-full rounded-lg p-5 pointer-events-none select-none">
      <p className="text-5xl text-black font-bold">"</p>
      <div className="mb-5">
        <Ratings rating={ratings} />
      </div>
      <p className="font-semibold text-black break-words">{message}</p>
      <p className="mt-5 text-black ">
        <span>@</span>
        {name}
      </p>
    </div>
  );
};

export default Testimonial;
