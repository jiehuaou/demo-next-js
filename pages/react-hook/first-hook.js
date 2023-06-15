import Layout from "../../components/layout";
import Head from 'next/head';
import { Text, Row, Input, Button, Card, Spacer, Grid } from "@nextui-org/react";
import { memo, useCallback, useEffect, useState } from "react";

/**
 * use memo to wrap component to skip re-rendering when its props are the same as on last render
 */
const PostButton = memo(({ helloAction }) => {

    useEffect(() => {
        // will show log at every render if not using useCallback, even if data is not changed.
        console.log('2) hello...  helloAction=>' + helloAction);
    }, [helloAction]);

    // will show log at every render if not using "memo"
    console.log('1) hello...  helloAction=>' + helloAction);

    // without useCallback & memo, this Button will re-render at every round 
    return (
        <Button onPress={helloAction} size='sm'>hello</Button>
    )
});

/**
 * use memo to wrap component to skip re-rendering when its props are the same as on last render
 */
const ResetButton = memo(({ resetAction }) => {

    useEffect(() => {
        // will show log at every render if not using useCallback
        console.log('2) reset...resetAction=>' + resetAction);
    }, [resetAction]);

    console.log('1) reset...resetAction=>' + resetAction);

    // without useCallback, this Button will re-render at every round since "doSomething" is different. 
    return (
        <Button onPress={resetAction} size='sm'>Reset</Button>
    )
});

export default function FirstHook() {

    const [data, setData] = useState('world');
    const [output, setOutput] = useState('');

    // useCallback to cache function when Dependency not changed
    // since ()=>{} will always be different object.
    const sayHello = useCallback(() => {
        setOutput('hello ' + data);
    }, [data, setOutput]);

    // useCallback to cache function when Dependency not changed
    // since ()=>{} will always be different object.
    const resetHello = useCallback(() => {
        setOutput('...');
    }, [setOutput]);

    console.log('data=>' + data, 'output=>' + output);

    return (
        <Layout>
            <Head>
                <title>React Hook</title>
            </Head>

            <Card css={{ mw: "800px" }}>
                <Card.Header>
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                            <Text h3>React Hook</Text>
                        </Grid>
                        <Grid xs={12}>
                            <Text size='medium'><b>* useCallback</b> to cache function when Dependency not changed</Text>
                        </Grid>
                        <Grid xs={12}>
                            <Text size='medium'><b>* memo</b> to skip re-rendering when Args not changed</Text>
                        </Grid>
                    </Grid.Container>

                </Card.Header>
                <Card.Divider></Card.Divider>
                <Card.Body>
                    <Row justify='space-evenly'>
                        <Input label="Please Input" placeholder="Next UI" value={data} onChange={(e) => {
                            setData(e.target.value);
                        }} clearable />

                        <Text>{output}</Text>

                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row justify='center'>
                        <PostButton helloAction={sayHello} /> <Spacer x={1} />
                        <ResetButton resetAction={resetHello} />
                    </Row>
                </Card.Footer>
            </Card>


        </Layout>
    )
}