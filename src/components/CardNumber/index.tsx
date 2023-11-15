import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardNumber.css';
import { AppContext } from '../../context';

function CardNumber() {
  const navigate = useNavigate();
  const { itemsPerPage, setItemsPerPage } = useContext(AppContext);

  useEffect(() => {
    navigate('/?pages=1');
  }, [itemsPerPage, navigate]);

  return (
    <div className="select-container">
      <span>Cards per page:</span>
      <select
        value={itemsPerPage}
        onChange={async (event) => {
          setItemsPerPage(Number(event.target.value));
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
}

export default CardNumber;
