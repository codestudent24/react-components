import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCount } from '@/redux/dataSlice';
import { IStarshipResponse } from '@/types/starship';
import Ship from '../Ship';
import styles from './SearchResults.module.css';

type Props = {
  propsData: IStarshipResponse;
};

function SearchResults({ propsData }: Props) {
  const { itemsPerPage } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (propsData.count) {
      dispatch(setCount(propsData.count));
    }
  }, [dispatch, propsData]);

  return (
    <article className={styles.container} suppressHydrationWarning>
      {propsData.results ? (
        <>
          {propsData.results.length === 0 && (
            <h3>We have no more ships for you!</h3>
          )}
          {propsData.results.length && (
            <ul>
              {propsData.results.map((elem, index) => {
                if (index < itemsPerPage) {
                  if (elem) {
                    return <Ship item={elem} key={elem.url} />;
                  }
                }
                return null;
              })}
            </ul>
          )}
        </>
      ) : null}
    </article>
  );
}

export default SearchResults;
