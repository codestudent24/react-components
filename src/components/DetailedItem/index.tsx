import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import { AppContext } from '../../context';
import './DetailedItem.css';
import LoaderSpin from '../LoaderSpin';

function DetailedItem() {
  const [item, setItem] = useState<IStarship | null>(null);
  const [loading] = useOutletContext<[boolean]>();
  const [search, setSearch] = useSearchParams();
  const { data } = useContext(AppContext);

  useEffect(() => {
    const detailsParam = search.get('details');
    if (detailsParam === null) {
      setItem(null);
    } else {
      const index = Number(detailsParam);
      setItem(data[index]);
    }
  }, [data, search, item]);

  return (
    <>
      {!loading && item !== null && (
        <div className="details">
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
              if (pageParam !== null) setSearch({ page: pageParam });
            }}
          >
            X
          </button>
        </div>
      )}
      {loading && <LoaderSpin />}
      {(loading || item === null) && null}
    </>
  );
}

export default DetailedItem;
