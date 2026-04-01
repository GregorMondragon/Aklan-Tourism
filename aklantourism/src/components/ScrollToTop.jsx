import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls the window to the top on every route change.
 * This is necessary in React Router when using smooth scrolling or
 * large page layouts that keep the previous scroll position.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window instantly
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
