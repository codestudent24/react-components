import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main className="main">
      <Link to="/controlled">Controlled</Link>
      <Link to="/uncontrolled">Uncontrolled</Link>
    </main>
  );
}
