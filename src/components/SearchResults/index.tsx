import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import { AppContext } from '../../context';
import Ship from '../Ship';
import './SearchResults.css';

type Props = {
  loading: boolean;
  itemsPerPage: number;
  offset: number;
};

function reduceData(data: IStarship[], itemsPerPage: number, offset: number) {
  if (itemsPerPage === 10) return data;

  const max = data.length < itemsPerPage ? data.length : itemsPerPage;
  const reducedData: IStarship[] = [];

  for (let i = 0; i < max; i += 1) {
    reducedData.push(data[i + offset]);
  }

  return reducedData;
}

function SearchResults(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reducedData, setReducedData] = useState([] as IStarship[]);
  const { data } = useContext(AppContext);
  const { loading, itemsPerPage, offset } = props;

  useEffect(() => {
    const reduced = reduceData(data, itemsPerPage, offset);
    setReducedData(reduced);
  }, [data, itemsPerPage, offset]);

  return (
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
          {reducedData.map((elem, index) => {
            if (index < itemsPerPage) {
              return <Ship item={elem} key={elem.name} index={index} />;
            }
            return null;
          })}
        </ul>
      )}
    </button>
  );
}

export default SearchResults;
