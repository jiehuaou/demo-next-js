import { Button, Card, Row, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import  { useEffect } from 'react';
import Layout from '../../components/layout';
import useCounterStore from '../../store/zustand-store';


/**
 * ZustandDemo component.
 *
 * @return {JSX.Element} A React component.
 */
const ZustandDemo = () => {

    const {inited, init, count, total, increment, decrement} = useCounterStore();

    useEffect(()=>{
        if(!inited){
            init();
            console.log('........ init store again.........' + inited);
        }
        console.log('........ render .......');
        const unsub = useCounterStore.subscribe(state=>console.log(state.count, state.total));
        return ()=>unsub();
        
    }, []);

    return (<Layout>
        <Head>
            <title>Zustand Demo</title>
        </Head>

        <Text h3>Zustand Demo</Text>
        <Text>Zustand is state management.</Text>
        <Text>Zustand is lightweight.</Text>
        <Spacer y={1}/>
        <Card>
            <Card.Header>
                <Text h4>your total is {total}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Text>Your current is {count}, </Text>
            </Card.Body>
            
            <Card.Footer>
                <Row justify='flex-end'>
                    <Button onPress={increment} size='sm'>Increment +</Button>
                    <Spacer x={1}/>
                    <Button onPress={decrement} size='sm'>Decrement -</Button>
                </Row>
            </Card.Footer>
            
          </Card>

    </Layout>)
}

export default ZustandDemo;