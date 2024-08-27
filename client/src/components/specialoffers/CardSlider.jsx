import React, { useEffect, useState } from "react";

const CardSlider = ({
  autoSlide = false,
  autoSlideInterval = 3000,
  offers,
}) => {
  // const slides = [cold1, cold2, cold3, cold4, cold5];
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const url = "https://the-art-cafe.onrender.com/";

  useEffect(() => {
    if (offers && offers.images) {
      setSlides(offers.images);
    }
  }, [offers]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const intervalId = setInterval(nextSlide, autoSlideInterval);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="max-w-3xl h-[350px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] relative group">
      <div className="absolute w-full h-full overflow-hidden border-2 rounded-3xl">
        <img
          src={`${url}carousel/${slides[currentIndex]}`}
          className="object-cover duration-500 w-full h-full hover:scale-110  object-center"
          alt="carousel img"
        />
      </div>
      <div className=" absolute text-white hidden group-hover:block top-[45%] hover:opacity-80 text-5xl left-5 duration-500 cursor-pointer">
        <ion-icon name="chevron-back-circle" onClick={prevSlide}></ion-icon>
      </div>
      <div className=" absolute text-white hidden group-hover:block top-[45%] hover:opacity-80 right-5 text-5xl duration-500 cursor-pointer">
        <ion-icon name="chevron-forward-circle" onClick={nextSlide}></ion-icon>
      </div>
      <div className="absolute bottom-5 flex w-full justify-center items-center">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`px-1 text-white duration-500 cursor-pointer ${
              currentIndex === slideIndex ? "text-3xl" : "opacity-80 text-xl"
            }`}
          >
            <ion-icon
              key={slideIndex}
              name="ellipse"
              onClick={() => goToSlide(slideIndex)}
            ></ion-icon>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
