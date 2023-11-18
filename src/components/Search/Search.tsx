import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setInput } from '../../redux/dataSlice';
import { setCurrentPage } from '../../redux/pageSlice';
import ErrorButton from './ErrorButton';

function Search() {
  const input = useAppSelector((state) => state.search.input);
  const inputRef = useRef(null);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  return (
    <div className="search">
      <input type="text" defaultValue={input} ref={inputRef} />
      <button
        type="button"
        className="button-search"
        data-testid="button-search"
        onClick={async () => {
          const inputElement = inputRef.current as HTMLInputElement | null;
          if (inputElement) {
            const { value } = inputElement;
            dispatch(setInput(value));
            dispatch(setCurrentPage(1));
            setSearchParams({ page: '1' });
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
