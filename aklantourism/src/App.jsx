import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';

const Home = lazy(() => import('./pages/home'));
const Destinations = lazy(() => import('./pages/destinations'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Auth = lazy(() => import('./pages/auth'));
const NotFound = lazy(() => import('./pages/notfound'));
const Suggestions = lazy(() => import('./pages/suggestions'));
const Privacy = lazy(() => import('./pages/privacy'));

import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <ErrorBoundary>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <ScrollToTopButton />
          <CookieConsent />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App
