import Layout from "../../components/layout";
import Head from 'next/head';
import { Card, Grid, Text } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Profile() {

    const { data: session, status } = useSession();

    return (
        <Layout>
            <Head>
                <title>React Hook</title>
            </Head>
            
                    <Card>
                        <Card.Header>
                            <Text h3>Hello {status === 'authenticated' ? session?.user?.name : 'your names'}</Text>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body>
                            <Text>status: {status}</Text>
                        </Card.Body>
                    </Card>
                
        </Layout>
    )
}