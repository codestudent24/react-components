import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenderEnum } from "../../types/types";
import {
  ageSchema,
  mailSchema,
  nameSchema,
  passwordSchema,
  termsSchema,
} from "../../Validations/Validation";
import styles from "../Share/Form.module.css";
import UncontrolledInput from "./InputComponent";
import { useAppDispatch } from "../../redux/store";
import {
  setAge,
  setGender,
  setImage,
  setMail,
  setName,
  setPassword,
} from "../../redux/uncontrolledSlice";
import {
  comparePasswords,
  validateImage,
  isValidString,
  isValidNumber,
  isValidBoolean,
} from "../../utils/functions";

export default function UncontrolledForm() {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSubmitError, setPasswordSubmitError] = useState("");
  const [imageError, setImageError] = useState("");
  const [termsError, setTermsError] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordSubmitRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      nameRef.current &&
      mailRef.current &&
      passwordRef.current &&
      ageRef.current &&
      passwordSubmitRef.current &&
      imageRef.current &&
      termsRef.current &&
      genderRef.current
    ) {
      const nameIsValid = await isValidString(
        nameRef.current.value,
        nameSchema,
        setNameError,
      );
      const mailIsValid = await isValidString(
        mailRef.current.value,
        mailSchema,
        setMailError,
      );
      const passwordIsValid = await isValidString(
        passwordRef.current.value,
        passwordSchema,
        setPasswordError,
      );
      const ageIsValid = await isValidNumber(
        Number(ageRef.current.value),
        ageSchema,
        setAgeError,
      );
      const passwordSubmitIsValid = comparePasswords(
        passwordRef.current.value,
        passwordSubmitRef.current.value,
        setPasswordSubmitError,
      );
      const termsIsValid = await isValidBoolean(
        termsRef.current.checked,
        termsSchema,
        setTermsError,
      );

      if (imageRef.current.files) {
        await validateImage(
          imageRef.current.files[0],
          setImageError,
          dispatch,
          setImage,
        );
      }
      if (
        nameIsValid &&
        mailIsValid &&
        passwordIsValid &&
        passwordSubmitIsValid &&
        ageIsValid &&
        termsIsValid &&
        imageError.length === 0
      ) {
        dispatch(setName(nameRef.current.value));
        dispatch(setMail(mailRef.current.value));
        dispatch(setPassword(passwordRef.current.value));
        dispatch(setAge(Number(ageRef.current.value)));
        dispatch(setGender(genderRef.current.value as GenderEnum));
        navigate("/");
      }
    }
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

        <div className={styles.inputContainer}>
          <label htmlFor="country">Select country</label>
          <input ref={countryRef} list="countries" />
          <datalist id="countries">
            <option value="Russian Federasion" />
            <option value="USA" />
            <option value="Kazakhstan" />
          </datalist>
        </div>

        <UncontrolledInput
          label="accept T&C"
          id="terms"
          ref={termsRef}
          type="checkbox"
          error={termsError}
        />

        <button type="submit">Accept</button>
      </form>
    </>
  );
}
