import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import Ship from '../Ship';
import './SearchResults.css';

type Props = {
  data: IStarship[];
  loading: boolean;
};

function SearchResults(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading } = props;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <button
      type="button"
      className="data-container"
      onClick={(event) => {
        const element = event.target as HTMLElement;
        const target = element.closest('button');
        if (target?.className === 'data-container') {
          const pageParam = searchParams.get('page');
          if (pageParam !== null) setSearchParams({ page: pageParam });
        }
      }}
    >
      {loading && <span className="loading">loading...</span>}
      {!loading && (
        <ul>
          {data.map((elem, index) => {
            return <Ship item={elem} key={elem.name} index={index} />;
          })}
        </ul>
      )}
    </button>
  );
}

export default SearchResults;
