import React, { useEffect, useState } from "react";
import HistoryDetails from "./history/HistoryDetails";
import useGetHistory from "../../hooks/useGetHistory";
import useHistoryStorage from "../../zustand/useHistoryStorage";
import useListen from "../../hooks/socketListener/useListenTestimonials";
import useListenHistory from "../../hooks/socketListener/useListenHistory";

const EditHistory = () => {
  const { loading } = useGetHistory();
  const { history } = useHistoryStorage();
  useListenHistory();
  return (
    <div className="flex flex-col w-full pt-10 items-center text-white ">
      {loading && <div className="loading loading-spinner loading-md"></div>}
      {Object.entries(history).map(([key, value]) => (
        <div key={key}>
          <HistoryDetails
            name={key}
            image={value.image}
            description={value.description}
          />
        </div>
      ))}
    </div>
  );
};

export default EditHistory;
