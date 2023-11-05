import { useNavigate, useSearchParams } from 'react-router-dom';
import './PageHandler.css';
import { useEffect, useState } from 'react';

type Props = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export default function PageHandler(props: Props) {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { hasNextPage, hasPreviousPage } = props;

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
    const page = search.get('page');
    if (page !== null) setCurrentPage(Number(page));
  }, [search]);

  return (
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
  );
}