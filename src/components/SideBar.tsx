import React from 'react';
import FilterList from './FilterList';

const SideBar: React.FC = (): JSX.Element => {
  return (
    <div className="px-3 min-w-max border-r relative">
      <FilterList />
    </div>
  );
};

export default SideBar;
