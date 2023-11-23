import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setInput } from '../../redux/dataSlice';
import { setCurrentPage } from '../../redux/pageSlice';
import ErrorButton from './ErrorButton';
import { useRouter } from 'next/navigation';
import styles from './Search.module.css';

function Search() {
  const input = useAppSelector((state) => state.search.input);
  const router = useRouter();
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.search}>
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
            router.push('/page/1')
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
