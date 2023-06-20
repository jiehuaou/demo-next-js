
import axios from "axios";
import { useState } from "react";
// import { useEffect, useState } from "react";
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
  //deleteCache (cache, url)
  return r.data;

};


const useInvoiceSWR = () => {
  const id = useAuthStore((state) => state.user);

  const key = id && id !== 'Unknow' ? `/api/invoice/${id}` : null;
  const { data, error, isLoading, isValidating } = useSWR(key, async (url) => {
    console.log(`SWR API Invoice ${url} ........ ${counter.index++}`);
    const r = await axios.get(url);
    return r.data;
  }, {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    // // revalidateOnMount: false,
    // refreshWhenOffline: false,
    // refreshWhenHidden: false,
  });

  console.log("error => " + error, ",  data = > " + data?.length,
    ", loading => " + isLoading, ", isValidating => " + isValidating,
    ",  user => " + id);

  return {
    key: key,
    invoiceData: data,
    loading: isLoading,
    isValidating: isValidating,
    error: !!error,
    isQuerySubmit: key!==null
  };
};



export default useInvoiceSWR;