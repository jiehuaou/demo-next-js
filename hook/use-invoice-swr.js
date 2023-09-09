
import axios from "axios";
// import { useEffect, useState } from "react";
import useSWR from "swr";
import useAuthStore from "@store/auth-store";

const counter = { index: 1 }

/**
 * Deletes a specified URL from the cache after a specified delay.
 *
 * @param {import("swr").Cache} cache - The cache object to delete the URL from.
 * @param {string} url - The URL to be deleted from the cache.
 * @param {number} millsec - The delay in milliseconds before deleting the URL from the cache. Default is 15000 milliseconds.
 */
const deleteCache = function (cache, url, millsec = 15000) {
  setTimeout(() => {
    cache.delete(url);
    console.log(`cache.delete ......... ${url}`);
  }, millsec);
}

/**
 * Fetches data from a specified URL and returns the response data.
 *
 * @param {string} url - The URL from which to fetch the data.
 * @param {object} cache - The cache object to be used for caching the response.
 * @return {Promise<object>} A promise that resolves to the response data.
 */
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