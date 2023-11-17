import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItem, setItemLoading } from '../../redux/dataSlice';
import { useStarshipDetailQuery } from '../../redux/query';
import LoaderSpin from '../LoaderSpin';
import './DetailedItem.css';

function DetailedItem() {
  const [detailsIndex, setDetailsIndex] = useState('2');
  const { data, isFetching } = useStarshipDetailQuery(detailsIndex);
  const { item, itemLoading } = useAppSelector((state) => state.search);
  const [search] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const detailsParam = search.get('details');
    if (detailsParam) setDetailsIndex(detailsParam);
  }, [dispatch, search]);

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
        <div className="details" data-testid="detailed-card">
          <h2>Starship {item.name}</h2>
          <p>Model: {item.model}</p>
          <p>Class: {item.starship_class}</p>
          <p>Cost in galactic credits: {item.cost_in_credits}</p>
          <p>Length: {item.length}</p>
          <p>Passangers number: {item.passengers}</p>
          <p>Cargo capacity: {item.cargo_capacity}</p>
          <button
            type="button"
            className="button-close"
            onClick={() => {
              const pageParam = search.get('page');
              if (pageParam) navigate(`/?page=${pageParam}`);
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
