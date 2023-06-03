import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import useAuthStore, {initState} from '../../store/auth-store';
// import initState from '../../store/auth-store';
import { useEffect, useState } from 'react';
//import { useStore } from 'zustand';
import utilityStyles from '../../styles/utils.module.css'


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

    const { user, token, stamp, ready, loading, login, logout } = myAuthStore;


    return (<Layout>
        <Head>
            <title>SWR Demo</title>
        </Head>

        <h1>SWR Demo</h1>

        <h2>
            Your Name is <UserName user={user} ready={ready} loading={loading} />
        </h2>
        <button onClick={login} disabled={ready || loading}>Login +</button>
        <button onClick={logout} disabled={!ready}>Logout -</button>

        <hr />
        <div>
            {
                ready ? (<ul>
                    <li>token: {token}</li>
                    <li>stamp: {stamp}</li>
                </ul>)
                    : (
                        <p>...</p>
                    )
            }

        </div>

    </Layout>)
}