import { FormEvent, useRef, useState } from "react";
import { GenderEnum } from "../../types/types";
import {
  ageSchema,
  mailSchema,
  nameSchema,
  passwordSchema,
} from "../../Validations/Validation";
import styles from "../Share/Form.module.css";
import UncontrolledInput from "./InputComponent";
import { useAppDispatch } from "../../redux/store";
import {
  setAge,
  setImage,
  setMail,
  setName,
  setPassword,
} from "../../redux/uncontrolledSlice";
import {
  validateString,
  validateNumber,
  comparePasswords,
  validateImage,
  // toBase64,
} from "../../utils/functions";

export default function UncontrolledForm() {
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSubmitError, setPasswordSubmitError] = useState("");
  // const [genderError, setGenderError] = useState("");
  const [imageError, setImageError] = useState("");
  // const [termsError, setTermsError] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordSubmitRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateString(nameRef, nameSchema, setNameError, dispatch, setName);
    validateString(mailRef, mailSchema, setMailError, dispatch, setMail);
    validateNumber(ageRef, ageSchema, setAgeError, dispatch, setAge);
    validateString(
      passwordRef,
      passwordSchema,
      setPasswordError,
      dispatch,
      setPassword,
    );
    comparePasswords(passwordRef, passwordSubmitRef, setPasswordSubmitError);
    validateImage(imageRef, setImageError, dispatch, setImage);
  }

  return (
    <>
      <h2>Uncontrolled form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UncontrolledInput
          label="First Name"
          id="name"
          ref={nameRef}
          error={nameError}
        />
        <UncontrolledInput
          label="Age"
          id="age"
          ref={ageRef}
          type="number"
          error={ageError}
        />
        <UncontrolledInput
          label="E-mail"
          id="mail"
          ref={mailRef}
          error={mailError}
        />
        <UncontrolledInput
          label="Password"
          id="password"
          ref={passwordRef}
          type="password"
          error={passwordError}
        />
        <UncontrolledInput
          label="Submit Password"
          id="passwordSubmit"
          ref={passwordSubmitRef}
          type="password"
          error={passwordSubmitError}
        />

        <div className={styles.inputContainer}>
          <label htmlFor="gender">Select gender</label>
          <select ref={genderRef}>
            <option value={GenderEnum.female}>female</option>
            <option value={GenderEnum.male}>male</option>
            <option value={GenderEnum.other}>other</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="image">Choose Image</label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            defaultValue={""}
            ref={imageRef}
          />
          <p>{imageError}</p>
        </div>
        <UncontrolledInput
          label="accept T&C"
          id="terms"
          ref={termsRef}
          type="checkbox"
        />

        <button type="submit">Accept</button>
      </form>
    </>
  );
}
