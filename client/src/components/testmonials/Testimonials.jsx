import React, { useEffect, useState } from "react";
import Testimonial from "./Testimonial";
// import { testimonials } from "../../assets/testimonials";
import Ratings from "./Ratings";
import { motion, useAnimation } from "framer-motion";
import { MdRateReview } from "react-icons/md";
import Review from "./Review";
import useGetTestimonials from "../../hooks/useGetTestimonials";
import useTestimonialStorage from "../../zustand/useTestimonialStorage";
import useListenTestimonials from "../../hooks/socketListener/useListenTestimonials";
import { fadeIn } from "../../assets/variants";

const Testimonials = () => {
  const { testimonials } = useTestimonialStorage();
  const { loading } = useGetTestimonials();
  const [testimonialPerPage, setTestimonialPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useListenTestimonials();
  const lastTestimonialIndex = currentPage * testimonialPerPage;
  const firstTestimonialIndex = lastTestimonialIndex - testimonialPerPage;

  const currentTestimonials = (testimonials) => {
    return testimonials?.slice(firstTestimonialIndex, lastTestimonialIndex);
  };

  const getAverageRating = (testimonials) => {
    const totalRating = testimonials.reduce(
      (total, item) => total + item.ratings,
      0
    );
    return totalRating / testimonials.length;
  };

  useEffect(() => {
    let intervalId;

    const resetInterval = () => {
      // Clear the existing interval
      if (intervalId) {
        clearInterval(intervalId);
      }

      // Set a new interval
      intervalId = setInterval(() => {
        setCurrentPage((prevPage) => {
          // Calculate the total number of pages
          const totalPages = Math.ceil(
            testimonials.length / testimonialPerPage
          );

          // If the current page is the last one, reset to the first page
          if (prevPage >= totalPages) {
            return 1;
          }

          // Otherwise, go to the next page
          return prevPage + 1;
        });
      }, 20000); // 10000 milliseconds = 10 seconds
    };

    // Initialize the interval
    resetInterval();

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [testimonials.length, testimonialPerPage, setCurrentPage]);

  const averageRating = getAverageRating(testimonials);

  const controls = useAnimation(); // Framer Motion animation control

  useEffect(() => {
    // Trigger animation on page change
    controls.start({
      opacity: [0, 1],
      x: [20, 0],
    });
  }, [currentPage, controls]);
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const formatNumberToTwoDecimal = (number) => {
    return number.toFixed(2);
  };
  return (
    <div id="say">
      <motion.div
        className="flex flex-col w-full h-auto  mb-36 rounded-lg "
        variants={fadeIn("up", 0, 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false }}
      >
        <div className=" flex justify-between w-full h-[200px] py-10 rounded-t-lg  ">
          <div>
            <p className="uppercase text-xs">What People Say:</p>
            <p className="capitalize text-3xl text-white font-bold">
              Testimonials.
            </p>
            <div className="flex items-center gap-1">
              <span>{formatNumberToTwoDecimal(averageRating)}</span>
              <Ratings rating={averageRating} />
              <p className="text-xs">{`${formatNumberWithCommas(
                testimonials.length
              )} reviews`}</p>
            </div>
          </div>

          <button
            className="btn text-black duration-500 rounded-full bg-white hover:bg-white hover:scale-110"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <MdRateReview />
          </button>
        </div>

        <div className="w-full h-auto gap-10 -mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {currentTestimonials(testimonials.slice().reverse()).map(
            (testimonial, index) => (
              <motion.div
                key={index}
                animate={controls}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: index * 0.5 }}
              >
                <Testimonial {...testimonial} name={testimonial.name} />
              </motion.div>
            )
          )}
        </div>
        <div className="flex w-full mt-5 justify-end">
          <div className="join">
            <button
              className="join-item btn bg-white text-black hover:bg-white hover:bg-opacity-70 border-none rounded-bl-full rounded-tl-full"
              onClick={() =>
                setCurrentPage((prevPage) => {
                  // Calculate the total number of pages
                  const totalPages = Math.ceil(
                    testimonials.length / testimonialPerPage
                  );

                  // If the current page is the first one, go to the last page
                  if (prevPage <= 1) {
                    return totalPages;
                  }

                  // Otherwise, go to the previous page
                  return prevPage - 1;
                })
              }
            >
              «
            </button>
            <button className="join-item btn bg-white text-black hover:bg-white hover:bg-opacity-70 border-none ">
              {currentPage}
            </button>
            <button
              className="join-item btn bg-white text-black hover:bg-white hover:bg-opacity-70 border-none rounded-br-full rounded-tr-full"
              onClick={() =>
                setCurrentPage((prevPage) => {
                  // Calculate the total number of pages
                  const totalPages = Math.ceil(
                    testimonials.length / testimonialPerPage
                  );

                  // If the current page is the last one, reset to the first page
                  if (prevPage >= totalPages) {
                    return 1;
                  }

                  // Otherwise, go to the next page
                  return prevPage + 1;
                })
              }
            >
              »
            </button>
          </div>
        </div>
        {loading && (
          <div className="loading self-center loading-spinner mt-5 "></div>
        )}
        {testimonials.length == 0 && (
          <div className="text-white text-center mt-5">
            No Reviews Yet Be The First One To Rate Our Website!!
          </div>
        )}
        <Review setCurrentPage={setCurrentPage} />
      </motion.div>
    </div>
  );
};

export default Testimonials;
