import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context';

function Error() {
  const navigate = useNavigate();
  const { setIsError } = useContext(ErrorContext);

  return (
    <>
      <h1>Oops... we have an error!</h1>
      <button
        type="button"
        onClick={() => {
          setIsError(false);
          navigate('/?page=1');
        }}
      >
        undo error
      </button>
    </>
  );
}

export default Error;
