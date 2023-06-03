import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import useCounterStore from '../../store/zustand-store';
import { useEffect } from 'react';

export default function MoneyBook() {

    const money1 = useCounterStore(state=>state.money.money1.balance);
    const money2 = useCounterStore(state=>state.money.money2.balance);
    const [addMoney, drawMoney] = useCounterStore(state=>[state.addMoney, state.drawMoney]);

    useEffect(()=>{
        const unsub = useCounterStore.subscribe(state=>console.log(state.money.money1, state.money.money2));
        return ()=>unsub();
    }, []);

    const noEvent = () => { addMoney }

    return (
        <Layout>
            <Head>
                <title>Money Book</title>
            </Head>
            <h1>Money Book</h1>
            <p>show deep nested state update, total Money {money1+money2}</p>
            <h2>
                Account 888 <span>({money1})</span>  <button onClick={()=>addMoney('888', 1)}>Save Money +</button>
                <button onClick={()=>drawMoney('888', 2)}>Draw Money -</button>
            </h2>

            <h2>
                Account 999 <span>({money2})</span>  <button onClick={()=>addMoney('999', 1)}>Save Money +</button>
                <button onClick={()=>drawMoney('999', 3)}>Draw Money -</button>
            </h2>


        </Layout>
    );
}