import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import useCounterStore from '../store/zustand-store';
import { Text, Container, Row, Col, Button, Grid } from '@nextui-org/react';


const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {

  const { total, ready } = useCounterStore();

  //useEffect(()=>{init()}, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
              title={`total: ${total}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}, total {ready ? total : '...'}</h1>
          </>
        ) : (
          <>
            <Grid.Container gap={2} justify="center">
              <Grid xs={2}>
                <Link href="/">
                  <Image
                    priority
                    src="/images/profile.jpg"
                    className={utilStyles.borderCircle}
                    height={60}
                    width={60}
                    alt=""
                    title={`your total ${total}`}
                  />
                </Link>
              </Grid>
              <Grid xs={6}>
                <Text h2 className={utilStyles.headingLg}>
                  <Link href="/" className={utilStyles.colorInherit}>
                    {name}, total {ready ? total : '...'}
                  </Link>
                </Text>
              </Grid>
              <Grid xs={4}>
                <Button size="sm">hello</Button>
              </Grid>
            </Grid.Container>
            <hr />
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
