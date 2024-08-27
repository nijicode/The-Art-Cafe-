import React, { useRef, useState } from "react";
import InputRatings from "./InputRatings";
import useAddTestimonial from "../../hooks/useAddTestimonial";
import { toast } from "sonner";
const Review = ({ setCurrentPage }) => {
  const [rating, setRating] = useState(null);
  const { loading, addTestimonial } = useAddTestimonial();
  const [inputs, setInputs] = useState({ name: "", message: "", email: "" });
  const dialogRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.message || !inputs.email) {
      // Return early if any field is empty

      if (dialogRef.current) {
        dialogRef.current.close();
      }
      toast.error("All fields are required.");
      return;
    }

    if (inputs.message.length < 50) {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      toast.error("Message must be at least 50 characters.");
      return;
    }
    await addTestimonial(inputs, rating);
    setRating(null);
    setInputs({ name: "", message: "", email: "" });
    if (dialogRef.current) {
      dialogRef.current.close();
      setCurrentPage(1);
    }
  };

  const handleCancel = () => {
    setRating(null);
    setInputs({ name: "", message: "", email: "" });
  };
  return (
    <dialog
      id="my_modal_3"
      className="modal modal-bottom px-10 sm:modal-middle z-[2]"
      ref={dialogRef}
    >
      <div className="modal-box  bg-white text-black">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCancel}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Rate Us!</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-5">
            <InputRatings rating={rating} setRating={setRating} />
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered focus:outline-black bg-black text-white w-full "
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="input bg-black focus:outline-black text-white  w-full "
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <textarea
              className="textarea w-full focus:outline-black h-[10rem] selection: bg-black text-white resize-none"
              name="message"
              id="message"
              placeholder="Message..."
              value={inputs.message}
              onChange={(e) =>
                setInputs({ ...inputs, message: e.target.value })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className=" text-white btn bg-black hover:bg-black hover:opacity-90"
            disabled={loading}
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              " Submit"
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Review;
