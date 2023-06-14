import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import useCounterStore from '../store/zustand-store';
import { Text, Avatar, Button, Grid, Dropdown } from '@nextui-org/react';
import { useState } from 'react';


const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

function getSetValue(set) {
  return set.values().next().value;
}

export default function Layout({ children, home }) {

  const { total, ready } = useCounterStore();
  const [color1, setColor1] = useState(new Set(['primary']));

  console.log("color ..........." + color1);

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
                <Avatar
                  src="/images/profile.jpg"
                  color="gradient"
                  bordered
                />
              </Grid>
              <Grid xs={6}>
                <Text size="$2xl" color={getSetValue(color1)}>
                  {name}, total {ready ? total : '...'}
                </Text>
              </Grid>
              <Grid xs={4}>
                <Dropdown>
                  <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                    {color1}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="primary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={color1}
                    onSelectionChange={setColor1}
                  >
                    <Dropdown.Item key="primary">primary</Dropdown.Item>
                    <Dropdown.Item key="secondary">secondary</Dropdown.Item>
                    <Dropdown.Item key="success">success</Dropdown.Item>
                    <Dropdown.Item key="warning">warning</Dropdown.Item>
                    <Dropdown.Item key="error">error</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid>
            </Grid.Container>
            <div><hr /></div>
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
