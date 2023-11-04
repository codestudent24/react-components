import { useContext } from 'react';
import ErrorContext from '../context';

function Error() {
  const { setIsError } = useContext(ErrorContext);

  return (
    <>
      <h1>Oops... we have an error!</h1>
      <button
        type="button"
        onClick={() => {
          setIsError(false);
        }}
      >
        undo error
      </button>
    </>
  );
}

export default Error;
