import Image from 'next/image';
import saberImg from '@/assets/saberloader.png';
import styles from './LoaderSpin.module.css';

function LoaderSpin() {
  return (
    <div className={styles.container} data-testid="loader-div">
      <Image
        className={styles.spin}
        src={saberImg}
        alt="loader"
        width={48}
        height={48}
      />
    </div>
  );
}

export default LoaderSpin;
