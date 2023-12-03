import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { GenderEnum, SliceDataType } from "../../types/types";
import styles from "../Share/Form.module.css";

export default function ControlledForm() {
  const { register } = useForm<SliceDataType>();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSubmit, setPasswordSubmit] = useState("");
  const [gender, setGender] = useState<GenderEnum>(GenderEnum.female);
  const [image, setImage] = useState("");
  const [terms, setTerms] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      name,
      age,
      mail,
      password,
      passwordSubmit,
      gender,
      image,
      terms,
    );
  }

  return (
    <>
      <h2>Controlled form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            {...register("name")}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>

        <label>
          Age
          <input
            {...register("age")}
            type="number"
            onChange={(e) => {
              setAge(Number(e.target.value));
            }}
          />
        </label>

        <label>
          E-mail
          <input
            {...register("mail")}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
        </label>

        <label>
          Password
          <input
            {...register("password")}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <label>
          Submit Password
          <input
            type="password"
            onChange={(event) => {
              setPasswordSubmit(event.target.value);
            }}
          />
        </label>

        <label>
          Gender Selection
          <select
            {...register("gender")}
            onChange={(e) => {
              setGender(e.target.value as GenderEnum);
            }}
          >
            <option value={GenderEnum.female}>female</option>
            <option value={GenderEnum.male}>male</option>
            <option value={GenderEnum.other}>other</option>
          </select>
        </label>

        <label>
          Image
          <input
            {...register("image")}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </label>

        <label>
          accept T&C
          <input
            type="checkbox"
            {...register("terms")}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
          />
        </label>

        <button type="submit">Accept</button>
      </form>
    </>
  );
}
