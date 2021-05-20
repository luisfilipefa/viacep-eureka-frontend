import { FormEvent, useRef, useState } from "react";

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
  const [cepInfo, setCepInfo] = useState<CepInfo | null>();
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchCep = async (event: FormEvent) => {
    event.preventDefault();

    const { data } = await api.get(`/cep/${searchRef.current.value}`);

    if (data.data.erro) {
      setCepInfo(null);
      return;
    }

    setCepInfo(data.data);
  };

  return (
    <div className={styles.container}>
      <h1>CEP Helper</h1>
      <form onSubmit={handleSearchCep}>
        <input type="text" placeholder="Digite um cep" ref={searchRef} />
        <button type="submit">Buscar</button>
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
      ) : (
        <div className={styles.emptyContainer}>
          <p>Ops, não consegui encontrar nenhuma informação.</p>
        </div>
      )}
    </div>
  );
}
