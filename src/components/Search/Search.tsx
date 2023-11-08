import { useEffect, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import loadDataFromApi from '../../utils/functions';
import ErrorButton from './ErrorButton';

type Props = {
  setLoading: (loading: boolean) => void;
  setHasNextPage: (value: boolean) => void;
  setHasPreviousPage: (value: boolean) => void;
};

function defaultInput() {
  return localStorage.getItem('searchKey') || '';
}

function Search({ setLoading, setHasNextPage, setHasPreviousPage }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { input, setInput, setData } = useContext(AppContext);
  const inputRef = useRef(null);

  useEffect(() => {
    async function updateData(value: string, page: number) {
      const fetched = await loadDataFromApi(
        setLoading,
        setHasNextPage,
        setHasPreviousPage,
        value,
        page
      );
      setData(fetched);
    }
    const pageParam = searchParams.get('page');
    const page = Number(pageParam) || 1;
    const inputElement = inputRef.current;
    if (inputElement) {
      const { value } = inputElement;
      updateData(value, page);
    }
  }, [searchParams, setData, setHasNextPage, setHasPreviousPage, setLoading]);

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
          const fetched = await loadDataFromApi(
            setLoading,
            setHasNextPage,
            setHasPreviousPage,
            input,
            1
          );
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
