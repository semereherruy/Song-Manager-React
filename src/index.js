import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App.js';

// Get the root element from our HTML
const container = document.getElementById('root');

// Create a React root
const root = createRoot(container);

// Render our App component
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
); 