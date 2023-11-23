import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ErrorContext } from './context';

function Error() {
  const router = useRouter();
  const { setIsError } = useContext(ErrorContext);

  return (
    <>
      <h1>Oops... we have an error!</h1>
      <button
        type="button"
        onClick={() => {
          setIsError(false);
          router.push('/page/1');
        }}
      >
        undo error
      </button>
    </>
  );
}

export default Error;
