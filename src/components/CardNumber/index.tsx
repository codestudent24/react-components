import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItemsPerPage } from '../../redux/dataSlice';
import './CardNumber.css';

function CardNumber() {
  const itemsPerPage = useAppSelector((state) => state.search.itemsPerPage);
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
