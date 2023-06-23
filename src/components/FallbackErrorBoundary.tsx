import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './Fallback';

interface IFallbackErrorBoundary {
  reset: () => void;
}

const FallbackErrorBoundary: React.FC<React.PropsWithChildren<IFallbackErrorBoundary>> = ({
  reset,
  children,
}): JSX.Element => {
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Fallback error={error} resetErrorBoundary={resetErrorBoundary}></Fallback>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default FallbackErrorBoundary;
