import axios from "axios";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import useOfferStorage from "../zustand/useOfferStorage";

const useGetOffers = () => {
  const [loading, setLoading] = useState(false);
  const { offers, setOffers } = useOfferStorage();

  useEffect(() => {
    const getOffers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/offers/get");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setOffers(data);
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

    getOffers();
  }, []);

  return { loading };
};

export default useGetOffers;
