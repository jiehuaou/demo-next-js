// @ts-check

import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/auth-store";

/**
 * @callback HelloCallback
 * @param {string} status
 * @returns {boolean}
 */

/**
 * @callback SimpleCallback
 * @returns {void}
 */



/**
 * HELLO WORLD
 * @param {string} data
 * @param {HelloCallback} cb
 * @returns {void}
 */
function hello(data, cb) {
  cb(data);
}

hello('abc', (e)=>{
  console.log(e?.length);
  return true;
});



const counter = { index: 1 }

/**
 * 
 * @param {string} url 
 * @param {object} cache 
 * @returns 
 */
const fetcher = async (url, cache = null) => {
  console.log(`API Invoice ${url} ........ ${counter.index++}`);
  const r = await axios.get(url);
  return r.data;

};

const useInvoice = () => {
  //const [id,] = useState(()=>user); //useAuthStore((state) => state.user);
  const id = useAuthStore((state) => state.user);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, ] = useState(false);

  useEffect(() => {
    if (id === 'Unknow') return;
    console.log(" fetch user data .......... " + id);
    //setIsLoading(true);
    setError(false);
    fetcher(`/api/slow-invoice?id=${id}`)
      .then(json => {
        setData(json);
        setIsLoading(false);
        console.log(" fetch user data .......... " + id + " -- done");
      }).catch(e => {
        setIsLoading(false);
        setError(true);
        console.log(" fetch user data .......... " + id + " -- error");
      });
  }, []);

  console.log("error => " + error, ",  data = > " + data?.length, 
    ", loading => " + isLoading, ", isValidating => " + isValidating, 
    ",  user => " + id);
  
  return {
    key: id && id !== 'Unknow' ? `/api/invoice/${id}` : null,
    invoiceData: data,
    loading: isLoading,
    isValidating : isValidating ,
    error: !!error,
    isQuerySubmit: id && id !== 'Unknow'
  };
};


export default useInvoice;