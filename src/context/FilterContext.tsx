import React, { PropsWithChildren, createContext, useState } from 'react';

type CategoryKey = string;
type FilterKey = string;

type Filter = {
  selected: boolean;
  count: number;
};

export type Filters = {
  [key: CategoryKey]: {
    [key: FilterKey]: Filter;
  };
};

type FilterState = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  toggleFilter: (category: string, filter: string) => void;
  resetFilters: () => void;
  getFilterCategories: () => string[];
  getFiltersByCategory: (category: string) => string[];
  getFilterCount: (category: string, filter: string) => number;
  isFilterSelected: (category: string, filter: string) => boolean;
};

const FilterContext = createContext<FilterState>({
  filters: {},
  setFilters: () => {}, // eslint-disable-line
  toggleFilter: () => {}, // eslint-disable-line
  resetFilters: () => {}, // eslint-disable-line
  getFilterCategories: () => [],
  getFiltersByCategory: () => [],
  getFilterCount: () => 0,
  isFilterSelected: () => false,
});

const FilterContextProvider: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const initialValue: FilterState = {
    filters: {} as Filters,
    setFilters: (filters: Filters) => setState((state) => ({ ...state, filters })),
    toggleFilter: (category: string, filter: string) =>
      setState((state) => ({
        ...state,
        filters: {
          ...state.filters,
          [category]: {
            ...state.filters[category],
            [filter]: {
              ...state.filters[category][filter],
              selected: !state.filters[category][filter].selected,
            },
          },
        },
      })),
    resetFilters: () =>
      setState((state) => {
        const resettedFilters = { ...state.filters };
        Object.keys(resettedFilters).forEach((category) => {
          resettedFilters[category] = { ...state.filters[category] };
          Object.keys(resettedFilters[category]).forEach(
            (filter) => (resettedFilters[category][filter].selected = false)
          );
        });
        return {
          ...state,
          filters: resettedFilters,
        };
      }),
    getFilterCategories: () => [],
    getFiltersByCategory: () => [],
    getFilterCount: () => 0,
    isFilterSelected: () => false,
  };

  const [state, setState] = useState<FilterState>(initialValue);

  const filterContext = {
    ...state,
    getFilterCategories: () => Object.keys(state.filters),
    getFiltersByCategory: (category: string) => Object.keys(state.filters[category]),
    getFilterCount: (category: string, filter: string) => state.filters[category][filter]?.count,
    isFilterSelected: (category: string, filter: string) =>
      state.filters[category][filter]?.selected,
  };

  return <FilterContext.Provider value={filterContext}>{children}</FilterContext.Provider>;
};

export { FilterContextProvider };
export default FilterContext;
