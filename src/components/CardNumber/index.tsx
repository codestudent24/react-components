import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItemsPerPage } from '../../redux/dataSlice';
import './CardNumber.css';
import { setCurrentPage, setHasNext, setHasPrev } from '../../redux/pageSlice';

function CardNumber() {
  const { itemsPerPage, count } = useAppSelector((state) => state.search);
  const [, setSearch] = useSearchParams();
  const dispatch = useAppDispatch();

  return (
    <div className="select-container">
      <span>Cards per page:</span>
      <select
        value={itemsPerPage}
        onChange={async (event) => {
          const amount = Number(event.target.value);
          setSearch({ page: '1' });
          dispatch(setCurrentPage(1));
          dispatch(setHasPrev(false));
          dispatch(setHasNext(count > itemsPerPage));
          dispatch(setItemsPerPage(amount));
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
}

export default CardNumber;
