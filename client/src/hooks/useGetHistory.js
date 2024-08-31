import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import useHistoryStorage from "../zustand/useHistoryStorage";

const useGetHistory = () => {
  const [loading, setLoading] = useState(false);
  const { setHistories } = useHistoryStorage();

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/history/get");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }

        setHistories(data);
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

    getHistory();
  }, []);

  return { loading };
};

export default useGetHistory;
