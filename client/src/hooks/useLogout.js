import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { toast } from "sonner";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout");
      const data = res.data;
      console.log("Response data:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("admin");
      setAuthUser(null);
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
  return { loading, logout };
};

export default useLogout;
