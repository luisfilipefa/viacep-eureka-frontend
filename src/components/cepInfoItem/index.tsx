import styles from "./cepInfoItem.module.scss";
import { useCepInfo } from "../../hooks/useCepInfo";

export default function CepInfoItem() {
  const { cepInfo } = useCepInfo();

  return (
    <>
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
    </>
  );
}
