import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import useGetItemsByCategory from "../../hooks/useGetItemsByCategory";
import useGetCategory from "../../hooks/useGetCategory";
import { MdCancel } from "react-icons/md";
import useEditItem from "../../hooks/useEditItem";
import useDeleteItem from "../../hooks/useDeleteItem";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/coffee.json";
import useItemsStorage from "../../zustand/useItemsStorage";
import useGetItems from "../../hooks/useGetItems";
import useListen from "../../hooks/socketListener/useListenTestimonials";
import useCategoryStorage from "../../zustand/useCategoryStorage";
import useListenItems from "../../hooks/socketListener/useListenItem";
import useListenCategory from "../../hooks/socketListener/useListenCategory";

const MenuList = () => {
  useGetItems();
  const url = "http://localhost:3001";
  const [uploadImage, setUploadImage] = useState("");
  const { categories } = useCategoryStorage();
  const { waiting } = useGetCategory();
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { editing, editItem } = useEditItem();
  const [itemId, setItemId] = useState("");
  const { deleting, deleteItem } = useDeleteItem();
  const textareaRef = useRef(null);
  const { items } = useItemsStorage();
  useListenItems();
  useListenCategory();

  const filterItemsByCategory = (categoryId) => {
    return items.filter((item) => item.category === categoryId);
  };

  const [inputs, setInputs] = useState({
    productName: "",
    mPrice: "",
    lPrice: "",
    description: "",
  });

  const handleEdit = (item) => {
    setImage(item.image);
    setInputs({
      productName: item.productName,
      mPrice: item.mPrice,
      lPrice: item.lPrice,
      description: item.description,
    });
    setItemId(item._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editItem(uploadImage, inputs, itemId);
    setUploadImage("");
  };

  const handleCancel = () => {
    setUploadImage("");
  };

  const handleDelete = async (itemId) => {
    await deleteItem(itemId);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  useEffect(() => {
    // Adjust the height of the textarea when the content changes
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // Set the height to the scrollHeight
    }
  }, [inputs]);
  return (
    <div className="flex flex-col p-10">
      <h1 className="text-center font-bold text-white text-xl">Menu List</h1>
      <div>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="select rounded-lg select-bordered w-full max-w-xs mb-4 bg-black focus:outline-black text-white"
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

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={handleCancel}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-white">Edit</h3>
            <form
              onSubmit={handleSubmit}
              className=" w-full h-full text-white "
            >
              <div className="flex flex-col items-center">
                <p className="text-center">Upload Image</p>
                <label htmlFor="image" className="w-fit cursor-pointer my-4">
                  <img
                    src={
                      uploadImage
                        ? URL.createObjectURL(uploadImage)
                        : `${url}/images/${image}`
                    }
                    alt=""
                    className={`w-[200px] h-[200px] rounded-md ${
                      !uploadImage
                        ? "outline-4 outline-black outline-dashed outline-offset-8"
                        : ""
                    } `}
                  />
                </label>
                <input
                  onChange={(e) => setUploadImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white ">
                      Product Name:
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-md rounded-lg input-bordered w-full max-w-xs bg-black text-sm focus:outline-black"
                    value={inputs.productName}
                    onChange={(e) =>
                      setInputs({ ...inputs, productName: e.target.value })
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
                    className="textarea w-full rounded-lg bg-black text-sm focus:outline-black resize-none overflow-hidden"
                    rows="1"
                    value={inputs.description}
                    onChange={(e) =>
                      setInputs({ ...inputs, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="flex w-full max-w-xs gap-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white ">
                        Medium Price ($):
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Type here"
                      className="input input-md input-bordered w-full rounded-lg max-w-xs bg-black text-sm focus:outline-black"
                      value={inputs.mPrice}
                      onChange={(e) =>
                        setInputs({ ...inputs, mPrice: e.target.value })
                      }
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white ">
                        Large Price ($):
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Type here"
                      className=" input input-md input-bordered w-full rounded-lg max-w-xs bg-black text-sm focus:outline-black"
                      value={inputs.lPrice}
                      onChange={(e) =>
                        setInputs({ ...inputs, lPrice: e.target.value })
                      }
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-success mt-5 rounded-full text-white"
                  disabled={editing}
                  onClick={() => {
                    if (!editing) {
                      // Get the modal element
                      const modal = document.getElementById("my_modal_2");
                      if (modal) {
                        // Close the modal
                        modal.close();
                      }
                    }
                  }}
                >
                  {editing ? (
                    <span className="loading loading-spinner "></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {!categoryId ? (
          <div>
            <span> Select a category above to view the list of items.</span>
            <div className="flex justify-center items-center w-full h-full mt-16 ">
              <div className="w-[600px]">
                <Lottie
                  animationData={animationData}
                  options={defaultOptions}
                />
              </div>
            </div>
          </div>
        ) : waiting ? (
          <div className=" flex justify-center">
            <span className="loading loading-spinner w-[100px] mt-40"></span>
          </div>
        ) : categoryId && filterItemsByCategory(categoryId).length === 0 ? (
          <div className="text-center text-xl mt-40 ">
            "It looks like there are no items added yet. Go to
            <span className="font-bold"> 'Add Product'</span> to add your first
            item to this category!"
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[550px] rounded-lg scrollbar-thin text-white">
            <table className="table  table-xs xl:table-md  ">
              {/* head */}
              <thead className="text-md sticky top-0">
                <tr className="bg-black text-white  border-0  ">
                  <th rowSpan="2">No.</th>
                  <th rowSpan="2">Image</th>
                  <th rowSpan="2">Name</th>
                  <th rowSpan="2">Description</th>
                  <th rowSpan="2">Hearts</th>
                  <th className="text-center " rowSpan="1" colSpan="2">
                    Price
                  </th>
                  <th rowSpan="2">Action</th>
                </tr>
                <tr className="bg-black text-white ">
                  <th>Medium</th>
                  <th>Large</th>
                </tr>
              </thead>
              <tbody>
                {filterItemsByCategory(categoryId).map((item, idx) => (
                  <tr key={idx} className=" hover:bg-black">
                    <td>{idx + 1}</td>
                    <td>
                      <div className="max-w-[150px] overflow-hidden rounded-lg group">
                        <img
                          src={`${url}/images/${item.image}`}
                          alt=""
                          className="w-full h-full max-h-[120px] object-cover object-center duration-500 group-hover:scale-110 "
                        />
                      </div>
                    </td>
                    <td className="capitalize">{item.productName}</td>
                    <td className=" text-justify">{item.description}</td>
                    <td>{item.hearts}</td>
                    <td>{`${item.mPrice} SAR`}</td>
                    <td>{`${item.lPrice} SAR`}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-info text-white rounded-full"
                          onClick={() => {
                            handleEdit(item);
                            document.getElementById("my_modal_2").showModal();
                          }}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="btn btn-error text-white rounded-full"
                          onClick={() => handleDelete(item._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
