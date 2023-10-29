import { Component } from 'react';
import { IStarship } from '../types/starship';

type ShipProps = {
  item: IStarship;
};

class Ship extends Component<ShipProps> {
  render() {
    const { item } = this.props;

    return (
      <li>
        <h2>Starship {item.name}</h2>
        <p>Model: {item.model}</p>
        <p>Class: {item.starship_class}</p>
        <p>Cost in galactic credits: {item.cost_in_credits}</p>
        <p>Length: {item.length}</p>
        <p>Passangers number: {item.passengers}</p>
        <p>Cargo capacity: {item.cargo_capacity}</p>
      </li>
    );
  }
}

export default Ship;
