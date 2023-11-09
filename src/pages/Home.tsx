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

  return (
    <ErrorBoundary>
      <Search setLoading={setLoading} />
      <CardNumber />
      <div className="results-container">
        <SearchResults loading={loading} />
        <Outlet context={[loading]} />
      </div>
      <PageHandler loading={loading} setLoading={setLoading} />
    </ErrorBoundary>
  );
}

export default Home;
