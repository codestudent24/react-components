import { useState, useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import './DetailedItem.css';

type ItemContextType = {
  data: IStarship[];
};

function DetailedItem() {
  const [item, setItem] = useState<IStarship | null>(null);
  const [search] = useSearchParams();
  const { data } = useOutletContext<ItemContextType>();

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
      {item !== null && (
        <div className="details">
          <h2>Starship {item.name}</h2>
          <p>Model: {item.model}</p>
          <p>Class: {item.starship_class}</p>
          <p>Cost in galactic credits: {item.cost_in_credits}</p>
          <p>Length: {item.length}</p>
          <p>Passangers number: {item.passengers}</p>
          <p>Cargo capacity: {item.cargo_capacity}</p>
        </div>
      )}
      {item === null && null}
    </>
  );
}

export default DetailedItem;
