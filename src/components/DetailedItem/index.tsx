import { useRouter } from 'next/router';
import { IStarship } from '@/types/starship';
import styles from './DetailedItem.module.css';

type Props = {
  item: IStarship | null;
};

function DetailedItem({ item }: Props) {
  const router = useRouter();

  return (
    <article className={styles.details} data-testid="detailed-card">
      {item === null ? null : (
        <>
          <h2>Starship {item.name}</h2>
          <p>Model: {item.model}</p>
          <p>Class: {item.starship_class}</p>
          <p>Cost in galactic credits: {item.cost_in_credits}</p>
          <p>Length: {item.length}</p>
          <p>Passangers number: {item.passengers}</p>
          <p>Cargo capacity: {item.cargo_capacity}</p>
          <button
            type="button"
            data-testid="detailed-close"
            className={styles.buttonClose}
            onClick={() => {
              const page = router.query.pageNumber;
              if (page) router.push(`/page/${page}`);
            }}
          >
            X
          </button>
        </>
      )}
    </article>
  );
}

export default DetailedItem;
