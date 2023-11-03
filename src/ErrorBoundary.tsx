import { Component, ReactNode, ErrorInfo } from 'react';
import Errors from './pages/Error';
import Home from './pages/Home';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.warn('Caught Error', error, errorInfo);
  }

  handleErrorState(newValue: boolean) {
    this.setState({ hasError: newValue });
  }

  render() {
    const { hasError } = this.state;

    this.handleErrorState = this.handleErrorState.bind(this);
    return (
      <>
        {hasError === true && <Errors onErrorChange={this.handleErrorState} />}
        {hasError === false && <Home setHasError={this.handleErrorState} />}
      </>
    );
  }
}

export default ErrorBoundary;
