import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/data';
import { useEffect } from 'react';
import useCounterStore from '../store/zustand-store';

/**
 * use to build static render
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {

  const {init, inited} = useCounterStore();

  useEffect(()=>{
    if(!inited){
      init();
      console.log('........ init store again.........' + inited);
    }else{
      console.log('........ try to init store again.........' + inited);
    }
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <h1 className={utilStyles.title}>
          Read <Link href="/posts/first-post">this Post</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/react-hook/first-hook">React Hook</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/auth/first-auth">this Auth</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/swr/first-swr">this SWR (cache) Fetch</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/unstate/first-unstate">this Unstate</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/zustand/first-zustand">this Zustand</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/money/money-book">this Money</Link>
        </h1>
      </section>

      <section className='{`${utilStyles.headingMd} ${utilStyles.padding1px}`}'>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}