import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../types/starship';
import loadDataFromApi from '../utils/functions';
import ErrorContext from '../context';

type Props = {
  setData: (data: IStarship[]) => void;
  setLoading: (loading: boolean) => void;
  currentPage: number;
};

function Search(props: Props) {
  const [, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(localStorage.getItem('searchKey') || '');
  const { setData, setLoading, currentPage } = props;
  const { setIsError } = useContext(ErrorContext);

  useEffect(() => {
    localStorage.setItem('searchKey', input);
    loadDataFromApi(setLoading, setData, input, currentPage);
    setSearchParams({ page: currentPage.toString() });
  }, [input, setData, setLoading, setSearchParams, currentPage]);

  function makeError() {
    setIsError(true);
    throw new Error('My custom Error');
  }

  return (
    <div className="search">
      <input
        type="text"
        defaultValue={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        type="button"
        className="button-search"
        onClick={() => {
          loadDataFromApi(setLoading, setData, input, currentPage);
        }}
      >
        Search
      </button>
      <button type="button" className="button-error" onClick={makeError}>
        Make Error
      </button>
    </div>
  );
}

export default Search;
