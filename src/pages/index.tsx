import { FormEvent, useEffect, useRef, useState } from "react";

import { FiX } from "react-icons/fi";
import Head from "next/head";
import { api } from "../services/api";
import styles from "../styles/home.module.scss";

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
  const [cepInfo, setCepInfo] = useState<CepInfo | null>();
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLInputElement>();

  // Função chamada após o submit do form, que irá fazer uma busca na API
  // pelo cep capturado de searchRef.current.value e setar o estado de cepInfo
  // com o valor recebido
  const handleSearchCep = async (event: FormEvent) => {
    event.preventDefault();

    setIsSearching(true);

    const { data } = await api.get(`/cep/${searchRef.current.value}`);

    setIsSearching(false);

    setCepInfo(data.cepInfo);

    searchRef.current.value = "";
  };

  // Função utilizada para resetar o valor do input e do estado cepInfo
  const handleClearSearch = () => {
    searchRef.current.value = "";
    searchRef.current.focus();
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
        <form onSubmit={handleSearchCep}>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Digite um cep" ref={searchRef} />
            <FiX onClick={handleClearSearch} />
          </div>
          <button type="submit">
            {isSearching ? <div className={styles.spinner} /> : "Buscar"}
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
