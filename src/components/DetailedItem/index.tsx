import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getStarshipByIndex } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setItem, setItemLoading } from '../../redux/dataSlice';
import LoaderSpin from '../LoaderSpin';
import './DetailedItem.css';

function DetailedItem() {
  const { item, itemLoading } = useAppSelector((state) => state.search);
  const [search] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const detailsParam = search.get('details');

    async function getStarship(param: string | null) {
      if (param === null) {
        dispatch(setItem(null));
      } else {
        dispatch(setItemLoading(true));
        const fetchedItem = await getStarshipByIndex(param);
        dispatch(setItem(fetchedItem));
        dispatch(setItemLoading(false));
      }
    }

    getStarship(detailsParam);
  }, [dispatch, search]);

  return (
    <>
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
      {itemLoading && <LoaderSpin />}
      {(itemLoading || item === null) && null}
    </>
  );
}

export default DetailedItem;
