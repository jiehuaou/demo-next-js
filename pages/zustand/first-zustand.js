import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../../components/layout';
import useCounterStore from '../../store/zustand-store';

export default function ZustandDemo() {

    const {count, total, increment, decrement} = useCounterStore();

    useEffect(()=>{
        console.log('........ render .......');
        const unsub = useCounterStore.subscribe(state=>console.log(state.count, state.total));
        return ()=>unsub();
        
    }, []);

    return (<Layout>
        <Head>
            <title>Zustand Demo</title>
        </Head>

        <h1>Zustand Demo</h1>
        <h2>
        Zustand is state management.
        </h2>
        <p>Zustand is lightweight.</p>
        <div>
            <p>Your current is {count}, your total is {total}</p>
            <button onClick={increment}>Increment +</button>
            <button onClick={decrement}>Decrement -</button>
          </div>

    </Layout>)
}