import "../styles/global.scss";

import { CepInfoProvider } from "../contexts/cepInfoContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <CepInfoProvider>
      <Component {...pageProps} />
    </CepInfoProvider>
  );
}
