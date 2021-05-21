import * as yup from "yup";

import React, { useEffect } from "react";

import { FiX } from "react-icons/fi";
import { api } from "../../services/api";
import styles from "./form.module.scss";
import { useCepInfo } from "../../hooks/useCepInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Form() {
  // Definição do schema utilizado no form (biblioteca yup)
  const inputSchema = yup.object().shape({
    cep: yup.string().required("CEP obrigatório").max(8).min(8),
  });

  // Extraindo algumas funções e objetos do hook useForm da biblioteca react-hook-form
  // e definindo o resolver (que vai validar o form) como o yupResolver que recebe o esquema
  // definido acima
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm({ resolver: yupResolver(inputSchema) });

  const { setCepInfo } = useCepInfo();

  // Função chamada após o submit do form, que irá fazer uma busca na API
  // pelo cep capturado do input e setar o estado de cepInfo
  // com o valor recebido da API
  const onSubmit = async (values: { cep: string }) => {
    const { data } = await api.get(`/cep/${values.cep}`);

    setCepInfo(data.cepInfo);

    setValue("cep", "");
    setFocus("cep");
  };

  // Função utilizada para resetar o valor do input e do estado cepInfo
  const handleClearSearch = () => {
    setValue("cep", "");
    setFocus("cep");
    setCepInfo(null);
  };

  // Hook chamado em toda primeira montagem do componente (atualização da página)
  useEffect(() => {
    handleClearSearch();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.searchContainer}>
        {/* A função register vem da bilioteca react-hook-form e tem a função de criar uma ref para o input */}
        <input
          name="cep"
          type="text"
          placeholder="Digite um cep"
          {...register("cep")}
        />
        <FiX onClick={handleClearSearch} />
      </div>
      {errors.cep && (
        <p className={styles.error}>
          CEP deve possuir no {errors.cep.type === "min" ? "mínimo" : "máximo"}{" "}
          8 caracteres
        </p>
      )}
      <button type="submit">
        {isSubmitting ? <div className={styles.spinner} /> : "Buscar"}
      </button>
    </form>
  );
}
