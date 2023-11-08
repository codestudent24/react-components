import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../components/Search/Search';
import SearchResults from '../components/SearchResults';
import PageHandler from '../components/PageHandler';
import ErrorBoundary from '../ErrorBoundary';
import CardNumber from '../components/CardNumber';
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);

  return (
    <ErrorBoundary>
      <Search
        setLoading={setLoading}
        setHasNextPage={setHasNextPage}
        setHasPreviousPage={setHasPreviousPage}
      />
      <CardNumber
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        offset={offset}
        setOffset={setOffset}
        setLoading={setLoading}
        setHasNextPage={setHasNextPage}
        setHasPreviousPage={setHasPreviousPage}
      />
      <div className="results-container">
        <SearchResults
          loading={loading}
          itemsPerPage={itemsPerPage}
          offset={offset}
        />
        <Outlet />
      </div>
      <PageHandler
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        loading={loading}
      />
    </ErrorBoundary>
  );
}

export default Home;
