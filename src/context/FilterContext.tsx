import React, { PropsWithChildren, createContext, useCallback, useReducer } from 'react';

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
};

const enum FILTER_ACTION_TYPE {
  SET,
  TOGGLE,
  RESET,
}

type FilterAction = {
  type: FILTER_ACTION_TYPE;
  payload?: any; // eslint-disable-line
};

type FilterReducer = (state: FilterState, action: FilterAction) => FilterState;

const filterReducer: FilterReducer = (state: FilterState, { type, payload }: FilterAction) => {
  switch (type) {
    case FILTER_ACTION_TYPE.SET: {
      return { ...state, filters: payload };
    }
    case FILTER_ACTION_TYPE.TOGGLE: {
      const { category, filter } = payload;
      return {
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
      };
    }
    case FILTER_ACTION_TYPE.RESET: {
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
    }
    default:
      return state;
  }
};

const initialFilterState: FilterState = { filters: {} };

const useFilterContext = () => {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  const setFilters = useCallback(
    (filters: Filters) =>
      dispatch({
        type: FILTER_ACTION_TYPE.SET,
        payload: filters,
      }),
    []
  );

  const toggleFilter = useCallback(
    (category: string, filter: string) =>
      dispatch({
        type: FILTER_ACTION_TYPE.TOGGLE,
        payload: {
          category,
          filter,
        },
      }),
    []
  );

  const resetFilters = useCallback(
    () =>
      dispatch({
        type: FILTER_ACTION_TYPE.RESET,
      }),
    []
  );

  const getFilterCategories = useCallback(() => Object.keys(filterState.filters), [filterState]);

  const getFiltersByCategory = useCallback(
    (category: string) => Object.keys(filterState.filters[category]),
    [filterState]
  );

  const getFilterCount = useCallback(
    (category: string, filter: string) => filterState.filters[category][filter]?.count,
    [filterState]
  );

  const isFilterSelected = useCallback(
    (category: string, filter: string) => filterState.filters[category][filter]?.selected,
    [filterState]
  );

  return {
    filterState,
    setFilters,
    toggleFilter,
    resetFilters,
    getFilterCategories,
    getFiltersByCategory,
    getFilterCount,
    isFilterSelected,
  };
};

type UseFilterContextType = ReturnType<typeof useFilterContext>;

const FilterContext = createContext<UseFilterContextType>({
  filterState: initialFilterState,
  setFilters: () => undefined,
  toggleFilter: () => undefined,
  resetFilters: () => undefined,
  getFilterCategories: () => [],
  getFiltersByCategory: () => [],
  getFilterCount: () => 0,
  isFilterSelected: () => false,
});

const FilterContextProvider: React.FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <FilterContext.Provider value={useFilterContext()}>{children}</FilterContext.Provider>;
};

export { FilterContextProvider };
export default FilterContext;
