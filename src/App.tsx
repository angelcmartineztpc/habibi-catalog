import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CatalogProvider, type ViewMode } from './context/CatalogContext';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage/CatalogPage'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));

interface AppProps {
  initialViewMode?: ViewMode;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<div aria-busy="true">Cargando Habibi...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App({ initialViewMode = 'map' }: AppProps) {
  return (
    <CatalogProvider initialViewMode={initialViewMode}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-center" theme="dark" />
      </BrowserRouter>
    </CatalogProvider>
  );
}
