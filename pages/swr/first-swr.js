import { Button, Loading, Row, Spacer, Text } from "@nextui-org/react";
import Head from 'next/head';
import { useEffect } from 'react';
import { mutate, useSWRConfig } from "swr";
import InvoiceListComponent from '@components/InvoiceListComponent';
import Layout from '@components/layout';
import useInvoiceSWR from '@hook/use-invoice-swr';
import usePersistStore from '@hook/use-persist-store';
import useAuthStore from '@store/auth-store';
import utilityStyles from '@styles/utils.module.css';


/**
 * @typedef {import("swr").Cache} SwrCache
 */


/**
 * @param {{cache: SwrCache}} args
 * @return {JSX.Element|null}
 */
const InvoiceListSWR = function ({ cache }) {

    const { key, isQuerySubmit, invoiceData, loading, isValidating, error } = useInvoiceSWR(); // useInvoiceSWR();  useInvoice();

    if (loading) {
        return <Loading type="points" size='sm' />
    } else if (error) {
        return <span>Something Wrong</span>
    } else if (isQuerySubmit) {
        return (
            <div>
                <InvoiceListComponent fetchType='SWR' invoiceData={invoiceData} isValidating={isValidating} />
                <Row justify='flex-end'>
                    <Button flat={true} size="sm" disabled={isValidating} onPress={() => {
                        // delete Key Data at cache but not trigger UI render
                        key && cache.delete(key);
                        // clearCache();
                    }} >Delete SWR Cache</Button> <Spacer x={1} />
                    <Button flat={true} size="sm" disabled={isValidating} onPress={() => {
                        // refetch the data of specified Key, will trigger UI render if Key Data is deleted.
                        mutate(key);
                    }} >Re-fetch SWR Cache</Button>
                </Row>
            </div>)
    }

    return null;
}


/**
 * 
 * @type {React.FC<{user:string, ready:boolean, loading:boolean}>}
 */
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

/**
 * @param {SwrCache} cache 
 */
const clearInvoiceCache = (cache) => {
    console.log("exit first-swr and clean up cache ............");
    [.../**@type {IterableIterator<string>} */ (cache.keys())]
       .filter(e => e.startsWith('/api/invoice'))
        .forEach(key => {
            cache.delete(key);
            console.log("cache.delete ............ " + key);
        });
}

export default function SWRDemo() {

    const myAuthStore = usePersistStore(useAuthStore(), {});
    const { cache } = useSWRConfig();

    const { user,  ready, loading, login, logout } = myAuthStore;

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
            <span>{ready && <InvoiceListSWR cache={cache} />}</span>
            <span className='width2px'> </span>
            {/* <span>{ready ? (<InvoiceList/>) : (<div>...</div>) }</span> */}
        </div>

    </Layout>)
}