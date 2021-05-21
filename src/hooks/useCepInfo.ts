import { CepInfoContext } from "../contexts/cepInfoContext";
import { useContext } from "react";

// Simplesmente retorna o value do contexto CepInfoContext (apenas um atalho)
export const useCepInfo = () => useContext(CepInfoContext);
