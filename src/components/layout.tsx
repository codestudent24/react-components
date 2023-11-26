import { PropsWithChildren, useMemo, useState } from 'react';
import { ErrorContext } from './ErrorBoundary/context';
import ErrorBoundary from './ErrorBoundary';
import Search from './Search/Search';
import CardNumber from './CardNumber';
import PageHandler from './PageHandler';
import styles from './layout.module.css';

function Layout({ children }: PropsWithChildren<unknown>) {
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
      <ErrorBoundary>
        <Search />
        <CardNumber />
        <section className={styles.resultsContainer}>{children}</section>
        <PageHandler />
      </ErrorBoundary>
    </ErrorContext.Provider>
  );
}

export default Layout;
