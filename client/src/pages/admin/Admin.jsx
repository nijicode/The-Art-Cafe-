import React from "react";
import Login from "../../components/admin/Login";
import Dashboard from "../../components/admin/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export const Admin = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to="dashboard" /> : <Login />}
        />
        <Route
          path="dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/admin" />}
        />
      </Routes>
    </>
  );
};
