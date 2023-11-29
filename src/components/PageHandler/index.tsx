import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/hooks';
import styles from './PageHandler.module.css';

export default function PageHandler() {
  const router = useRouter();
  const { count, itemsPerPage } = useAppSelector((state) => state.search);

  return (
    <div className={styles.pageButtons}>
      <button
        type="button"
        className={styles.buttonPage}
        onClick={() => {
          const current = Number(router.query.pageNumber);
          if (current === 1) return;
          router.push(`/page/${current - 1}`);
        }}
      >
        &lt;
      </button>
      <div className={styles.currentPage}>Page {router.query.pageNumber}</div>
      <button
        type="button"
        className={styles.buttonPage}
        onClick={() => {
          const current = Number(router.query.pageNumber);
          if (count <= current * itemsPerPage) return;
          router.push(`/page/${current + 1}`);
        }}
      >
        &gt;
      </button>
    </div>
  );
}
