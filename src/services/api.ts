import axios from "axios";

// Cria uma instância do axios com uma URL base
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api",
});
