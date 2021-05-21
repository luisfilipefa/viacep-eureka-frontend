import { FormContext } from "../contexts/FormContext";
import { useContext } from "react";

export const useForm = () => useContext(FormContext);
