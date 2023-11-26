import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentPage, setHasNext, setHasPrev } from '@/redux/pageSlice';
import { hasNextPage, hasPreviousPage } from './pageFunctions';
import styles from './PageHandler.module.css';

export default function PageHandler() {
  const router = useRouter();
  const { currentPage, hasNext, hasPrev } = useAppSelector(
    (state) => state.page
  );
  const { count, itemsPerPage } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHasPrev(hasPreviousPage(currentPage)));
    dispatch(setHasNext(hasNextPage(count, currentPage, itemsPerPage)));
  }, [count, itemsPerPage, currentPage])

  return (
    <>
      <div className={styles.pageButtons}>
        {hasPrev && (
          <button
            type="button"
            className={styles.buttonPage}
            onClick={() => {
              const prev = currentPage - 1;
              router.push(`/page/${prev}`);
              dispatch(setCurrentPage(prev))
            }}
          >
            &lt;
          </button>
        )}
        <div className={styles.currentPage}>Page {currentPage}</div>
        {hasNext && (
          <button
            type="button"
            className={styles.buttonPage}
            onClick={() => {
              const next = currentPage + 1;
              router.push(`/page/${next}`);
              dispatch(setCurrentPage(next))
            }}
          >
            &gt;
          </button>
        )}
      </div>
    </>
  );
}
