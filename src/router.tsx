import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ROUTES } from './constants';
import Root from './layout/Root';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={'/'}
        element={<Root />}>
        <Route
          index
          element={<Customers />}
        />
        <Route
          path={ROUTES.CUSTOMERS.path}
          element={<Customers />}
        />
        <Route
          path={ROUTES.TRANSACTIONS.path}
          element={<Transactions />}
        />
      </Route>
    </>
  )
);
