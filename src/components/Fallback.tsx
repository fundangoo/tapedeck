import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const Fallback: React.FC<FallbackProps> = ({ resetErrorBoundary }): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <p className="text-center">SOMETHING WENT WRONG.</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-red-500 rounded px-2 py-1 drop-shadow-sm hover:drop-shadow-lg hover:scale-105 hover:font-bold"
      >
        RESET
      </button>
    </div>
  );
};

export default Fallback;
