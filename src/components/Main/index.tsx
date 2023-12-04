import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import styles from "./Main.module.css";

export default function Main() {
  const nameControlled = useAppSelector((state) => state.control.name);
  const mailControlled = useAppSelector((state) => state.control.mail);
  const ageControlled = useAppSelector((state) => state.control.age);
  const passwordControlled = useAppSelector((state) => state.control.password);
  const genderControlled = useAppSelector((state) => state.control.gender);
  const imageControlled = useAppSelector((state) => state.control.image);
  const { name, mail, age, password, gender, image } = useAppSelector(
    (state) => state.uncontrol,
  );

  return (
    <main className={styles.main}>
      <div className={styles.controlled}>
        <p>
          <span>Name:&nbsp;</span>
          <span>{nameControlled}</span>
        </p>
        <p>
          <span>Mail:&nbsp;</span>
          <span>{mailControlled}</span>
        </p>
        <p>
          <span>Age:&nbsp;</span>
          <span>{ageControlled}</span>
        </p>
        <p>
          <span>Password:&nbsp;</span>
          <span>{passwordControlled}</span>
        </p>
        <p>
          <span>Gender:&nbsp;</span>
          <span>{genderControlled}</span>
        </p>
        <p>
          <span>Image:&nbsp;</span>
          <img src={imageControlled} />
        </p>
        <Link to="/controlled">Controlled</Link>
      </div>
      <div className={styles.uncontrolled}>
        <p>
          <span>Name:&nbsp;</span>
          <span>{name}</span>
        </p>
        <p>
          <span>Mail:&nbsp;</span>
          <span>{mail}</span>
        </p>
        <p>
          <span>Age:&nbsp;</span>
          <span>{age}</span>
        </p>
        <p>
          <span>Password:&nbsp;</span>
          <span>{password}</span>
        </p>
        <p>
          <span>Gender:&nbsp;</span>
          <span>{gender}</span>
        </p>
        <p>
          <span>Image:&nbsp;</span>
          <img src={image} />
        </p>
        <Link to="/uncontrolled">Uncontrolled</Link>
      </div>
    </main>
  );
}
