import { Outlet } from 'react-router-dom';

export default function DetailsLayout() {
  return (
    <section>
      <div className="details-results">My Results</div>
      <Outlet />
    </section>
  );
}
