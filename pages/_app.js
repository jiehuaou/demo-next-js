import '../styles/globals.css';
import { ThemeProvider } from "../context/theme";
import useCounterStore from '../store/zustand-store';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";

const REFETCH_INTERVAL_SECOND = parseInt(process.env.REFETCH_INTERVAL_SECOND || '30');

export default function App({ Component, pageProps}) {

  console.log("---------------app start----------------------");
  // return <Component {...pageProps} />;

  /**
   * session refetch on Interval of 10 seconds, force session to be checked expired.
   */
  return (
    <SessionProvider session={pageProps.session} refetchInterval={REFETCH_INTERVAL_SECOND}>
      <NextUIProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
