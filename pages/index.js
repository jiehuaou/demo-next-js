import Head from 'next/head';
import Layout, { siteTitle } from '@comp/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '@lib/data';
import { useEffect } from 'react';
import useCounterStore from '../store/zustand-store';

/**
 * @typedef {import("@lib/data").MatterResult} MatterResult
 */

/**
 * use to build static render
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      postsData: [],
    },
  };
}

/**
 * @param {object} args 
 * @param {MatterResult[]} args.postsData 
 * @returns 
 */
export default function Home({postsData}) {

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
        <div className={utilStyles.title}>
          Read <Link href="/posts/first-post">this Post</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/auth/sign-in">Password Auth</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/protect/profile">Protected Profile (Role: User)⚡㊙️</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/protect/admin/user-list">Protected Users (Role: admin)⚡㊙️</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/react-hook/first-hook">React Hook</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/authx/first-auth">Fake Auth</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/swr/first-swr">SWR (cache) Fetch</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/luni">Proxy to 万年日历</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/zustand/first-zustand">Zustand</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/money/money-book">Money</Link>
        </div>
        <div className={utilStyles.title}>
          Read <Link href="/comments/first-comment">FirstComment</Link>
        </div>
        
      </section>

      <section className='{`${utilStyles.headingMd} ${utilStyles.padding1px}`}'>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* {postsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>            
                {`${title} - ${id} - ${date}`}
            </li>
          ))} */}
        </ul>
      </section>
    </Layout>
  );
}