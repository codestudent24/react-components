import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../types/types";
import { getErrorMessage } from "../../utils/functions";
import styles from "../Share/Form.module.css";

type InputProps = {
  label: string;
  id: Path<IFormValues>;
  error: string;
  register: UseFormRegister<IFormValues>;
  type?: string;
};

export default function Input({
  label,
  id,
  error,
  register,
  type = "text",
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register(id)} />
      <p>{getErrorMessage(error)}</p>
    </div>
  );
}
