import { Route, Routes } from 'react-router';
import { AdDetails } from './components/AdDetails';
import { AdsList } from './components/AdsList';
import { NotFoundPage } from './components/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route element={<AdsList />} path="/ads" />
    <Route element={<AdDetails />} path="/ads/:id" />
    <Route element={<NotFoundPage />} path="*" />
  </Routes>
);
