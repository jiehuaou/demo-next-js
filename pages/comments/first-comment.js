import Head from 'next/head';
import { useReducer, useState } from "react";
import Alert from '../../components/alert';
import Layout from '../../components/layout';
import { useThemeContext } from "../../context/theme";

/**
 * A description of the entire function.
 *
 * @param {number} state - the state parameter
 * @param {number} action - the action parameter
 * @return {number} the result of multiplying the state and action
 */
const myReducer = function (state, action) {
    //debugger;
    return state * action;
}

export default function FirstComment() {

   
    // @ts-ignore
    const [theme, setTheme] = useThemeContext();

    // this is local state
    const [multiplication, doMultiple] = useReducer( myReducer, 50);

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
          <p>
            Demo Context and Reducer, and change theme.
          </p>
          <Alert type={alert} theme={theme}><div>{theme}</div></Alert>
    
          <div>
            <p>Your score is {multiplication}</p>
            <button onClick={changeEverything}>Click this +</button>
          </div>
    
        </Layout>
      );
}