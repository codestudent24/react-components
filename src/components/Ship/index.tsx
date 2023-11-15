import { useSearchParams, useNavigate } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import './Ship.css';

type ShipProps = {
  item: IStarship;
};

function Ship({ item }: ShipProps) {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  function showDetails(url: string) {
    // url: "[0]https:/[1] /[2] swapi.dev/[3] api/[4] starships/[5] 9/[6] "
    const detailsIndex = url.split('/')[5];
    const page = search.get('page');
    navigate(`detailed/?page=${page}&details=${detailsIndex}`);
  }

  return (
    <li>
      <button
        type="button"
        data-testid="ship-button"
        onClick={() => {
          showDetails(item.url);
        }}
      >
        <h2>Starship {item.name}</h2>
        <p>Model: {item.model}</p>
      </button>
    </li>
  );
}

export default Ship;
