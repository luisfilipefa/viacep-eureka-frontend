import { CepInfoContext } from "../contexts/CepInfoContext";
import { useContext } from "react";

// Simplesmente retorna o value do contexto CepInfoContext (apenas um atalho)
export const useCepInfo = () => useContext(CepInfoContext);
