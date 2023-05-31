import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import Alert from '../../components/alert';
import useSWR from 'swr';
import { useState } from "react";

export default function FirstPost() {
  const [score, setScore] = useState(0);
  const increaseScore = () => setScore(score + 1);

  const [alert, setAlert] = useState('success');
  const changeAlert = () => setAlert(alert=='success'?'error':'success');

  const changeEverything = () => {increaseScore();changeAlert();}

  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        hello world
      </h2>
      <Alert type={alert}><div>hello</div></Alert>

      <div>
        <p>Your score is {score}</p>
        <button onClick={changeEverything}>Click this +</button>
      </div>

    </Layout>
  );
}