import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import useCounterStore from '../../store/zustand-store';
import { useEffect } from 'react';
import { Text, Avatar, Button, Grid, Dropdown, Link, Row, Col, Card, Spacer } from '@nextui-org/react';

export default function MoneyBook() {

    const money1 = useCounterStore(state=>state.money.money1.balance);
    const money2 = useCounterStore(state=>state.money.money2.balance);
    const [addMoney, drawMoney] = useCounterStore(state=>[state.addMoney, state.drawMoney]);

    useEffect(()=>{
        const unsub = useCounterStore.subscribe(state=>console.log(state.money.money1, state.money.money2));
        return ()=>unsub();
    }, []);

    //const noEvent = () => { addMoney }

    return (
        <Layout>
            <Head>
                <title>Money Book</title>
            </Head>
            <Text h3>Money Book, Zustand Store</Text>
            <ul>
                <li>deep nested state update with Immer</li>
                <li>state, total Money {money1+money2}</li>
            </ul>
            
            <Row justify='flex-start'>
                <span>Account 888 ({money1})</span>  
                <Spacer x={5}></Spacer>
                <Button size='xs' onPress={()=>addMoney('888', 1)} flat>Save Money +</Button>
                <Spacer x={1}></Spacer>
                <Button size='xs' onPress={()=>drawMoney('888', 1)} flat>Draw Money -</Button>
            </Row>
            <Row> <Spacer x={1}></Spacer> </Row>
            <Row justify='flex-start'>
                <span>Account 999 ({money2})</span>  
                <Spacer x={5}></Spacer>
                <Button size='xs' onPress={()=>addMoney('999', 1)} flat>Save Money +</Button>
                <Spacer x={1}></Spacer>
                <Button size='xs' onPress={()=>drawMoney('999', 1)} flat>Draw Money -</Button>
            </Row>


        </Layout>
    );
}