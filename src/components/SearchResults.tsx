import { IStarship } from '../types/starship';
import Ship from './Ship';

type Props = {
  data: IStarship[];
  loading: boolean;
};

function SearchResults(props: Props) {
  const { data, loading } = props;

  return (
    <div className="data-container">
      {loading && <span className="loading">loading...</span>}
      {!loading && (
        <ul>
          {data.map((elem) => {
            return <Ship item={elem} key={elem.name} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
