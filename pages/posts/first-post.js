import Layout from '@components/layout';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
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
      <h2>First Post</h2>
      <div>Dynamic Route</div>
      <ul>
        {
          [1,2,3].map(e=>{ return (
            <li key={e}>
              <Link href={`/posts/${e}`}>Post {e}</Link>
            </li>)
          })
        }
      </ul>

    </Layout>
  );
}