import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationsProvider } from './contexts/ReservationsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReservationsProvider>
          <App />
        </ReservationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
