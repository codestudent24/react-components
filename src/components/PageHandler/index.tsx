import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import './PageHandler.css';

export default function PageHandler() {
  const [search, setSearch] = useSearchParams();
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

  function updatePage(myPage: number) {
    setSearch({ page: `${myPage}` });
    dispatch(setCurrentPage(myPage));
    dispatch(setHasPrev(hasPreviousPage(myPage)));
    dispatch(setHasNext(hasNextPage(count, myPage, itemsPerPage)));
  }

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

  useEffect(() => {
    let pageParam = search.get('page');
    if (pageParam === null) {
      pageParam = '1';
      setSearch({ page: pageParam });
    }
  }, [search, setSearch]);

  return (
    <>
      {dataLoading && null}
      {!dataLoading && (
        <div className="page-buttons">
          {hasPrev && (
            <button
              type="button"
              className="button-page"
              onClick={() => {
                handleDecrement(currentPage, updatePage);
              }}
            >
              &lt;
            </button>
          )}
          <div className="current-page">Page {currentPage}</div>
          {hasNext && (
            <button
              type="button"
              className="button-page"
              onClick={() => {
                handleIncrement(currentPage, updatePage);
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
