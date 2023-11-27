import Link from 'next/link';

function NotFound() {
  return (
    <>
      <h1>Error 404: Page not found</h1>
      <br />
      <Link href="/page/1/">Go to first page</Link>
    </>
  );
}

export default NotFound;
