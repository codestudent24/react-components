import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItemsPerPage } from '../../redux/dataSlice';
import { setCurrentPage, setHasNext, setHasPrev } from '../../redux/pageSlice';
import styles from './CardNumber.module.css';

function CardNumber() {
  const { itemsPerPage, count } = useAppSelector((state) => state.search);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <span>Cards per page:</span>
      <select
        value={itemsPerPage}
        onChange={async (event) => {
          const amount = Number(event.target.value);
          dispatch(setCurrentPage(1));
          dispatch(setHasPrev(false));
          dispatch(setHasNext(count > itemsPerPage));
          dispatch(setItemsPerPage(amount));
          router.push('1');
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
}

export default CardNumber;
