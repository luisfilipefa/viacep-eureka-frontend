import "../styles/global.scss";

import { CepInfoProvider } from "../contexts/CepInfoContext";
import { FormProvider } from "../contexts/FormContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <CepInfoProvider>
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </CepInfoProvider>
  );
}
