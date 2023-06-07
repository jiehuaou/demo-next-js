
import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/auth-store";

const counter = { index: 1 }

const fetcher = async (url, cache) => {
  console.log(`fetch Invoice ${url} ........ ${counter.index++}`);
  const r = await axios.get(url);
  return r.data;

};

const useInvoice = () => {
  const id = useAuthStore((state) => state.user);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 'Unknow') return;
    console.log(" fetch user data .......... " + id);
    setLoading(true);
    setError(false);
    fetcher(`/api/slow-invoice?id=${id}`)
      .then(json => {
        setData(json);
        setLoading(false);
        console.log(" fetch user data .......... " + id + " -- done");
      }).catch(e => {
        setLoading(false);
        setError(true);
        console.log(" fetch user data .......... " + id + " -- error");
      });

  }, [id]);

  return {
    invoiceData: data,
    loading: loading,
    error: error
  };
};


export default useInvoice;