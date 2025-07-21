import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme.js';
import { GlobalStyles } from './styles/GlobalStyles.js';
import Header from './components/Header.js';
import LoadingSpinner from './components/LoadingSpinner.js';
import PerformanceMonitor from './components/PerformanceMonitor.js';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage.js'));
const SongsPage = lazy(() => import('./pages/SongsPage.js'));
const AddSongPage = lazy(() => import('./pages/AddSongPage.js'));
const AboutPage = lazy(() => import('./pages/AboutPage.js'));

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className="App">
          <Header />
          <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/songs" element={<SongsPage />} />
              <Route path="/add-song" element={<AddSongPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
          <PerformanceMonitor />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App; 