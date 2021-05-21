import { FiX } from "react-icons/fi";
import React from "react";
import styles from "./form.module.scss";
import { useForm } from "../../hooks/useForm";

export default function Form() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    },
    onSubmit,
    handleClearSearch,
  } = useForm();

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
