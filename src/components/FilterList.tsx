import React, { useContext, useEffect } from 'react';
import { TAPE_FILTER_CATEGORIES, Tape, getTapeAttributeHR, useTapes } from '../api/tapedeck-api';
import FilterContext, { Filters } from '../context/FilterContext';
import Filter from './Filter';

function createFilters(data?: Tape[]): Filters {
  const filters: Filters = {};
  data?.forEach((item) => {
    TAPE_FILTER_CATEGORIES.forEach((category) => {
      const attributeByCategory = item[category];
      const count = (filters[category]?.[attributeByCategory]?.count || 0) + 1;
      const filter = attributeByCategory
        ? { [attributeByCategory]: { selected: false, count } }
        : {};
      filters[category] = { ...filters[category], ...filter };
    });
  });
  return filters;
}

const FilterList: React.FC = (): JSX.Element => {
  const { data: tapes } = useTapes();
  const { setFilters, resetFilters, getFilterCategories } = useContext(FilterContext);

  useEffect(() => {
    setFilters(createFilters(tapes));
  }, [tapes, setFilters]);

  return (
    <div className="flex flex-col gap-3">
      <button onClick={resetFilters} className="hover:text-red-500 m-3">
        <span className="text-red-500 font-bold">X</span> CLEAR FILTERS
      </button>
      {getFilterCategories().map((filterKey) => (
        <Filter
          categoryLabel={getTapeAttributeHR(filterKey)}
          categoryKey={filterKey}
          key={filterKey}
        />
      ))}
    </div>
  );
};

export default FilterList;
