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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    return (
      <>
        {hasError === true && <Errors />}
        {hasError === false && <Home />}
      </>
    );
  }
}

export default ErrorBoundary;
