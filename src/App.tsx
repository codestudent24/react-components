import { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { ErrorContext } from './context';
import Home from './pages/Home';
import Store from './redux/store';

export default function App() {
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <ErrorContext.Provider
      value={useMemo(
        () => ({
          isError,
          setIsError,
        }),
        [isError, setIsError]
      )}
    >
      <Provider store={Store}>
        <Home />
      </Provider>
    </ErrorContext.Provider>
  );
}
