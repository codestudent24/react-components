export interface IStarship {
  name: string;
  model: string;
  starship_class: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string;
  pilots: string;
  url: string;
  created: string;
  edited: string;
}

export interface IStarshipResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IStarship[];
}
