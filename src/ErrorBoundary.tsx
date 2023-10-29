import { Component, ReactNode } from 'react';
import Home from './pages/Home';
import Errors from './pages/Error';

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

  public componentDidCatch() {
    this.setState({ hasError: true });
  }

  handleErrorState(newValue: boolean) {
    // eslint-disable-next-line no-console
    if (newValue) console.error('Error caught by Error Boundary');
    this.setState({ hasError: newValue });
  }

  render() {
    const { hasError } = this.state;
    this.handleErrorState = this.handleErrorState.bind(this);
    return (
      <>
        {hasError === true && <Errors onErrorChange={this.handleErrorState} />}
        {hasError === false && <Home onErrorChange={this.handleErrorState} />}
      </>
    );
  }
}

export default ErrorBoundary;
