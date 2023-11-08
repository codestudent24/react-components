import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../types/starship';
import loadDataFromApi from '../utils/functions';
import ErrorContext from '../context';

type Props = {
  setData: (data: IStarship[]) => void;
  setLoading: (loading: boolean) => void;
  setHasNextPage: (value: boolean) => void;
  setHasPreviousPage: (value: boolean) => void;
  setInput: (value: string) => void;
};

function defaultInput() {
  return localStorage.getItem('searchKey') || '';
}

function Search({
  setData,
  setLoading,
  setHasNextPage,
  setHasPreviousPage,
  setInput,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsError } = useContext(ErrorContext);

  useEffect(() => {
    let pageParam = searchParams.get('page');
    if (pageParam === null) {
      pageParam = '1';
      setSearchParams({ page: pageParam });
    }
    const page = Number(pageParam);
    setCurrentPage(page);
  }, [setData, setLoading, setSearchParams, searchParams]);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const input = inputElement.value;
      loadDataFromApi(
        setLoading,
        setData,
        setHasNextPage,
        setHasPreviousPage,
        input,
        currentPage
      );
    }
  }, [currentPage, setData, setLoading, setHasNextPage, setHasPreviousPage]);

  function makeError() {
    setIsError(true);
    throw new Error('My custom Error');
  }

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
        onClick={() => {
          setSearchParams({ page: '1' });
          const inputElement = inputRef.current;
          if (inputElement) {
            const input = inputElement.value;
            loadDataFromApi(
              setLoading,
              setData,
              setHasNextPage,
              setHasPreviousPage,
              input,
              1
            );
            setCurrentPage(1);
          }
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
