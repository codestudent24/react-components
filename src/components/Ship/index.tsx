import { useRouter } from 'next/router';
import { IStarship } from '../../types/starship';
import styles from './Ship.module.css';

type ShipProps = {
  item: IStarship;
};

function Ship({ item }: ShipProps) {
  const router = useRouter();

  function showDetails(url: string) {
    // url: "[0]https:/[1] /[2] swapi.dev/[3] api/[4] starships/[5] 9/[6] "
    const detailsIndex = url.split('/')[5];
    console.log(router.query)
    const page = router.query.pageNumber;
    if (typeof page === "string") {
      router.push(`/page/${page}/detailed/${detailsIndex}`);
    }
  }

  return (
    <li className={styles.ship}>
      <button
        type="button"
        data-testid="ship-button"
        onClick={() => {
          showDetails(item.url);
        }}
      >
        <h2>Starship {item.name}</h2>
        <p>Model: {item.model}</p>
      </button>
    </li>
  );
}

export default Ship;
