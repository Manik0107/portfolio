import { lazy, Suspense, useEffect, useState } from 'react';

const Scene3D = lazy(() => import('./Scene3D'));

/**
 * Defers the WebGL scene until after the first meaningful paint so the
 * page content (LCP) is never blocked by the three.js bundle.
 */
export default function DeferredScene() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setShow(true);
      return;
    }
    const id = window.setTimeout(() => setShow(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) return null;

  return (
    <Suspense fallback={null}>
      <Scene3D />
    </Suspense>
  );
}
