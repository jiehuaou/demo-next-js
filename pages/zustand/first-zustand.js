import Head from 'next/head';
import Layout from '../../components/layout';
import useCounterStore from '../../store/zustand-store';

export default function ZustandDemo() {

    const {count, increment, decrement} = useCounterStore();

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
            <p>Your score is {count}</p>
            <button onClick={increment}>Increment +</button>
            <button onClick={decrement}>Decrement -</button>
          </div>

    </Layout>)
}