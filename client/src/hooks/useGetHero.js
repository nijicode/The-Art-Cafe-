import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import useHeroStorage from "../zustand/useHeroStorage";

const useGetHero = () => {
  const [loading, setLoading] = useState(false);
  const { setHero } = useHeroStorage();

  useEffect(() => {
    const getHero = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/hero/hero-details");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setHero(data);
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

    getHero();
  }, []);

  return { loading };
};

export default useGetHero;
