import '../styles/globals.css';
import { ThemeProvider } from "../context/theme";

export default function App({ Component, pageProps }) {
    // return <Component {...pageProps} />;
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
