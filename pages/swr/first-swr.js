import Head from 'next/head';
import Layout from '../../components/layout';
import useAuthStore from '../../store/auth-store';
import { useEffect } from 'react';
import utilityStyles from '../../styles/utils.module.css';
import { mutate, useSWRConfig } from "swr";
import useInvoiceSWR from '../../hook/use-invoice-swr';
import InvoiceListComponent from '../../components/InvoiceListComponent';
import usePersistStore from '../../hook/use-persist-store';
import { Row, Text, Loading, Button, Spacer } from "@nextui-org/react";

/*
const InvoiceList = function () {

    const { invoiceData, loading, error } = useInvoice();

    if (loading) {
        return <span><Loading /></span>
    } else if (error) {
        return <span>Something Wrong</span>
    } else {
        return InvoiceListComponent('Other', invoiceData)
    }
}
*/

const InvoiceListSWR = function ({ cache, ready }) {

    const { key, isQuerySubmit, invoiceData, loading, isValidating, error } = useInvoiceSWR(); // useInvoiceSWR();  useInvoice();

    // const [first, setFirst] = useState(true);
    // useEffect(()=>{
    //     setFirst(false)
    // }, []);

    if (loading) {
        return <Loading type="points" size='sm' />
    } else if (error) {
        return <span>Something Wrong</span>
    } else {
        return (isQuerySubmit &&
        <div>
            <InvoiceListComponent fetchType='SWR' invoiceData={invoiceData} isValidating={isValidating} />
            <Row justify='flex-end'>
                <Button flat={true} size="sm" disabled={isValidating} onPress={() => {
                    // delete Key Data at cache but not trigger UI render
                    cache.delete(key);
                    // clearCache();
                }} >Delete SWR Cache</Button> <Spacer x={1} />
                <Button flat={true} size="sm" disabled={isValidating} onPress={() => {
                    // refetch the data of specified Key, will trigger UI render if Key Data is deleted.
                    mutate(key);
                }} >Re-fetch SWR Cache</Button>
            </Row>
        </div>)
    }
}



const UserName = function ({ loading, ready, user }) {

    if (loading) {
        return <Loading type="points" size='md' />
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

// const delayStore = (store, defaultState = {}) => {
//     const result = store;
//     const [data, setData] = useState(defaultState);

//     useEffect(() => {
//         setData(result);
//     }, [result]);

//     return data;
// }

const clearInvoiceCache = (cache) => {
    console.log("exit first-swr and clean up cache ............");
    [...cache.keys()]
        .filter(e => e.startsWith('/api/invoice'))
        .forEach(key => {
            cache.delete(key);
            console.log("cache.delete ............ " + key);
        });
}

export default function SWRDemo() {

    const myAuthStore = usePersistStore(useAuthStore(), {});
    const { cache } = useSWRConfig();

    const { user, token, stamp, ready, loading, login, logout } = myAuthStore;

    //const { key } = useInvoiceSWR();

    useEffect(() => {
        return () => clearInvoiceCache(cache);
    }, [])



    return (<Layout>
        <Head>
            <title>SWR Demo</title>
        </Head>

        <Text h3>SWR fetch data</Text>
        <ul>
            <li>delete cache, then Re-fetch, will display the loading process.</li>
            <li>only Re-fetch will fetch Data but not show Loading .</li>

        </ul>

        <Text h4>
            Your Name is <UserName user={user} ready={ready} loading={loading} />
        </Text>


        <Row justify='flex-end'>
            <Button onPress={login} disabled={ready || loading} size="sm" flat={true}>
                SWR Login</Button><Spacer x={1}></Spacer>
            <Button onPress={logout} disabled={!ready} size="sm" flat={true} >Logout</Button>
        </Row>


        <hr />
        <div>
            <span>{ready && <InvoiceListSWR cache={cache} ready={ready}/>}</span>
            <span className='width2px'> </span>
            {/* <span>{ready ? (<InvoiceList/>) : (<div>...</div>) }</span> */}
        </div>

    </Layout>)
}