import { FC, PropsWithChildren, useMemo, useState } from "react"
import { ErrorContext } from "./ErrorBoundary/context";
import ErrorBoundary from "./ErrorBoundary";
import Search from "./Search/Search";
import CardNumber from "./CardNumber";
import PageHandler from "./PageHandler";
import styles from './layout.module.css';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
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
        <div className={styles.resultsContainer}>
          {children}
        </div>
        <PageHandler />
      </ErrorBoundary>
    </ErrorContext.Provider>
  )
}

export default Layout;