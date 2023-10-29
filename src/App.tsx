import { PureComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/notFound';
import ErrorBoundary from './ErrorBoundary';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
