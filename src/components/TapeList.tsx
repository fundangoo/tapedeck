import React, { useContext, useMemo, useState } from 'react';
import { TAPE_SORT_OPTIONS, useTapes } from '../api/tapedeck-api';
import TapeCard from './TapeCard';
import Select from './Select';
import sortBy from 'lodash/sortBy';
import FilterContext from '../context/FilterContext';

const getResultCount = (count: number) => {
  switch (count) {
    case 0:
      return 'NO RESULTS';
    case 1:
      return '1 RESULT';
    default:
      return count + ' RESULTS';
  }
};

const TapeList: React.FC = (): JSX.Element => {
  const { data: tapes } = useTapes();
  const [sortKey, setSortKey] = useState<string>('brand');
  const { getFilterCategories, getFiltersByCategory, isFilterSelected } = useContext(FilterContext);

  const filteredTapes = useMemo(() => {
    return tapes?.filter((tape) => {
      return getFilterCategories().reduce((isFiltered, category) => {
        const filterOptions = getFiltersByCategory(category);
        const isCategoryEmpty =
          filterOptions.filter((option) => isFilterSelected(category, option)).length === 0;
        const isTapeFilteredInCategory = isFilterSelected(category, tape[category]);
        return isFiltered && (isTapeFilteredInCategory || isCategoryEmpty);
      }, true);
    });
  }, [tapes, getFilterCategories, getFiltersByCategory, isFilterSelected]);

  const sortedTapes = useMemo(() => sortBy(filteredTapes, sortKey), [filteredTapes, sortKey]);

  const onSort = (value: string) => setSortKey(value);

  return (
    <div className="w-full">
      <div className="flex justify-between m-3">
        <span>{getResultCount(sortedTapes.length)}</span>
        <Select label="SORT BY" options={TAPE_SORT_OPTIONS} onSelect={onSort} />
      </div>
      <div className="m-3 gap-3 grid grid-cols-tapeList">
        {sortedTapes.map((tape) => (
          <TapeCard tape={tape} key={tape.id} />
        ))}
      </div>
    </div>
  );
};

export default TapeList;
