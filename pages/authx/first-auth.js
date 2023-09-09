import Head from 'next/head';
import Layout from '@components/layout';
import useAuthStore from '@store/auth-store';
import utilityStyles from '@styles/utils.module.css';
import usePersistStore from '@hook/use-persist-store';
import { Card, Text, Row, Button, Spacer, Loading } from "@nextui-org/react";
import { useEffect, useState } from 'react';



/**
 * component to show user-name
 * @type{React.FC<{user:string, ready:boolean, loading:boolean}>}
 */
const UserName = function ({ loading, ready, user }) {
  
    if (loading) {
        return <Loading type="points" size='md'/>
    } else if (!ready) {
        return <span className={utilityStyles.notLogin}>Not Allowed Access.</span>;
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

/**
 * Auth Demo
 * @returns {JSX.Element}
 */
export default function AuthDemo() {
    /**
     * @type {import('@store/auth-store').AuthStoreType}
     */
    const myAuthStore = usePersistStore(useAuthStore(), {});
    const { user, token, stamp, ready, loading, login, logout } = myAuthStore;

    const [first, setFirst] = useState(true);

    useEffect(()=>{
        setFirst(false)
    }, []);

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
            <Text>Demo Zustand with Persist Feature.</Text>
            <Text>State can be kept even after refresh page.</Text>
            <Text h3 b>
                You are <UserName user={user} ready={ready} loading={loading} />
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm"  color="primary" auto onClick={login} disabled={ready || loading || first}>
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