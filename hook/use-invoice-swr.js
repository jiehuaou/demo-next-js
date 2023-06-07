
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";
import useAuthStore from "../store/auth-store";

const counter = { index: 1 }

const deleteCache = function (cache, url, millsec = 15000) {
  setTimeout(() => {
    cache.delete(url);
    console.log(`cache.delete ......... ${url}`);
  }, millsec);
}

const fetcher = async (url, cache) => {

  console.log(`fetch Invoice ${url} ........ ${counter.index++}`);
  //mutate((e) => e===url, undefined, { revalidate: false });
  const r = await axios.get(url);
  deleteCache (cache, url)
  return r.data;

};


const useInvoiceSWR = () => {
  const id = useAuthStore((state) => state.user);
  const { cache } = useSWRConfig();
  const { data, error } = useSWR(
    id && id !== 'Unknow' ? `/api/slow-invoice?id=${id}` : null,
    (url) => fetcher(url, cache)
  );

  console.log("error => " + error);

  return {
    invoiceData: data,
    loading: !data && !error,
    error: !!error
  };
};



export default useInvoiceSWR;