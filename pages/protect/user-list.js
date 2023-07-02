//@ts-check
import Layout from "../../components/layout";
import Head from 'next/head';
import { Card, Grid, Text, Badge, Button, Loading, Table } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import UserListComponent from "../../components/UserListComponent";

const iconColor = 'secondary';

/**
 * @callback whenDataReady
 * @param {*} status
 */

/**
 * @param {whenDataReady} cb 
 */
const fetcher = async (cb)=>{
    const data = await fetch('/api/protect/fetch-users');
    const json = await data.json();
    console.log(`[Profile] user data ..........user:`, json);
    cb(json);
}

/**
 * 
 * @returns {React.JSX.Element}
 */
export default function UserListPage() {

    const { data: session, status } = useSession();
    const [userData, setUserData] = useState();

    console.log(`[Profile] session [${status}]..........user:`, session);

    useEffect(()=>{
        if(status==='authenticated') {
            fetcher(e=>setUserData(e));
        }
    }, [status])

    return (
        <Layout home={false}>
            <Head>
                <title>User Profile</title>
            </Head>

            <Card>
                <Card.Header>
                    <Text h3>User List</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                    <Text>This is protected resource, only login user can access this page.</Text>
                    <Grid.Container gap={1}>
                        <Grid>
                            <UserListComponent userData={userData} isLoading={!userData}/>
                        </Grid>
                        <Grid>
                            <Button bordered flat onPress={e => signOut()}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid.Container>

                </Card.Body>
            </Card>

        </Layout>
    )
}