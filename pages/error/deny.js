import { Button, Card, Row, Text } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Head from 'next/head';
import Layout from '@components/layout';

const AccessDenyPage = () => {
    return (
        <Layout>
        <Head>
            <title>Access Deny</title>
        </Head>

        <Card css={{ mw: "630px" }}>
          <Card.Header>
            <Text h2 b>Access Deny</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>You are not allowed to access this page.</Text>
          </Card.Body>
          
          <Card.Footer>
            <Row justify="flex-end">
              <Button size="sm"  color="primary" auto onClick={() => signOut({callbackUrl:'/'})}>Logout</Button>
            </Row>
          </Card.Footer>
        </Card>

    </Layout>
    )
}

export default AccessDenyPage;