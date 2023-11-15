import { useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import ErrorButton from './ErrorButton';
import getStarships from '../../utils/api';

type Props = {
  setLoading: (loading: boolean) => void;
};

function defaultInput() {
  return localStorage.getItem('searchKey') || '';
}

function Search({ setLoading }: Props) {
  const [, setSearchParams] = useSearchParams();
  const { input, setInput, setData, setCount } = useContext(AppContext);
  const inputRef = useRef(null);

  return (
    <div className="search">
      <input
        type="text"
        defaultValue={defaultInput()}
        ref={inputRef}
        onChange={(event) => {
          const { value } = event.target;
          localStorage.setItem('searchKey', value);
          setInput(value);
        }}
      />
      <button
        type="button"
        className="button-search"
        data-testid="button-search"
        onClick={async () => {
          setLoading(true);
          setSearchParams({ page: '1' });
          const fetched = await getStarships(input, 1);
          setData(fetched.results);
          setCount(fetched.count);
          setLoading(false);
        }}
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}

export default Search;
