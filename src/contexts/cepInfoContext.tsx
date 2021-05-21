import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { CepInfo } from "../@types/cepInfo";

interface CepInfoContextData {
  cepInfo: CepInfo;
  setCepInfo: Dispatch<SetStateAction<CepInfo>>;
}

interface CepInfoProviderProps {
  children: ReactNode;
}

export const CepInfoContext = createContext({} as CepInfoContextData);

export function CepInfoProvider({ children }: CepInfoProviderProps) {
  const [cepInfo, setCepInfo] = useState<CepInfo | null>();

  return (
    <CepInfoContext.Provider value={{ cepInfo, setCepInfo }}>
      {children}
    </CepInfoContext.Provider>
  );
}

// Contexto criado para compartilhar o estado cepInfo e a função setCepInfo,
// já que estes dados seriam utilizados em múltiplos componentes, e para evitar
// prop drilling da página inicial
