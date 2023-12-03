import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import { useAppSelector } from "../../redux/hooks";

export default function Main() {
  const { name, mail, age, password, gender, image } = useAppSelector(
    (state) => state.uncontrol,
  );
  return (
    <main className="main">
      <Link to="/controlled">Controlled</Link>
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
