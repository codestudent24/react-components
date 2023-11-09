import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IStarship } from '../../types/starship';
import { AppContext } from '../../context';
import Ship from '../Ship';
import LoaderSpin from '../LoaderSpin';
import './SearchResults.css';

type Props = {
  loading: boolean;
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

function SearchResults({ loading }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
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
    </button>
  );
}

export default SearchResults;
