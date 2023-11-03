import { useState } from 'react';
import { IStarship } from '../types/starship';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import './Home.css';

type Props = {
  setHasError: (value: boolean) => void;
};

function Home(props: Props) {
  const [data, setData] = useState([] as IStarship[]);
  const [loading, setLoading] = useState(true);
  const { setHasError } = props;

  return (
    <>
      <Search
        setData={setData}
        setLoading={setLoading}
        setHasError={setHasError}
      />
      <SearchResults data={data} loading={loading} />
    </>
  );
}

export default Home;
