import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';
import Alert from '../../components/alert';
import useSWR from 'swr';
import { useState, useReducer } from "react";
import { useThemeContext } from "../../context/theme";

const myReducer = function (state, action) {
    //debugger;
    return state * action;
}

export default function FirstPost() {

    // this is global state
    const [theme, setTheme] = useThemeContext();

    // this is local state
    const [multiplication, doMultiple] = useReducer((state, action) => myReducer(state, action), 50);

    const [alert, setAlert] = useState('success');
    const changeAlert = () => setAlert(alert=='success'?'error':'success');

    const changeEverything = () => {
        changeAlert();
        doMultiple(2); // this is action
        theme == "light" ? setTheme("dark") : setTheme("light");
    }

    return (
        <Layout>
          <Head>
            <title>First Comment</title>
          </Head>
          
          <h1>First Comment</h1>
          <h2>
            Demo Context and Reducer.
          </h2>
          <Alert type={alert} theme={theme}><div>{theme}</div></Alert>
    
          <div>
            <p>Your score is {multiplication}</p>
            <button onClick={changeEverything}>Click this +</button>
          </div>
    
        </Layout>
      );
}