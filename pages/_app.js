import '../styles/globals.css';
import { ThemeProvider } from "../context/theme";
import useCounterStore from '../store/zustand-store';

export default function App({ Component, pageProps }) {

    console.log("---------------app start----------------------");
    // return <Component {...pageProps} />;
    
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
