import { useContext } from 'react';
import { ErrorContext } from '../../context';

function ErrorButton() {
  const { setIsError } = useContext(ErrorContext);

  function makeError() {
    setIsError(true);
    throw new Error('My custom Error');
  }

  return (
    <button type="button" className="button-error" onClick={makeError}>
      Make Error
    </button>
  );
}

export default ErrorButton;
