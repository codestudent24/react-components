import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../types/starship';
import './Ship.css';

type ShipProps = {
  item: IStarship;
  index: number;
};

function Ship(props: ShipProps) {
  const [, setSearch] = useSearchParams();
  const { item, index } = props;

  return (
    <li>
      <h2>Starship {item.name}</h2>
      <p>Model: {item.model}</p>
      <p>Class: {item.starship_class}</p>
      <p>Cost in galactic credits: {item.cost_in_credits}</p>
      <p>Length: {item.length}</p>
      <p>Passangers number: {item.passengers}</p>
      <p>Cargo capacity: {item.cargo_capacity}</p>
      <button
        type="button"
        className="button-detailed"
        onClick={() => {
          setSearch({ detailed: `${index}` });
        }}
      >
        Show detailes
      </button>
    </li>
  );
}

export default Ship;
