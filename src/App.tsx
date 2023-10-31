import { PureComponent } from 'react';
import ErrorBoundary from './ErrorBoundary';

class App extends PureComponent {
  render() {
    return <ErrorBoundary />;
  }
}

export default App;
