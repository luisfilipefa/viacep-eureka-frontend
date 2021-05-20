import { FormEvent, useRef, useState } from "react";

import { FiX } from "react-icons/fi";
import { api } from "../services/api";
import styles from "../styles/home.module.scss";

interface CepInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function Home() {
  const [cepInfo, setCepInfo] = useState<CepInfo | null | undefined>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchCep = async (event: FormEvent) => {
    try {
      event.preventDefault();

      setIsSearching(true);

      const { data } = await api.get(`/cep/${searchRef.current.value}`);

      setIsSearching(false);

      if (data.data.erro) {
        setCepInfo(undefined);
        return;
      }

      setCepInfo(data.data);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleClearSearch = () => {
    searchRef.current.value = "";
    setCepInfo(null);
  };

  return (
    <div className={styles.container}>
      <h1>CEP Helper</h1>
      <form onSubmit={handleSearchCep}>
        <div>
          <input type="text" placeholder="Digite um cep" ref={searchRef} />
          <button onClick={handleClearSearch}>
            <FiX />
          </button>
        </div>
        <button type="submit">
          {isSearching ? <div className={styles.spinner} /> : "Buscar"}
        </button>
      </form>
      {cepInfo ? (
        <div className={styles.infoContainer}>
          <h3>CEP {cepInfo.cep}</h3>
          <p>
            <strong>Cidade</strong>: {cepInfo.localidade}{" "}
            {cepInfo.uf && ` | ${cepInfo.uf}`}
          </p>
          <p>
            <strong>Rua</strong>: {cepInfo.logradouro}{" "}
            {cepInfo.complemento && ` | ${cepInfo.complemento}`}
          </p>
          <p>
            <strong>Bairro</strong>: {cepInfo.bairro}
          </p>
        </div>
      ) : typeof cepInfo === "undefined" ? (
        <div className={styles.emptyContainer}>
          <p>Ops, não consegui encontrar nenhuma informação.</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
