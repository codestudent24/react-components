import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItem, setItemLoading } from '../../redux/dataSlice';
import { useStarshipDetailQuery } from '../../redux/query';
import LoaderSpin from '../LoaderSpin';
import styles from './DetailedItem.module.css';

function DetailedItem() {
  const router = useRouter();
  const detailedIndex = router.query.detailedIndex as string || '2' ;
  const { data, isFetching } = useStarshipDetailQuery(detailedIndex || '2');
  const { item, itemLoading } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFetching) {
      dispatch(setItemLoading(true));
    } else {
      dispatch(setItemLoading(false));
      if (data) {
        dispatch(setItem(data));
      }
    }
  }, [dispatch, data, isFetching]);

  return (
    <>
      {itemLoading && <LoaderSpin />}
      {!itemLoading && item !== null && (
        <div className={styles.details} data-testid="detailed-card">
          <h2>Starship {item.name}</h2>
          <p>Model: {item.model}</p>
          <p>Class: {item.starship_class}</p>
          <p>Cost in galactic credits: {item.cost_in_credits}</p>
          <p>Length: {item.length}</p>
          <p>Passangers number: {item.passengers}</p>
          <p>Cargo capacity: {item.cargo_capacity}</p>
          <button
            type="button"
            data-testid="detailed-close"
            className={styles.buttonClose}
            onClick={() => {
              const page = router.query.pageNumber;
              if (page) router.push(`/page/${page}`)
            }}
          >
            X
          </button>
        </div>
      )}
      {item === null && null}
    </>
  );
}

export default DetailedItem;
