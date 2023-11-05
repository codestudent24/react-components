import { useSearchParams, useNavigate } from 'react-router-dom';
import { IStarship } from '../types/starship';
import './Ship.css';

type ShipProps = {
  item: IStarship;
  index: number;
};

function Ship(props: ShipProps) {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { item, index } = props;

  function showDetails(details: number) {
    const page = search.get('page');
    navigate(`detailed/?page=${page}&details=${details}`);
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          showDetails(index);
        }}
      >
        <h2>Starship {item.name}</h2>
        <p>Model: {item.model}</p>
      </button>
    </li>
  );
}

export default Ship;
