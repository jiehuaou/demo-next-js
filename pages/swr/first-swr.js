import Head from 'next/head';
//import dynamic from 'next/dynamic';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import useAuthStore from '../../store/auth-store';
import { useEffect, useState } from 'react';
import utilityStyles from '../../styles/utils.module.css';
import useSWR, { mutate, useSWRConfig } from "swr";
import useInvoiceSWR from '../../hook/use-invoice-swr';
import InvoiceListComponent from '../../components/InvoiceListComponent';
import Space2x from '../../components/Space2px';
import usePersistStore from '../../hook/use-persist-store';
import useInvoice from '../../hook/use-invoice';
import { Button } from '@nextui-org/react';
import { Container, Card, Row, Col, Text } from "@nextui-org/react";

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

const InvoiceListSWR = function ({ cache }) {

    const { key, invoiceData, loading, isValidating, error } = useInvoiceSWR(); // useInvoiceSWR();  useInvoice();

    if (loading) {
        return <span><Loading /></span>
    } else if (error) {
        return <span>Something Wrong</span>
    } else {
        return (<>
            <InvoiceListComponent fetchType='SWR' invoiceData={invoiceData} isValidating={isValidating} />
            <button onClick={() => {
                // delete Key Data at cache but not trigger UI render
                cache.delete(key);
                // clearCache();
            }} >Delete SWR Cache -</button> <Space2x />
            <button onClick={() => {
                // refetch the data of specified Key, will trigger UI render if Key Data is deleted.
                mutate(key);
            }} >Re-fetch SWR Cache -</button> <Space2x />
        </>)
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
        .filter(e => e.startsWith('/api/slow-invoice'))
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

        <Container>
            <Row>
                <Col><Button onClick={login} disabled={ready || loading} size="sm">SWR Login +</Button> </Col>
                <Col><Button onClick={logout} disabled={!ready} size="sm">Logout -</Button> </Col>
            </Row>
        </Container>

        <hr />
        <div>
            <span>{ready && <InvoiceListSWR cache={cache} />}</span>
            <span className='width2px'> </span>
            {/* <span>{ready ? (<InvoiceList/>) : (<div>...</div>) }</span> */}
        </div>

    </Layout>)
}