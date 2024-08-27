import React, { useEffect, useRef, useState } from "react";
import uploadImg from "../../assets/upload.png";
import useAddItems from "../../hooks/useAddItem";
import useGetCategory from "../../hooks/useGetCategory";
import useCategoryStorage from "../../zustand/useCategoryStorage";

const AddMenu = () => {
  const { loading, addItem } = useAddItems();
  useGetCategory();
  const { categories } = useCategoryStorage();
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const textareaRef = useRef(null);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    mPrice: "",
    lPrice: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(categoryId, productDetails, image);
    setTimeout(() => {
      setProductDetails({
        productName: "",
        mPrice: "",
        lPrice: "",
        description: "",
      });
      setImage(null);
    }, 2000);
  };

  useEffect(() => {
    // Adjust the height of the textarea when the content changes
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Set the height to the scrollHeight
    }
  }, [productDetails]);

  return (
    <div className="w-full py-10 text-white">
      <form
        className="flex flex-col justify-center items-center w-full h-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-6">Add Menu Items</h1>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="select select-bordered w-full max-w-xs rounded-lg bg-black focus:outline-black"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        <div className=" flex flex-col mt-5">
          <div
            className="tooltip tooltip-bottom "
            data-tip="Click To Upload Image"
            style={{
              "--tooltip-color": "black", // Custom background color
              // Custom text color
            }}
          >
            <label htmlFor="image" className="w-fit cursor-pointer">
              <div className=" w-[200px] rounded-lg h-[200px]">
                <img
                  src={image ? URL.createObjectURL(image) : uploadImg}
                  alt=""
                  className={`w-full h-full object-cover object-center outline-4 outline-dashed outline-black rounded-lg outline-offset-8`}
                />
              </div>
            </label>
          </div>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept="image/*"
            id="image"
            hidden
          />
        </div>
        <label className="form-control w-full max-w-xs mt-5">
          <div className="label">
            <span className="label-text text-white">Product Name:</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-sm rounded-lg bg-black focus:outline-black"
            value={productDetails.productName}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                productName: e.target.value,
              })
            }
          />
        </label>
        <div className="w-full max-w-xs ">
          <div className="label">
            <span className="label-text text-white">Description:</span>
          </div>
          <textarea
            ref={textareaRef}
            placeholder="Type Here"
            className="textarea w-full bg-black text-sm rounded-lg focus:outline-black resize-none overflow-hidden"
            rows="1"
            value={productDetails.description}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="w-full flex max-w-xs gap-4 ">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-white">Medium Price (SAR):</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-sm rounded-lg bg-black focus:outline-black"
              value={productDetails.mPrice}
              onChange={(e) =>
                setProductDetails({ ...productDetails, mPrice: e.target.value })
              }
            />
          </label>
          <label className="form-control w-full  ">
            <div className="label">
              <span className="label-text text-white">Large Price (SAR):</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-sm rounded-lg bg-black focus:outline-black"
              value={productDetails.lPrice}
              onChange={(e) =>
                setProductDetails({ ...productDetails, lPrice: e.target.value })
              }
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn text-white rounded-full btn-success mt-5"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
