import './PageHandler.css';

type Props = {
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

export default function PageHandler(props: Props) {
  const { currentPage, setCurrentPage } = props;

  const handleDecrement = (value: number) => {
    if (value < 2) return;
    setCurrentPage(value - 1);
  };

  const handleIncrement = (value: number) => {
    if (value > 3) return;
    setCurrentPage(value + 1);
  };

  return (
    <div className="page-buttons">
      <button
        type="button"
        className="button-page"
        onClick={() => {
          handleDecrement(currentPage);
        }}
      >
        &lt;
      </button>
      <div className="current-page">{currentPage}</div>
      <button
        type="button"
        className="button-page"
        onClick={() => {
          handleIncrement(currentPage);
        }}
      >
        &gt;
      </button>
    </div>
  );
}
