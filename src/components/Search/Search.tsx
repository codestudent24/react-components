import { useRef } from 'react';
import { useRouter } from 'next/router';
import ErrorButton from './ErrorButton';
import styles from './Search.module.css';

function Search() {
  const router = useRouter();
  const inputRef = useRef(null);

  return (
    <div className={styles.search}>
      <input type="text" defaultValue="" ref={inputRef} />
      <button
        type="button"
        className="button-search"
        data-testid="button-search"
        onClick={async () => {
          const inputElement = inputRef.current as HTMLInputElement | null;
          if (inputElement) {
            const { value } = inputElement;
            router.push(value === '' ? '/page/1' : `/page/1?search=${value}`);
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
