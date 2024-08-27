import React, { useEffect, useRef, useState } from "react";
import useAddCategory from "../../hooks/useAddCategory";
import useGetCategory from "../../hooks/useGetCategory";
import { RiDeleteBin2Line } from "react-icons/ri";
import useDeleteCategory from "../../hooks/useDeleteCategory";
import { MdAddCircleOutline } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import useCategoryStorage from "../../zustand/useCategoryStorage";
import useListen from "../../hooks/socketListener/useListenTestimonials";
import useListenCategory from "../../hooks/socketListener/useListenCategory";

const EditMenu = () => {
  const [title, setTitle] = useState("");
  const { categories } = useCategoryStorage();
  const { waiting } = useGetCategory();
  const { loading, addCategory } = useAddCategory();
  const { deleting, deleteCategory } = useDeleteCategory();
  const [categoryName, setCategoryName] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const lastCategoryRef = useRef();
  useListenCategory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(title);
      setTitle("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategoryName(null);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    lastCategoryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [categories]);

  return (
    <div className="flex flex-col w-full p-10">
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setDeleteId(null);
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Delete Confirmation:</h3>
          <p className="py-4">
            Are you sure you want to delete <span>"{categoryName}"</span> ? This
            action cannot be undone.
          </p>
          <form method="dialog" className="flex justify-end gap-2">
            <button
              className="btn rounded-xl btn-error text-white "
              onClick={() => handleDelete(deleteId)}
            >
              Yes
            </button>
            <button
              className="btn btn-ghost rounded-xl  text-white "
              onClick={() => {
                setDeleteId(null);
              }}
            >
              No
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <h1 className="text-2xl font-bold text-white text-center mb-5">Menu</h1>
      <div className="divider "></div>
      {waiting ? (
        <div className=" flex justify-center">
          <span className="loading loading-spinner w-[100px] "></span>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-[500px] rounded-lg scrollbar-thin ">
          <table className="table table-pin-rows">
            {/* head */}
            <thead>
              <tr className="text-sm text-white bg-black">
                <th>No.</th>
                <th>Category</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, idx) => (
                <tr
                  className="hover:bg-black text-white "
                  key={category._id}
                  ref={lastCategoryRef}
                >
                  <th>{idx + 1}</th>
                  <td>{category.title}</td>
                  <td> {category.items.length}</td>
                  <td>
                    <div>
                      <button
                        className="btn rounded-full btn-error text-white "
                        onClick={() => {
                          document.getElementById("my_modal_2").showModal();
                          setCategoryName(category.title);
                          setDeleteId(category._id);
                        }}
                      >
                        <RiDeleteBin2Line size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="divider m-0 p-0 "></div>
      {waiting ? (
        <div></div>
      ) : (
        <form className="flex mt-2 gap-5 w-full " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name Here"
            className="input bg-black w-full text-sm max-w-xl rounded-lg text-white focus:outline-black "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className={`btn btn-success rounded-full text-white `}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <div className="flex">
                <MdAddBox size={15} />
                <span className="ml-2"> Add Category</span>
              </div>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditMenu;
