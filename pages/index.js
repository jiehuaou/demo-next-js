import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/data';

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
          Read <Link href="/comments/first-comment">this Comment</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/unstate/first-unstate">this Unstate</Link>
        </h1>
        <h1 className={utilStyles.title}>
          Read <Link href="/zustand/first-zustand">this Zustand</Link>
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