import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import { useAppSelector } from '../../redux/hooks';
import reduceData from './reduceFunction';
import LoaderSpin from '../LoaderSpin';
import Ship from '../Ship';
import './SearchResults.css';

function SearchResults() {
  const { dataLoading, data, itemsPerPage } = useAppSelector(
    (state) => state.search
  );
  const [searchParams] = useSearchParams();
  const [reducedData, setReducedData] = useState([] as IStarship[]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = Number(pageParam);
    const reduced = reduceData(data, itemsPerPage, page);
    setReducedData(reduced);
  }, [data, itemsPerPage, searchParams, setReducedData]);

  return (
    <div className="data-container">
      {dataLoading && <LoaderSpin />}
      {!dataLoading && reducedData.length === 0 && (
        <h3>We have no more ships for you!</h3>
      )}
      {!dataLoading && reducedData.length && (
        <ul>
          {reducedData.map((elem, index) => {
            if (index < itemsPerPage) {
              if (elem) {
                return <Ship item={elem} key={elem.url} />;
              }
            }
            return null;
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
