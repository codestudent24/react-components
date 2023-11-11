import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context';
import getStarships from '../../utils/api';
import './PageHandler.css';
import { hasNext, hasPrevious } from './pageFunctions';

type Props = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export default function PageHandler({ loading, setLoading }: Props) {
  const [search, setSearch] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const { itemsPerPage, setData, count, setCount } = useContext(AppContext);

  const handleDecrement = async (value: number) => {
    if (value < 2) return;
    const goToPage = value - 1;
    setSearch({ page: `${goToPage}` });
  };

  const handleIncrement = async (value: number) => {
    if (value > 8) return;
    if (itemsPerPage === 10 && value > 4) return;
    const goToPage = value + 1;
    setSearch({ page: `${goToPage}` });
  };

  useEffect(() => {
    const pageParam = search.get('page') || '1';
    const input = localStorage.getItem('searchKey') || '';

    let page = Number(pageParam);
    if (itemsPerPage === 5) page = page < 3 ? 1 : Math.ceil(page / 2);

    async function updateData() {
      setLoading(true);
      const fetched = await getStarships(input, page);
      const fetchedCount = fetched.count;
      setCount(fetchedCount);
      setData(fetched.results);
      setLoading(false);
    }

    updateData();
  }, [setLoading, setData, setCount, itemsPerPage, search]);

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
      {loading && null}
      {!loading && (
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
