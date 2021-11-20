import type { AppProps } from "next/app";
import Contexts from "../context";
import LoginModal from "../layouts/LoginModal";
import Page from "../layouts/page";
import GlobalStyle from "../styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Contexts>
      <GlobalStyle />
      <Page>
        <LoginModal />
        <Component {...pageProps} />
      </Page>
    </Contexts>
  );
}

export default MyApp;
