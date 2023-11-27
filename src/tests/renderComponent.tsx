import { RootState, setupStore } from '@/redux/store';
import { render } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

type RenderComponentProps = {
  path?: string;
  preloadedState?: RootState;
  children: ReactNode;
};

const renderComponent = ({
  children,
  path = '/page/1/',
  preloadedState,
}: RenderComponentProps) => {
  const store = setupStore(preloadedState);
  mockRouter.push(path);
  return render(<Provider store={store}>{children}</Provider>);
};

export default renderComponent;
