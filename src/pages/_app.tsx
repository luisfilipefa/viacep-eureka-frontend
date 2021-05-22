import "../styles/global.scss";

import { CepInfoProvider } from "../contexts/CepInfoContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <CepInfoProvider>
      <Component {...pageProps} />
    </CepInfoProvider>
  );
}
