import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

type UseCustomFetchResult<T> = {
    data: T | null;
    loading: boolean;
    error: boolean;
};
  
export const useCustomFetch = <T>(url: string): UseCustomFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
          const response = await axiosInstance.get<T>(url);
          if (isMounted) {
            setData(response.data);
          }
        } catch (e) {
          if (isMounted) {
            setError(true);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      fetchData();
  
      return () => {
        isMounted = false;
      };
    }, [url]);
  
    return { data, loading, error };
};