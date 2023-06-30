import Layout from "../../components/layout";
import Head from 'next/head';
import { Card, Grid, Text, Badge } from "@nextui-org/react";
import { useSession } from "next-auth/react"

const iconColor = 'secondary';

export default function Profile() {

    const { data: session, status } = useSession();

    return (
        <Layout>
            <Head>
                <title>User Profile</title>
            </Head>

            <Card>
                <Card.Header>
                    <Text h3>Hello {status === 'authenticated' ? session?.user?.name : 'your names'}</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                    <Text>This is protected resource, only login user can access this page.</Text>

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
                                <Badge size="lg" color="primary" variant="bordered">{session?.user?.id}</Badge>
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
                    </Grid.Container>
                </Card.Body>
            </Card>

        </Layout>
    )
}