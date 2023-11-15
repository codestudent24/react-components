import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import getStarships from '../../utils/api';
import { useAppDispatch } from '../../redux/hooks';
import {
  setDataLoading,
  setData,
  setInput,
  setCount,
} from '../../redux/dataSlice';
import ErrorButton from './ErrorButton';

function Search() {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);

  return (
    <div className="search">
      <input type="text" defaultValue="" ref={inputRef} />
      <button
        type="button"
        className="button-search"
        data-testid="button-search"
        onClick={async () => {
          const inputElement = inputRef.current as HTMLInputElement | null;
          if (inputElement) {
            const { value } = inputElement;
            dispatch(setInput(value));
            dispatch(setDataLoading(true));
            setSearchParams({ page: '1' });
            const fetched = await getStarships(value, 1);
            dispatch(setData(fetched.results));
            dispatch(setCount(fetched.count));
            dispatch(setDataLoading(false));
          }
        }}
      >
        Search
      </button>
      <ErrorButton />
    </div>
  );
}

export default Search;
