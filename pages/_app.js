import '../styles/globals.css';
import { ThemeProvider } from "../context/theme";
import useCounterStore from '../store/zustand-store';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps : { session, ...pageProps }}) {

  console.log("---------------app start----------------------");
  // return <Component {...pageProps} />;

  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
