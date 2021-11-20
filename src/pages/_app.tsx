import type { AppProps } from "next/app";
import Page from "../layouts/page";
import GlobalStyle from "../styles/global";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Page>
        <Component {...pageProps} />
      </Page>
    </>
  );
}

export default MyApp;

