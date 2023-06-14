import Head from 'next/head';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import useAuthStore, {initState} from '../../store/auth-store';
import { useEffect, useState } from 'react';
import utilityStyles from '../../styles/utils.module.css';
import usePersistStore from '../../hook/use-persist-store';
import { Card, Text, Row, Button,Spacer } from "@nextui-org/react";



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

// const delayStore = (store, defaultState={}) => {
//     const result = store;
//     const [data, setData] = useState(defaultState);

//     useEffect(() => {
//         setData(result);
//     }, [result]);

//     return data;
// }

export default function AuthDemo() {

    const myAuthStore = usePersistStore(useAuthStore(), {});

    const { user, token, stamp, ready, loading, login, logout } = myAuthStore;



    return (<Layout>
        <Head>
            <title>Auth Demo</title>
        </Head>

        <Card css={{ mw: "630px" }}>
          <Card.Header>
            <Text h2 b>Auth Demo</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>demo Zustand with Persist Feature.</Text>
            <Text h3>
                Your Name is <UserName user={user} ready={ready} loading={loading} />
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm"  color="primary" auto onClick={login} disabled={ready || loading}>
                Login
              </Button><Spacer x={1} />
              <Button size="sm"  color="primary" auto onClick={logout} disabled={!ready}>Logout</Button>
            </Row>
          </Card.Footer>
        </Card>

        <div>
            {
                ready && (<ul>
                    <li>token: {token}</li>
                    <li>stamp: {stamp}</li>
                </ul>)
                   
            }

        </div>

    </Layout>)
}