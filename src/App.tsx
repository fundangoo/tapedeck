import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from 'react-query';
import TapeList from './components/TapeList';
import SideBar from './components/SideBar';
import { FilterContextProvider } from './context/FilterContext';
import Status from './components/Status';
import FallbackErrorBoundary from './components/FallbackErrorBoundary';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <FilterContextProvider>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <FallbackErrorBoundary reset={reset}>
              <Suspense fallback={<Status status="LOADING" />}>
                <div className="flex p-3">
                  <SideBar />
                  <TapeList />
                </div>
              </Suspense>
            </FallbackErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </FilterContextProvider>
  );
};

export default App;
