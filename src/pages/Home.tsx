import { useState } from 'react';
import { IStarship } from '../types/starship';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import './Home.css';
import PageHandler from '../components/PageHandler';

function Home() {
  const [data, setData] = useState([] as IStarship[]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Search
        setData={setData}
        setLoading={setLoading}
        currentPage={currentPage}
      />
      <SearchResults data={data} loading={loading} />
      <PageHandler currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default Home;
