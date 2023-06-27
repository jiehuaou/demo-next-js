import { useRef } from "react";
import { getProviders, getSession, signIn } from "next-auth/react"
import { Button, Card, Grid, Input, Row, Spacer } from "@nextui-org/react";
import Link from "next/link";


const tryLogin = (email, password)=>{
    console.log(`try login .......... ${email} / ${password}`);
    debugger;
    signIn("credentials", {
        email, password,
    })
}

/**
 * mock the login page
 * 
 * @param {any} param0 
 * @returns 
 */
const Signin = ({ providers }) => {
    //console.log("............", providers);
    const email = useRef("johnDoe@xyz.com");
    const password = useRef("1234");
    return (
        <Grid.Container justify='center'>
            <Grid xs={8} md={7}>
                <Card>
                    <Card.Header>
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body justify='center'>
                        <form action="#" className="flex flex-col space-y-5">

                            <Spacer y={1.6} />
                            <Row justify="center">
                                <Input clearable bordered labelPlaceholder="Name" initialValue="johnDoe@xyz.com"
                                    label="Email"
                                    onChange={(e) => (email.current = e.target.value)}
                                /></Row>
                            <Spacer y={1.6} />
                            <Row justify="center">
                                <Input clearable bordered labelPlaceholder="Name" initialValue="1234"
                                    label="Password"
                                    onChange={(e) => (password.current = e.target.value)}
                                /></Row>
                            <Spacer y={1} />
                            <Row justify="center">
                                <Button flat bordered onPress={() => tryLogin(email.current, password.current)}>
                                    Log in
                                </Button>
                            </Row>
                            <Spacer y={1} />
                            <Row justify='flex-end'>
                                <a href="#" onClick={()=>signIn("github")}>Or you can login with Github</a>
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