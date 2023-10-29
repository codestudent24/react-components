import { Component, ReactNode } from 'react';

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

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return (
      <>
        {hasError && <h1>Oops, an error occured</h1>}
        {!hasError && children}
      </>
    );
  }
}

export default ErrorBoundary;
