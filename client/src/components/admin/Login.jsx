import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  return (
    <div className=" flex justify-center items-center w-full h-screen bg-black">
      <div className="card bg-zinc-800 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-center mt-5 text-white font-bold text-3xl">
          Admin
        </h1>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control ">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered bg-zinc-500 text-white"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered bg-zinc-500 text-white"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <Link to="/">
            <span className="link link-accent lowercase">Visit Website</span>
          </Link>
          <div className="form-control mt-6">
            <button className="btn bg-zinc-500 text-white hover:bg-black duration-500">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
