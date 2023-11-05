import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IStarship } from '../types/starship';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import PageHandler from '../components/PageHandler';
import ErrorBoundary from '../ErrorBoundary';
import './Home.css';
import CardNumber from '../components/CardNumber';

type CurrentItemContext = {
  data: IStarship[];
};

function Home() {
  const [data, setData] = useState([] as IStarship[]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);

  return (
    <ErrorBoundary>
      <Search
        setData={setData}
        setLoading={setLoading}
        setHasNextPage={setHasNextPage}
        setHasPreviousPage={setHasPreviousPage}
      />
      <CardNumber
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        offset={offset}
        setOffset={setOffset}
      />
      <div className="results-container">
        <SearchResults
          data={data}
          loading={loading}
          itemsPerPage={itemsPerPage}
          offset={offset}
        />
        <Outlet context={{ data } satisfies CurrentItemContext} />
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
