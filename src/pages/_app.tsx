import type { AppProps } from "next/app";
import Contexts from "../context";
import Page from "../layouts/page";
import GlobalStyle from "../styles/global";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Contexts>
      <GlobalStyle />
      <Page>
        <Component {...pageProps} />
      </Page>
    </Contexts>
  );
}

export default MyApp;

