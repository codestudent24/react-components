import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import getStarships from '../../utils/api';
import { hasNext, hasPrevious } from './pageFunctions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setDataLoading, setData, setCount } from '../../redux/dataSlice';
import './PageHandler.css';

export default function PageHandler() {
  const [search, setSearch] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const { dataLoading, count, itemsPerPage, input } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();

  const handleDecrement = (value: number) => {
    if (value < 2) return;
    const goToPage = value - 1;
    setSearch({ page: `${goToPage}` });
  };

  const handleIncrement = (value: number) => {
    const goToPage = value + 1;
    setSearch({ page: `${goToPage}` });
  };

  useEffect(() => {
    const pageParam = search.get('page') || '1';
    let page = Number(pageParam);
    if (itemsPerPage === 5) page = page < 3 ? 1 : Math.ceil(page / 2);

    async function updateData() {
      dispatch(setDataLoading(true));
      const fetched = await getStarships(input, page);
      const fetchedCount = fetched.count;
      dispatch(setCount(fetchedCount));
      dispatch(setData(fetched.results));
      dispatch(setDataLoading(false));
    }

    updateData();
  }, [dispatch, input, itemsPerPage, search]);

  useEffect(() => {
    let pageParam = search.get('page');
    if (pageParam === null) {
      pageParam = '1';
      setSearch({ page: pageParam });
    }
    const page = Number(pageParam);
    setCurrentPage(page);
    setHasPreviousPage(hasPrevious(page));
    setHasNextPage(hasNext(count, page, itemsPerPage));
  }, [setSearch, setCurrentPage, count, search, itemsPerPage]);

  return (
    <>
      {dataLoading && null}
      {!dataLoading && (
        <div className="page-buttons">
          {hasPreviousPage && (
            <button
              type="button"
              className="button-page"
              onClick={() => {
                handleDecrement(currentPage);
              }}
            >
              &lt;
            </button>
          )}
          <div className="current-page">Page {currentPage}</div>
          {hasNextPage && (
            <button
              type="button"
              className="button-page"
              onClick={() => {
                handleIncrement(currentPage);
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
