import React, { useEffect, useState, useMemo } from "react";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import useGetHero from "../../hooks/useGetHero";
import useUpdateHero from "../../hooks/useUpdateHero";
import { toast } from "sonner";
import useHeroStorage from "../../zustand/useHeroStorage";
import useListenHero from "../../hooks/socketListener/useListenHero";

const EditHero = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { loading: heroLoading } = useGetHero();
  const { hero } = useHeroStorage();
  const [mainTitle, setMainTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [uploadVideo, setUploadVideo] = useState(null);
  const { loading: updateHeroLoading, updateHero } = useUpdateHero();
  useListenHero();

  useEffect(() => {
    if (hero) {
      setMainTitle(hero.header1 || "");
      setSubTitle(hero.header2 || "");
    }
  }, [hero]);

  const videoSrc = useMemo(() => {
    return uploadVideo
      ? URL.createObjectURL(uploadVideo)
      : hero?.bgVideo && `http://localhost:3001/video/${hero.bgVideo}`;
  }, [uploadVideo, hero?.bgVideo]);

  useEffect(() => {
    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, [videoSrc]);

  const handleCancel = () => {
    // Reset form fields to original values if needed
    toast.error("Edit Cancelled!");
    setUploadVideo(null);
    setMainTitle(hero.header1 || "");
    setSubTitle(hero.header2 || "");
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHero(uploadVideo, mainTitle, subTitle);
    refetchHero(); // Refetch the hero data after updating
    setTimeout(() => {
      setIsEdit(false);
    }, 2000);
  };

  return (
    <div className="flex w-full justify-center items-center text-white">
      <form
        className="flex flex-col p-10 w-full items-center gap-8 relative"
        onSubmit={handleSubmit}
      >
        <h1 className="mt-8 font-bold">Background Video</h1>
        <div
          className={`${
            isEdit
              ? "tooltip tooltip-bottom outline-4 outline-dashed outline-black outline-offset-8"
              : "border-2"
          }  rounded-3xl shadow-xl max-w-xl w-full shadow-black `}
          data-tip="Click To Change Video"
        >
          <label htmlFor="video" className="  cursor-pointer">
            <video
              className={` w-full h-[300px] object-cover rounded-3xl  object-center   ${
                isEdit ? "" : ""
              }`}
              src={videoSrc}
              autoPlay
              loop
              muted
            />
          </label>
        </div>
        <input
          type="file"
          id="video"
          accept="video/*"
          onChange={(e) => setUploadVideo(e.target.files[0])}
          disabled={!isEdit}
          hidden
        />
        <div className="flex flex-col gap-8 items-center m-auto w-full">
          <textarea
            className="textarea resize-none max-w-2xl rounded-lg bg-black w-full disabled:bg-black focus:outline-black"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            disabled={!isEdit}
          />
          <textarea
            className="textarea resize-none max-w-2xl rounded-lg bg-black w-full disabled:bg-black focus:outline-black"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            disabled={!isEdit}
          />
        </div>
        <div className=" flex gap-2">
          {isEdit ? (
            <>
              <button
                type="submit"
                className="btn btn-success text-white rounded-full"
                disabled={updateHeroLoading}
              >
                {updateHeroLoading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  <FaRegSave />
                )}
                <span>Save</span>
              </button>
              <button
                type="button"
                className="btn btn-error text-white rounded-full"
                onClick={handleCancel}
                disabled={updateHeroLoading}
              >
                <MdOutlineCancel />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-info text-white rounded-full"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
            >
              <FaRegEdit />
              <span>Edit</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditHero;
