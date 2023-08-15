import '../styles/globals.css';
import { ThemeProvider } from "../context/theme";
import useCounterStore from '../store/zustand-store';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps}) {

  console.log("---------------app start----------------------");
  // return <Component {...pageProps} />;

  /**
   * session refetch on Interval of 10 seconds, force session to be checked expired.
   */
  return (
    <SessionProvider session={pageProps.session} refetchInterval={10}>
      <NextUIProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
