import { useState } from "react";

import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputErrors({
      username,
      password,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const data = res.data;
      console.log("Response data:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("admin", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
};
