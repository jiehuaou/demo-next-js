import { useRef, useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react"
import { Button, Card, Grid, Input, Row, Spacer, Text, Badge, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/router';

const tryLogin = (emailSet, password, callbackUrl) => {
    console.log(`try login .......... ${emailSet} / ${password}`);
    const collection = [...emailSet];
    const email = collection[0];
    // debugger;
    signIn("credentials", {
        email, password,
        callbackUrl
    })
}

const onUpdateEmail = (e, setEmail) => {
    console.log(`update email .......... `, e);
    setEmail(new Set([e.currentKey]));
}

const ErrorPanel = ({ error }) => {
    if (!error) {
        return null;
    }
    return (<>
        <Spacer x={1} /><Text>😜</Text><Badge size="lg" color='error'>Login Failed</Badge>
    </>)
}

/**
 * mock the login page
 * 
 * @param {any} param0 
 * @returns 
 */
const Signin = ({ providers }) => {
    //console.log("............", providers);
    const [email, setEmail] = useState(new Set(["johnDoe@xyz.com"]));
    const password = useRef("1234");

    const router = useRouter();
    const { error, callbackUrl } = router.query;
    console.log('login error ............. ', error, callbackUrl);

    return (
        <Grid.Container justify='center'>
            <Grid xs={8} md={7}>
                <Card>
                    <Card.Header>
                        <Text h3>Account Login</Text>
                        {
                            error ? <ErrorPanel error={error} /> : null
                        }
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body justify='center'>
                        <form action="#" className="flex flex-col space-y-5">

                            <Spacer y={1.6} />
                            <Row justify="center">
                                <Dropdown>
                                    <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                                        {email}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Single selection actions"
                                        color="primary"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={email}
                                        // @ts-ignore
                                        onSelectionChange={e=> onUpdateEmail(e, setEmail)}
                                    >
                                        <Dropdown.Item key="johnDoe@xyz.com">johnDoe@xyz.com</Dropdown.Item>
                                        <Dropdown.Item key="JohnAdmin@xyz.com">JohnAdmin@xyz.com</Dropdown.Item>
                                        <Dropdown.Item key="judeDoe@xyz.com">judeDoe@xyz.com</Dropdown.Item>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Row>
                            <Spacer y={1.6} />
                            <Row justify="center">
                                <Input clearable bordered labelPlaceholder="Name" initialValue="1234"
                                    label="Password"
                                    onChange={(e) => (password.current = e.target.value)}
                                /></Row>
                            <Spacer y={1} />
                            <Row justify="center">
                                <Button flat bordered onPress={() => tryLogin(email, password.current, callbackUrl)}>
                                    Log in
                                </Button>
                            </Row>
                            <Spacer y={1} />
                            <Row justify='flex-end'>
                                <a href="#" onClick={() => signIn("github")}>Or you can login with Github</a>
                            </Row>

                        </form>
                    </Card.Body>
                </Card>
            </Grid>
            <Grid xs={6} md={6} justify='flex-end'>
                <Link href="/"> back home </Link>
            </Grid>
        </Grid.Container>

    )
}
export default Signin;

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders()
    if (session) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {
            providers,
        },
    }
}