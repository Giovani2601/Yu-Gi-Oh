import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CardsProvider } from './contexts/CardsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CardsProvider>
        <App />
      </CardsProvider>
  </React.StrictMode>
);
