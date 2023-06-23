import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';
import sortBy from 'lodash/sortBy';

interface IFilter {
  categoryKey: string;
  categoryLabel: string;
}

const Filter: React.FC<IFilter> = ({ categoryKey, categoryLabel }): JSX.Element => {
  const { toggleFilter, getFiltersByCategory, isFilterSelected, getFilterCount } =
    useContext(FilterContext);

  const sortedOptions = sortBy(getFiltersByCategory(categoryKey));

  return (
    <section key={categoryKey} className="border-black border rounded-md p-3">
      <label className="text-lg font-bold">{categoryLabel}</label>
      <hr className="py-1" />
      <div className="max-w-xs max-h-64 overflow-auto">
        {sortedOptions.map((filterOption) => {
          return (
            <div className="flex gap-1" key={filterOption}>
              <input
                type="checkbox"
                value={filterOption}
                key={filterOption}
                checked={isFilterSelected(categoryKey, filterOption)}
                onChange={(e) => toggleFilter(categoryKey, e.target.value)}
              />
              <label>
                {filterOption}{' '}
                <span className="text-gray-400">({getFilterCount(categoryKey, filterOption)})</span>
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Filter;
