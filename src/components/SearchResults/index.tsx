import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import { AppContext } from '../../context';
import reduceData from './reduceFunction';
import Ship from '../Ship';
import LoaderSpin from '../LoaderSpin';
import './SearchResults.css';

type Props = {
  loading: boolean;
};

function SearchResults({ loading }: Props) {
  const [searchParams] = useSearchParams();
  const [reducedData, setReducedData] = useState([] as IStarship[]);
  const { itemsPerPage, data } = useContext(AppContext);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = Number(pageParam);
    let offset = 0;
    if (itemsPerPage === 5) offset = page % 2 === 0 ? 5 : 0;
    const reduced = reduceData(data, itemsPerPage, offset);
    setReducedData(reduced);
  }, [data, itemsPerPage, searchParams, setReducedData]);

  return (
    <div className="data-container">
      {loading && <LoaderSpin />}
      {!loading && reducedData.length && (
        <ul>
          {reducedData.map((elem, index) => {
            if (index < itemsPerPage) {
              if (elem) {
                return <Ship item={elem} key={elem.name} index={index} />;
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
