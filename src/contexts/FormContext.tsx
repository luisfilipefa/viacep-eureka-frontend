import * as yup from "yup";

import { ReactNode, createContext, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import { api } from "../services/api";
import { useCepInfo } from "../hooks/useCepInfo";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormContextData {
  form: UseFormReturn;
  onSubmit: (values: { cep: string }) => void;
  handleClearSearch: () => void;
}

interface FormProviderProps {
  children: ReactNode;
}

export const FormContext = createContext({} as FormContextData);

export function FormProvider({ children }: FormProviderProps) {
  // Definição do schema utilizado no form (biblioteca yup)
  const inputSchema = yup.object().shape({
    cep: yup.string().required("CEP obrigatório").max(8).min(8),
  });

  // Usando o hook useForm da biblioteca react-hook-form
  // e definindo o resolver (que vai validar o form) como o yupResolver que recebe o esquema
  // definido acima
  const form = useForm({ resolver: yupResolver(inputSchema) });

  const { setCepInfo } = useCepInfo();

  // Função chamada após o submit do form, que irá fazer uma busca na API
  // pelo cep capturado do input e setar o estado de cepInfo
  // com o valor recebido da API
  const onSubmit = async (values: { cep: string }) => {
    try {
      const { data } = await api.get(`/cep/${values.cep}`);

      setCepInfo(data.cepInfo);

      form.setValue("cep", "");
      form.setFocus("cep");
    } catch (err) {
      alert("Erro ao se conectar a API.");
    }
  };

  // Função utilizada para resetar o valor do input e do estado cepInfo
  const handleClearSearch = () => {
    form.setValue("cep", "");
    form.setFocus("cep");
    setCepInfo(null);
  };

  // Hook chamado em toda primeira montagem do componente (atualização da página)
  useEffect(() => {
    handleClearSearch();
  }, []);

  return (
    <FormContext.Provider
      value={{
        form,
        onSubmit,
        handleClearSearch,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
