import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineChangeCircle } from "react-icons/md";

import { toast } from "sonner";
import useUpdateOffers from "../../hooks/useUpdateOffers";
import useGetOffers from "../../hooks/useGetOffers";
import useOfferStorage from "../../zustand/useOfferStorage";
import useListenOffers from "../../hooks/socketListener/useListenOffers";

const EditSpecialOffers = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputs, setInputs] = useState({ mainTitle: "", subTitle: "" });
  const { loading: loadingOffers, updateOffers } = useUpdateOffers();
  const { loading: loadingGet } = useGetOffers();
  const { offers } = useOfferStorage();
  const [images, setImages] = useState([]);
  useListenOffers();

  useEffect(() => {
    if (offers && offers.titles) {
      setInputs({
        mainTitle: offers.titles.mainTitle,
        subTitle: offers.titles.subTitle,
      });
      setImages(offers.images);
    }
  }, [offers]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length === 5) {
      setSelectedFiles(Array.from(files));
    } else {
      setSelectedFiles([]);
      toast.error("Please upload exactly 5 photos.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateOffers(selectedFiles, inputs);
    console.log(selectedFiles, inputs);
  };
  return (
    <div className="flex flex-col p-5 justify-center items-center w-full">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-xl font-semibold text-white break-words my-5">
            Upload 5 photos that will be featured on Special Offers
          </h1>
          <div className="image-preview hidden md:grid grid-cols-5 gap-4 mx-10 mb-5">
            {selectedFiles.length > 0
              ? selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="image-container overflow-hidden rounded-lg "
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-[200px] object-cover object-center hover:opacity-70 "
                    />
                  </div>
                ))
              : images.map((image, index) => (
                  <div
                    key={index}
                    className="image-container overflow-hidden rounded-lg  "
                  >
                    <img
                      src={`http://localhost:3001/carousel/${image}`}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-[200px] object-cover object-center hover:opacity-70 "
                    />
                  </div>
                ))}
          </div>
          <input
            id="uploadBtn"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs "
            onChange={handleFileChange}
            hidden
            multiple
          />
          <label
            htmlFor="uploadBtn"
            className=" btn w-full max-w-xs rounded-lg bg-black text-white hover:bg-black hover:bg-opacity-50"
          >
            {selectedFiles.length === 5 ? (
              <div className="flex justify-center items-center">
                <MdOutlineChangeCircle className="text-xl" />
                Change?
              </div>
            ) : (
              <div className="flex justify-center items-center ">
                <MdOutlineFileUpload className="text-xl" />
                Upload 5 Photos
              </div>
            )}
          </label>

          <div className="divider"></div>
        </div>

        <div className="w-full ">
          <h1 className="text-center font-bold text-white text-xl">
            Edit Heading
          </h1>
          <div className="flex flex-col items-center gap-4 p-5">
            <textarea
              className="flex-1 textarea rounded-lg textarea-bordered max-w-5xl w-full resize-none text-white bg-black focus:outline-black"
              value={inputs.mainTitle}
              onChange={(e) =>
                setInputs({ ...inputs, mainTitle: e.target.value })
              }
            ></textarea>

            <div className="divider"></div>

            <textarea
              className="flex-1 textarea rounded-lg textarea-bordered max-w-5xl resize-none text-white w-full block bg-black focus:outline-black"
              value={inputs.subTitle}
              onChange={(e) =>
                setInputs({ ...inputs, subTitle: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-success rounded-full text-white"
          disabled={loadingOffers}
        >
          {loadingOffers ? (
            <div className="loading loading-spinner"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditSpecialOffers;
