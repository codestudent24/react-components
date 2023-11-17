import { useState, useEffect } from 'react';
import { IStarship } from '../../types/starship';
import { useAppSelector } from '../../redux/hooks';
import reduceData from './reduceFunction';
import LoaderSpin from '../LoaderSpin';
import Ship from '../Ship';
import './SearchResults.css';

function SearchResults() {
  const { itemsPerPage, data, dataLoading } = useAppSelector(
    (state) => state.search
  );
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const [reducedData, setReducedData] = useState([] as IStarship[]);

  useEffect(() => {
    if (data) {
      const reduced = reduceData(data, itemsPerPage, currentPage);
      setReducedData(reduced);
    }
  }, [data, itemsPerPage, currentPage, setReducedData]);

  if (dataLoading) return <LoaderSpin />;

  return (
    <div className="data-container">
      {reducedData.length === 0 && <h3>We have no more ships for you!</h3>}
      {reducedData.length && (
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
