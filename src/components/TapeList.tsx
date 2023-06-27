import React, { useContext, useEffect, useMemo, useState } from 'react';
import { TAPE_SORT_OPTIONS, useTapes } from '../api/tapedeck-api';
import TapeCard from './TapeCard';
import Select from './Select';
import sortBy from 'lodash/sortBy';
import FilterContext from '../context/FilterContext';
import InfiniteScroll from 'react-infinite-scroll-component';

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

const ITEMS_TO_LOAD = 50;

const TapeList: React.FC = (): JSX.Element => {
  const { data: tapes } = useTapes();
  const [sortKey, setSortKey] = useState<string>('brand');
  const [chunksToDisplay, setChunksToDisplay] = useState<number>(1);
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

  const tapesToDisplay = sortedTapes.slice(0, ITEMS_TO_LOAD * chunksToDisplay);

  useEffect(() => {
    setChunksToDisplay(1);
  }, [sortKey, getFiltersByCategory]);

  const onSort = (value: string) => setSortKey(value);

  return (
    <div className="w-full">
      <div className="flex justify-between m-3">
        <span>{getResultCount(sortedTapes.length)}</span>
        <Select label="SORT BY" options={TAPE_SORT_OPTIONS} onSelect={onSort} />
      </div>
      <InfiniteScroll
        dataLength={tapesToDisplay.length}
        hasMore={tapesToDisplay.length != sortedTapes.length}
        loader="LOADING"
        next={() => setChunksToDisplay((chunksToDisplay) => chunksToDisplay + 1)}
      >
        <div className="m-3 gap-3 grid grid-cols-tapeList">
          {tapesToDisplay.map((tape) => (
            <TapeCard tape={tape} key={tape.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default TapeList;
