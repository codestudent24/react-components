import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardNumber.css';

type Props = {
  itemsPerPage: number;
  offset: number;
  setItemsPerPage: (value: number) => void;
  setOffset: (value: number) => void;
};

function CardNumber(props: Props) {
  const navigate = useNavigate();
  const { setItemsPerPage, itemsPerPage, setOffset, offset } = props;

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
          onChange={(event) => {
            setItemsPerPage(Number(event.target.value));
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
