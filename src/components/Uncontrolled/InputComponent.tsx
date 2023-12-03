import React from "react";
import styles from "../Share/Form.module.css";

type Props = {
  label: string;
  id: string;
  type?: string;
  error?: string;
};

function getErrorMessage(error: string) {
  return error.length ? `Error: ${error}` : "";
}

const UncontrolledInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, id, type = "text", error = "" }: Props, ref) => {
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} ref={ref} />
        <p>{getErrorMessage(error)}</p>
      </div>
    );
  },
);

export default UncontrolledInput;
