import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Error 404: Page not found</h1>
      <br />
      <Link to="/">Home page</Link>
    </>
  );
}

export default NotFound;
