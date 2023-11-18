import { Outlet } from 'react-router-dom';
import Search from '../components/Search/Search';
import SearchResults from '../components/SearchResults';
import PageHandler from '../components/PageHandler';
import ErrorBoundary from '../ErrorBoundary';
import CardNumber from '../components/CardNumber';
import './Home.css';

function Home() {
  return (
    <ErrorBoundary>
      <Search />
      <CardNumber />
      <div className="results-container">
        <SearchResults />
        <Outlet />
      </div>
      <PageHandler />
    </ErrorBoundary>
  );
}

export default Home;
