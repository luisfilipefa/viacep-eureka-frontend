import CepInfoItem from "../components/cepInfoItem";
import Form from "../components/Form";
import Head from "next/head";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>CEP Helper</title>
      </Head>

      <section className={styles.container}>
        <header>
          <h1>CEP Helper</h1>
        </header>
        <Form />
        <CepInfoItem />
      </section>
    </>
  );
}
