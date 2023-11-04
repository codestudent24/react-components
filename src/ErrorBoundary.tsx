import { Component, ReactNode, ErrorInfo } from 'react';
import Errors from './pages/Error';
import Home from './pages/Home';
import ErrorContext, { ContextType } from './context';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.warn('Caught Error', error, errorInfo);
    const { setIsError } = this.context as ContextType;
    setIsError(true);
  }

  handleErrorState(newValue: boolean) {
    this.context = newValue;
  }

  render() {
    this.handleErrorState = this.handleErrorState.bind(this);
    const { isError } = this.context as ContextType;
    return (
      <>
        {isError && <Errors />}
        {!isError && <Home />}
      </>
    );
  }
}

ErrorBoundary.contextType = ErrorContext;

export default ErrorBoundary;
