import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from "react";
import Alert from '../../components/alert';
import Layout from '../../components/layout';

export default function PostItem() {

    const router = useRouter();
    const {postId} = router.query;

    const goBack = () => { router.back(); }

    return (
        <Layout>
            <Head>
                <title>Post Item</title>
            </Head>

            <h2>Post Item</h2>
            <div>Dynamic Route</div>
            
            <div>
                <p>Your Post is {postId}</p>
                <button onClick={goBack}>go back</button>
            </div>

        </Layout>
    );
}