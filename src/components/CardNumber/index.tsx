import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardNumber.css';
import { IStarship } from '../../types/starship';
import loadDataFromApi from '../../utils/functions';

type Props = {
  itemsPerPage: number;
  offset: number;
  setItemsPerPage: (value: number) => void;
  setOffset: (value: number) => void;
  setData: (data: IStarship[]) => void;
  setLoading: (isLoading: boolean) => void;
  setHasNextPage: (value: boolean) => void;
  setHasPreviousPage: (value: boolean) => void;
  input: string;
};

function CardNumber({
  setItemsPerPage,
  itemsPerPage,
  setOffset,
  offset,
  setData,
  setLoading,
  setHasNextPage,
  setHasPreviousPage,
  input,
}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    setOffset(0);
    navigate('/?pages=1');
  }, [itemsPerPage, setOffset, navigate]);

  return (
    <>
      <div className="select-container">
        <span>Cards per page:</span>
        <select
          onChange={(event) => {
            setItemsPerPage(Number(event.target.value));
            loadDataFromApi(
              setLoading,
              setData,
              setHasNextPage,
              setHasPreviousPage,
              input,
              1
            );
          }}
        >
          <option value={5}>5</option>
          <option value={10} selected>
            10
          </option>
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
