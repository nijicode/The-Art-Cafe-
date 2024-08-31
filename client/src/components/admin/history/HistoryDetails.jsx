import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import useUpdateHistory from "../../../hooks/useUpdateHistory";
import { toast } from "sonner";

const HistoryDetails = ({ name, image, description, historyId }) => {
  const [uploadImg, setUploadImg] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(description);
  const { loading, updateHistory } = useUpdateHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setUploadImg(null);
    setInput(description);
    toast.error("Edit Cancelled!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHistory(uploadImg, input, historyId);
    setUploadImg(null);
    setTimeout(() => {
      setIsEdit(false);
      setInput(description);
    }, 2000);
  };

  return (
    <div className="w-fit px-5">
      <h1 className=" capitalize font-bold mb-2 text-xl ">{name}</h1>
      {isEdit ? (
        <form
          className="flex flex-col xl:flex-row mt-5 items-center justify-center gap-10 md:w-[700px] xl:w-[950px] "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center items-center md:flex-row gap-10">
            <div>
              <div
                className="tooltip tooltip-top"
                data-tip="Click To Change Photo"
                style={{
                  "--tooltip-color": "black", // Custom background color
                  // Custom text color
                }}
              >
                <label htmlFor="image" className=" cursor-pointer">
                  <div
                    className={`w-[300px] h-full overflow-hidden rounded-lg outline-black outline-4 outline-dashed outline-offset-8  `}
                  >
                    <img
                      src={
                        uploadImg ? URL.createObjectURL(uploadImg) : `${image}`
                      }
                      alt=""
                      className={`w-full h-[200px] object-cover object-center hover:scale-110 duration-500 `}
                    />
                  </div>
                </label>
              </div>
              <input
                onChange={(e) => setUploadImg(e.target.files[0])}
                type="file"
                accept="image/*"
                id="image"
                hidden
              />
            </div>
            <textarea
              className="textarea w-[350px] h-[110px] rounded-lg bg-black focus:outline-black focus:bg-black resize-none "
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />{" "}
          </div>

          <div className="flex gap-2 self-end xl:self-auto">
            <button
              type="submit"
              className={`btn rounded-full w-fit top-0 self-start right-0 btn-success text-white ${
                loading ? "cursor-not-allowed" : " cursor-auto"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <FaRegSave />
              )}

              <span>Save</span>
            </button>
            <button
              type="button"
              className="btn rounded-full w-fit top-0 self-start right-0 btn-error text-white"
              onClick={handleCancel}
              disabled={loading}
            >
              <MdOutlineCancel />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="flex mt-5 flex-col xl:flex-row justify-center items-center gap-10 md:w-[700px] xl:w-[950px] ">
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <div className=" w-[300px] border-2 rounded-lg overflow-hidden group ">
              <img
                className={`w-full h-[200px] object-cover object-center group-hover:scale-110 cursor-pointer duration-500 ${
                  isLoaded ? "blur-0" : "blur-md"
                }`}
                src={`${image}`}
                alt={`art-cafe ${name} image`}
                onLoad={handleImageLoad}
              />
            </div>
            <span className=" w-[350px] text-justify break-word">
              {description}
            </span>
          </div>

          <button
            className="btn rounded-full w-fit top-0 self-end xl:self-auto right-0 btn-info text-white"
            onClick={() => {
              setIsEdit(true);
              setInput(description);
            }}
          >
            <FaRegEdit />
            <span>Edit</span>
          </button>
        </div>
      )}
      <div className="divider w-full"></div>
    </div>
  );
};

export default HistoryDetails;
