import { useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import loadDataFromApi from '../../utils/functions';
import ErrorButton from './ErrorButton';

type Props = {
  setLoading: (loading: boolean) => void;
};

function defaultInput() {
  return localStorage.getItem('searchKey') || '';
}

function Search({ setLoading }: Props) {
  const [, setSearchParams] = useSearchParams();
  const { input, setInput, setData } = useContext(AppContext);
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
        onClick={async () => {
          setSearchParams({ page: '1' });
          const fetched = await loadDataFromApi(setLoading, input, 1);
          setData(fetched);
        }}
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}

export default Search;
