import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../context/theme";
import '../styles/globals.css';

const REFETCH_INTERVAL_SECOND = parseInt(process.env.REFETCH_INTERVAL_SECOND || '30');

/**
 * Generate the function comment for the given function body.
 * @param {object} args
 * @param {React.FunctionComponent} args.Component - The component to render.
 * @param {{session:import('next-auth').Session}} args.pageProps - The props for the component.
 * @return {JSX.Element} The rendered component.
 */
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
