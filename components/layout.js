//@ts-check
import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import NextLink from 'next/link';
import useCounterStore from '../store/zustand-store';
import { Text, Avatar, Button, Grid, Dropdown, Card, Loading, Row, Spacer } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react';
// import Session from 'next-auth/core/types';
// import React from 'react';

const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

function getFirstValue(set) {
  return set.values()?.next()?.value;
}



/**
 * @param {object} props
 * @param {import('next-auth/core/types').Session|null} props.session 
 * @param {"authenticated" | "loading" | "unauthenticated"} props.status
 * @returns {import('react').ReactElement}
 */
const UserName = function ({session, status}) {
  if(status==='loading') {
    return (<Loading />)
  } else if (status==='authenticated') {
    // @ts-ignore
    return (<Text h2>{session.user.name}</Text>)
  } else if (status==='unauthenticated') {
    return (<Text h2>Your Name</Text>)
  }
  return <></>;
}

/**
 * @param {object} props
 * @param {import('next-auth/core/types').Session|null} props.session 
 * @returns {import('react').ReactElement}
 */
const SignInOut = function ({session}) {
  if (session) {
    return (
      <Button flat={true} onPress={e=>signOut()}>sign Out</Button>
    )
  } else {
    return (
      <Button flat={true} onPress={e=>signIn()}>sign In</Button>
    )
  }
}





export default function Layout({ children, home }) {

  const { data:session, status } = useSession()
  const [ total, ready ] = useCounterStore( (state) => [state.total, state.ready], shallow);
  const [color1, setColor1] = useState(new Set(['primary']));

  
  [...color1?.values()].forEach(e => {
    console.log("color ..........." + e);
  });

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
            <Row justify='center'>
              <UserName session={session} status={status}></UserName>
              <Spacer x={1}/>
              <h2> total {ready ? total : '...'}, </h2>
            </Row>
            <SignInOut session={session} />
            
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
                <Text size="$2xl" color={getFirstValue(color1)}>
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
                    // @ts-ignore
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
          <Grid.Container gap={2}>
            <Grid xs={4}>
              <Card>
                <Card.Body>
                  <NextLink href="/">
                  <Text color="primary" css={{}} > Back to home ← </Text>
                  </NextLink>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
      )}
    </div>
  );
}
