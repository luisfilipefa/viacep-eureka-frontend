import * as yup from "yup";

import { useEffect, useState } from "react";

import { FiX } from "react-icons/fi";
import Head from "next/head";
import { api } from "../services/api";
import styles from "../styles/home.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Interface do Typescript para os dados recebidos da API
interface CepInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function Home() {
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
  const [cepInfo, setCepInfo] = useState<CepInfo | null>();

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
    <>
      <Head>
        <title>CEP Helper</title>
      </Head>
      <div className={styles.container}>
        <h1>CEP Helper</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              CEP deve possuir no{" "}
              {errors.cep.type === "min" ? "mínimo" : "máximo"} 8 caracteres
            </p>
          )}
          <button type="submit">
            {isSubmitting ? <div className={styles.spinner} /> : "Buscar"}
          </button>
        </form>
        {!cepInfo ? (
          ""
        ) : cepInfo.cep === "" ? (
          <div className={styles.emptyContainer}>
            <p>Ops, não consegui encontrar nenhuma informação.</p>
          </div>
        ) : (
          <div className={styles.infoContainer}>
            <h3>CEP {cepInfo.cep}</h3>
            <p>
              <strong>Cidade: </strong>
              {cepInfo.localidade} {cepInfo.uf && ` | ${cepInfo.uf}`}
            </p>
            {cepInfo.logradouro && (
              <p>
                <strong>Rua: </strong>
                {cepInfo.logradouro}{" "}
                {cepInfo.complemento && ` | ${cepInfo.complemento}`}
              </p>
            )}
            {cepInfo.bairro && (
              <p>
                <strong>Bairro: </strong>
                {cepInfo.bairro}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
