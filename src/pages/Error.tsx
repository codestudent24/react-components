import { ErrorProps } from './interfaces';

function Error(props: ErrorProps) {
  function undoError() {
    const { onErrorChange } = props;
    onErrorChange(false);
  }

  return (
    <>
      <h1>Oops... we have an error!</h1>
      <button type="button" onClick={undoError}>
        undo error
      </button>
    </>
  );
}

export default Error;
