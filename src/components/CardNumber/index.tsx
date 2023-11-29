import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItemsPerPage } from '../../redux/dataSlice';
import styles from './CardNumber.module.css';

function CardNumber() {
  const { itemsPerPage } = useAppSelector((state) => state.search);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <span>Cards per page:</span>
      <select
        value={itemsPerPage}
        onChange={async (event) => {
          const amount = Number(event.target.value);
          dispatch(setItemsPerPage(amount));
          router.push('/page/1');
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
}

export default CardNumber;
