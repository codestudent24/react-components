import { useState, useEffect } from 'react';
import { IStarship } from '../types/starship';
import loadDataFromApi from '../utils/functions';

type Props = {
  setData: (data: IStarship[]) => void;
  setLoading: (loading: boolean) => void;
  setHasError: (isError: boolean) => void;
};

function Search(props: Props) {
  const [input, setInput] = useState(localStorage.getItem('searchKey') || '');
  const { setData, setLoading } = props;

  useEffect(() => {
    localStorage.setItem('searchKey', input);
    loadDataFromApi(setLoading, setData, input);
  }, [input, setData, setLoading]);

  function makeError() {
    const { setHasError } = props;
    setHasError(true);
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
          loadDataFromApi(setLoading, setData, input);
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
