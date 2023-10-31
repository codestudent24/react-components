import { PureComponent } from 'react';
import { ErrorProps } from './interfaces';

class Error extends PureComponent<ErrorProps> {
  undoError = () => {
    const { onErrorChange } = this.props;
    onErrorChange(false);
  };

  render() {
    return (
      <>
        <h1>Oops... we have an error!</h1>
        <button type="button" onClick={this.undoError}>
          undo error
        </button>
      </>
    );
  }
}

export default Error;
