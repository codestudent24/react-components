import { useNavigate, useSearchParams } from 'react-router-dom';
import './PageHandler.css';
import { useEffect, useState } from 'react';

type Props = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  loading: boolean;
};

export default function PageHandler(props: Props) {
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { hasNextPage, hasPreviousPage, loading } = props;

  const handleDecrement = (value: number) => {
    if (value < 2) return;
    const nextPage = value - 1;
    navigate(`/?page=${nextPage}`);
  };

  const handleIncrement = (value: number) => {
    if (value > 3) return;
    const nextPage = value + 1;
    navigate(`/?page=${nextPage}`);
  };

  useEffect(() => {
    let pageParam = search.get('page');
    if (pageParam === null) {
      pageParam = '1';
      setSearch({ page: pageParam });
    }
    setCurrentPage(Number(pageParam));
  }, [search, setSearch]);

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
