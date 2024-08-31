import React, { useEffect, useState } from "react";
import HistoryDetails from "./history/HistoryDetails";
import useGetHistory from "../../hooks/useGetHistory";
import useHistoryStorage from "../../zustand/useHistoryStorage";
import useListenHistory from "../../hooks/socketListener/useListenHistory";

const EditHistory = () => {
  const { loading } = useGetHistory();
  const { histories } = useHistoryStorage();
  useListenHistory();
  return (
    <div className="flex flex-col w-full pt-10 items-center text-white ">
      {loading && <div className="loading loading-spinner loading-md"></div>}
      {histories.map((history, index) => (
        <div key={index}>
          <HistoryDetails
            name={history.title}
            image={history.imageURL}
            description={history.description}
            historyId={history._id}
          />
        </div>
      ))}
    </div>
  );
};

export default EditHistory;
