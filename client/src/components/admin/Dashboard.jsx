import React from "react";
import { Sidebar } from "./Sidebar";
import EditContainer from "./EditContainer";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex bg-zinc-800">
      <Sidebar />
      <EditContainer />
    </div>
  );
};

export default Dashboard;
