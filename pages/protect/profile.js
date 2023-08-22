import Layout from "../../components/layout";
import Head from 'next/head';
import { Card, Grid, Text, Badge, Button, Loading } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react"
import useAuth from "../../hook/use-auth";

const iconColor = 'secondary';

const ProfileBody = ({session, status}) => {
    return (
        <Grid.Container alignItems="center" gap={2}>
                        <Grid>
                            <Badge color={iconColor} content='name'>
                                <Badge size="lg" color="primary" variant="bordered">{session?.user?.name}</Badge>
                            </Badge>
                        </Grid>
                        <Grid>
                            <Badge color={iconColor} content='email'>
                                <Badge size="lg" color="primary" variant="bordered">{session?.user?.email}</Badge>
                            </Badge>
                        </Grid>
                        <Grid>
                            <Badge color={iconColor} content='id'>
                                <Badge size="lg" color="primary" variant="bordered">{session?.user?.sub}</Badge>
                            </Badge>
                        </Grid>
                        <Grid>
                            <Badge color={iconColor} content='role'>
                                <Badge size="lg" color="primary" variant="bordered">{session?.user?.role}</Badge>
                            </Badge>
                        </Grid>
                        <Grid>
                            <Badge color={iconColor} content='status'>
                                <Badge size="lg" color="primary" variant="bordered">{status}</Badge>
                            </Badge>
                        </Grid>
                        <Grid>
                            <Button size={'sm'} color="primary" onPress={signOut}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid.Container>
    )
}

export default function Profile() {

    const { data: session, status } = useSession();
    //console.log(`[Profile] session [${status}]..........user:`, session?.user);
    useAuth(status);

    // if(status!=='authenticated') {
    //     return <Loading type="points" size='sm' />
    // }

    return (
        <Layout home={false}>
            <Head>
                <title>User Profile</title>
            </Head>

            <Card>
                <Card.Header>
                    <Text h3>Profile - {status === 'authenticated' ? session?.user?.name : 'your names'}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                    <Text>This is protected resource, only login user can access this page.</Text>
                    {
                        status === 'authenticated' ? 
                            <ProfileBody session={session} status={status}/>
                            :<Loading type="points" size='sm' />
                    }
                    
                </Card.Body>
            </Card>

        </Layout>
    )
}