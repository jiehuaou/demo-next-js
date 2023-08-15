//@ts-check
import Layout from "../../../components/layout";
import Head from 'next/head';
import { Card, Grid, Text, Badge, Button, Loading, Table } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import UserListComponent from "../../../components/UserListComponent";
import useAuth from "../../../hook/use-auth";

const iconColor = 'secondary';

/**
 * @callback whenDataReady
 * @param {*} status
 */

/**
 * access an external resource via jwt token
 * @param {whenDataReady} cb 
 * @param {*} session
 */
const fetcherExternalApi = async (cb, session)=>{
    try {
        const data = await fetch('/api/java/fetch-external-users', { 
            headers: { Authorization: 'Bearer ' + session?.user?.accessToken??'not-found' }, 
        });
        if(data.ok){
            const json = await data.json();
            console.log(`[user-list] user data ..........user:`, json);
            cb(json);
        } else {
            throw new Error(`${data.status} ${data.statusText}`);
        }
        
    } catch (error) {
        console.log("[user-list] fetcherExternalApi error: ", error);
        cb([]);
    }
    
}

/**
 * access a protected resource
 * @param {whenDataReady} cb 
 */
 const fetcherProtectApi = async (cb)=>{
    try {
        const data = await fetch('/api/protect/fetch-users');
        const json = await data.json();
        console.log(`[Profile] user data ..........user:`, json);
        cb(json);
    } catch (error) {
        cb([]);
    }
    
}

/**
 * 
 * @returns {React.JSX.Element}
 */
export default function UserListPage() {

    const { data: session, status } = useSession();
    const [userData, setUserData] = useState();
    const [extUserData, setExtUserData] = useState();

    console.log(`[Profile] session [${status}]..........user:`, session);

    useAuth(status);

    useEffect(()=>{
        if(status==='authenticated') {
            fetcherProtectApi(e=>setUserData(e));
            fetcherExternalApi(e=>setExtUserData(e), session);
        }
    }, [status])

    if(status!=='authenticated') {
        return <Loading type="points" size='sm' />
    }

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
                            <UserListComponent userData={extUserData} isLoading={!extUserData}/>
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