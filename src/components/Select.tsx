import React from 'react';

type SelectOption = {
  label: string;
  value: string;
};

interface ISelect {
  label: string;
  options: SelectOption[];
  onSelect: (optionValue: string) => void;
}

const Select: React.FC<ISelect> = ({ label, options, onSelect }): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.blur();
    onSelect(e.target.value);
  };

  return (
    <span>
      <label>{label}</label>
      <select onChange={onChange} className="border-2 rounded-md ms-3">
        {options.map((option) => (
          <option value={option.value} label={option.label} key={option.value} />
        ))}
      </select>
    </span>
  );
};

export default Select;
