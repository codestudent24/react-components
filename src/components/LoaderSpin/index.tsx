import './LoaderSpin.css';
import saberImg from '../../assets/saberloader.png';

function LoaderSpin() {
  return (
    <div>
      <img src={saberImg} alt="loading" className="loader-spin" />
    </div>
  );
}

export default LoaderSpin;
