import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCount, setData, setDataLoading } from '../../redux/dataSlice';
import { setCurrentPage, setHasNext, setHasPrev } from '../../redux/pageSlice';
import { useStarshipListQuery } from '../../redux/query';
import { createParam } from '../../utils/functions';
import {
  handleDecrement,
  handleIncrement,
  hasNextPage,
  hasPreviousPage,
} from './pageFunctions';
import styles from './PageHandler.module.css';

export default function PageHandler() {
  const router = useRouter();
  const { currentPage, hasNext, hasPrev } = useAppSelector(
    (state) => state.page
  );
  const { dataLoading, count, itemsPerPage, input } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();
  const { data, isFetching } = useStarshipListQuery(
    createParam(currentPage, itemsPerPage, input)
  );

  useEffect(() => {
    dispatch(setHasPrev(hasPreviousPage(currentPage)));
    dispatch(setHasNext(hasNextPage(count, currentPage, itemsPerPage)));
  }, [count, itemsPerPage, currentPage])

  useEffect(() => {
    if (isFetching) {
      dispatch(setDataLoading(true));
    } else {
      dispatch(setDataLoading(false));
      if (data) {
        dispatch(setData(data.results));
        dispatch(setCount(data.count));
      }
    }
  }, [dispatch, data, isFetching]);

  return (
    <>
      {dataLoading && null}
      {!dataLoading && (
        <div className={styles.pageButtons}>
          {hasPrev && (
            <button
              type="button"
              className={styles.buttonPage}
              onClick={() => {
                const prev = currentPage - 1;
                router.push(`${prev}`);
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
                router.push(`${next}`);
                dispatch(setCurrentPage(next))
              }}
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </>
  );
}
