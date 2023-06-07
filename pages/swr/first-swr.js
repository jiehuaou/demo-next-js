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
import Space2x from '../../components/Space2px';

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

const clearCache = () => mutate(
    () => true,
    undefined,
    { revalidate: true }
  )

export default function SWRDemo() {

    const myAuthStore = delayStore(useAuthStore(), {});
    const { cache } = useSWRConfig();

    const { user, token, stamp, ready, loading, login, logout } = myAuthStore;

    const {key} = useInvoiceSWR();



    return (<Layout>
        <Head>
            <title>SWR Demo</title>
        </Head>

        <h1>SWR fetch data</h1>

        <h2>
            Your Name is <UserName user={user} ready={ready} loading={loading} />
        </h2>

        <div>
            <button onClick={login} disabled={ready || loading}>SWR Login +</button> <Space2x/>
            <button onClick={logout} disabled={!ready}>Logout -</button> <Space2x/>
            <button onClick={()=>{
                // delete Key Data at cache but not trigger UI render
                cache.delete(key);
                // clearCache();
            }} disabled={!ready}>Delete SWR Cache -</button> <Space2x/>
            <button onClick={()=>{
                // refetch the data of specified Key, will trigger UI render if Key Data is deleted.
                mutate(key);
            }} disabled={!ready}>Refresh SWR Cache -</button> <Space2x/>
        </div>
        
        <hr />
        <div>
            <span>{ ready ? (<InvoiceListSWR/>) : (<div>...</div>) }</span>
            <span className='width2px'> </span>
            {/* <span>{ready ? (<InvoiceList/>) : (<div>...</div>) }</span> */}
        </div>

    </Layout>)
}