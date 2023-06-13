import '../styles/globals.css';
import { ThemeProvider } from "../context/theme";
import useCounterStore from '../store/zustand-store';
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }) {

  console.log("---------------app start----------------------");
  // return <Component {...pageProps} />;

  return (
    <NextUIProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextUIProvider>
  );
}
