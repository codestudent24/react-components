import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loadDataFromApi from '../../utils/functions';
import './CardNumber.css';
import { AppContext } from '../../context';

type Props = {
  itemsPerPage: number;
  offset: number;
  setItemsPerPage: (value: number) => void;
  setOffset: (value: number) => void;
  setLoading: (isLoading: boolean) => void;
  setHasNextPage: (value: boolean) => void;
  setHasPreviousPage: (value: boolean) => void;
};

function CardNumber({
  setItemsPerPage,
  itemsPerPage,
  setOffset,
  offset,
  setLoading,
  setHasNextPage,
  setHasPreviousPage,
}: Props) {
  const navigate = useNavigate();
  const { input, setData } = useContext(AppContext);

  useEffect(() => {
    setOffset(0);
    navigate('/?pages=1');
  }, [itemsPerPage, setOffset, navigate]);

  return (
    <>
      <div className="select-container">
        <span>Cards per page:</span>
        <select
          defaultValue={10}
          onChange={async (event) => {
            setItemsPerPage(Number(event.target.value));
            const fetched = await loadDataFromApi(
              setLoading,
              setHasNextPage,
              setHasPreviousPage,
              input,
              1
            );
            setData(fetched);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      {itemsPerPage !== 10 && offset !== 0 && (
        <button
          className="button-select"
          type="button"
          onClick={() => {
            setOffset(0);
          }}
        >
          first part of cards
        </button>
      )}
      {itemsPerPage !== 10 && offset === 0 && (
        <button
          className="button-select"
          type="button"
          onClick={() => {
            setOffset(5);
          }}
        >
          second part of cards
        </button>
      )}
    </>
  );
}

export default CardNumber;
