import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { GenderEnum } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import styles from "../Share/Form.module.css";
import {
  getPasswordElementStrength,
  validateImage,
} from "../../utils/functions";
import {
  setAge,
  setGender,
  setImage,
  setMail,
  setName,
  setPassword,
} from "../../redux/controlledSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, FormData } from "../../Validations/shape";
import { useAppSelector } from "../../redux/hooks";

export default function ControlledForm() {
  const [imageError, setImageError] = useState("select image");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const { countries } = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
    if (
      !errors.name &&
      !errors.age &&
      !errors.mail &&
      !errors.password &&
      !errors.passwordSubmit &&
      !errors.terms &&
      !errors.country &&
      imageError.length === 0
    ) {
      dispatch(setName(data.name));
      dispatch(setMail(data.mail));
      dispatch(setPassword(data.password));
      dispatch(setAge(Number(data.age)));
      dispatch(setGender(data.gender as GenderEnum));
      navigate("/");
    }
  };

  return (
    <>
      <h2>Controlled form</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="image">Name</label>
          <input id="image" {...register("name")} />
          <p>{errors.name?.message || ""}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register("age")} />
          <p>{errors.age?.message || ""}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="mail">E-mail</label>
          <input id="mail" {...register("mail")} />
          <p>{errors.mail?.message || ""}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input id="password" {...register("password")} />
          <br />
          <label>strength</label>
          <progress value={getPasswordElementStrength(passwordRef)} max={100} />
          <p>{errors.password?.message || ""}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="passwordSubmit">Submit Password</label>
          <input
            id="passwordSubmit"
            {...register("passwordSubmit")}
            ref={passwordRef}
          />
          <p>{errors.passwordSubmit?.message || ""}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="gender">Select gender</label>
          <select {...register("gender")}>
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
            onChange={(e) => {
              if (e.target.files) {
                validateImage(
                  e.target.files[0],
                  setImageError,
                  dispatch,
                  setImage,
                );
              }
            }}
          />
          <p>{imageError}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="country">Select country</label>
          <input {...register("country")} list="countries" />
          <datalist id="countries">
            {countries.map((item) => (
              <option value={item.name} key={item.name} />
            ))}
          </datalist>
          <p>{errors.country?.message || ""}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="image">accept T&C</label>
          <input id="terms" type="checkbox" {...register("terms")} />
          <p>{errors.terms?.message || ""}</p>
        </div>

        <button type="submit">Accept</button>
      </form>
    </>
  );
}
