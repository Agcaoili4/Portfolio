import { lazy, Suspense } from 'react';

const DottedSurfaceImpl = lazy(() =>
  import('./dotted-surface').then((m) => ({ default: m.DottedSurface }))
);

export function DottedSurface(props) {
  return (
    <Suspense fallback={null}>
      <DottedSurfaceImpl {...props} />
    </Suspense>
  );
}
