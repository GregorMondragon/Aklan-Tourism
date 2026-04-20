import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

/**
 * Component that scrolls the window to the top on every route change.
 * This is necessary in React Router when using smooth scrolling or
 * large page layouts that keep the previous scroll position.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Scroll to the top of the window instantly
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0,0);
    }
  }, [pathname, search, hash, lenis]);

  return null;
};

export default ScrollToTop;
