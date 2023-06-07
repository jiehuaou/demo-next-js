import Head from 'next/head';
//import dynamic from 'next/dynamic';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import useAuthStore from '../../store/auth-store';
// import initState from '../../store/auth-store';
import { useEffect, useState } from 'react';
//import { useStore } from 'zustand';
import utilityStyles from '../../styles/utils.module.css';
import useSWR, { mutate, useSWRConfig  } from "swr";
import useInvoiceSWR from '../../hook/use-invoice-swr';
import useInvoice from '../../hook/use-invoice';
import InvoiceListComponent from '../../components/InvoiceListComponent';

const InvoiceList = function () {
    
    const {invoiceData,loading,error} = useInvoice();

    if (loading) {
        return <span><Loading /></span>
    }else if(error) {
        return <span>Something Wrong</span>
    }else{
        return InvoiceListComponent('Other', invoiceData)
    }
}

const InvoiceListSWR = function () {
    
    // const {invoiceData,loading,error} = useInvoice();
    const {invoiceData, loading, error} = useInvoiceSWR();

    if (loading) {
        return <span><Loading /></span>
    }else if(error) {
        return <span>Something Wrong</span>
    }else{
        return InvoiceListComponent('SWR', invoiceData)
    }
}



const UserName = function ({ loading, ready, user }) {
  
    if (loading) {
        return <span><Loading /></span>
    } else if (!ready) {
        return <span className={utilityStyles.notLogin}>Not Access</span>;
    } else {
        return <span className={utilityStyles.validLogin}>{user}</span>;
    }
}

/**
 * fix error "Text content does not match server-rendered HTML"
 * when zustand was persist.
 */

const delayStore = (store, defaultState={}) => {
    const result = store;
    const [data, setData] = useState(defaultState);

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
}

export default function SWRDemo() {

    const myAuthStore = delayStore(useAuthStore(), {});
    const { cache } = useSWRConfig();

    const { user, token, stamp, ready, loading, login, logout } = myAuthStore;



    return (<Layout>
        <Head>
            <title>SWR Demo</title>
        </Head>

        <h1>SWR fetch data</h1>

        <h2>
            Your Name is <UserName user={user} ready={ready} loading={loading} />
        </h2>

        <div>
            <button onClick={login} disabled={ready || loading}>SWR Login +</button> <span className='width2px'></span>
            <button onClick={logout} disabled={!ready}>Logout -</button> <span className='width2px'></span>
            <button onClick={()=>{
                //mutate("/api/slow-invoice?id=John");
                cache.delete("/api/slow-invoice?id=John");
            }} disabled={!ready}>Clean SWR Cache -</button>
        </div>
        

        <hr />
        <div>
            { ready ? (<InvoiceListSWR/>) : (<div>...</div>) }
            {ready ? (<InvoiceList/>) : (<div>...</div>) }

        </div>

    </Layout>)
}