"use client";
import React from 'react';
import { MultiSelect } from "primereact/multiselect";

const CustMultiSelect = ({
  options,
  selectedValues,
  onChange,
  filter,
  placeholder = "Search",
  panelClassName,
  className,
  display,
  maxSelectedLabels,
  selectedItemsLabel,
  optionLabel = 'label',
  optionValue = 'value',
  optionGroupChildren,
  optionGroupLabel,
  showSelectAll,
  selectAllLabel
}) => {
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  React.useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleSearch = (event) => {
    const query = (event.filter || '').toLowerCase();
    if (!optionGroupChildren) {
      setFilteredOptions((options || []).filter((option) =>
        String(option[optionLabel]).toLowerCase().includes(query)
      ));
    }
  };

  const panelHeaderTemplate = React.useMemo(() => {
    if (!selectAllLabel) return undefined;
    return (event) => {
      const { className, checkboxElement, closeElement } = event;
      return (
        <div className={className + ' flex items-center justify-between px-3 py-2'}>
          <div className="flex items-center gap-2">
            {checkboxElement}
            <span className="select-all">{selectAllLabel}</span>
          </div>
          {closeElement}
        </div>
      );
    };
  }, [selectAllLabel]);

  return (
    <MultiSelect
      value={selectedValues}
      options={filteredOptions}
      onChange={(e) => onChange(e.value)}
      placeholder={placeholder}
      filter={filter}
      onFilter={handleSearch}
      panelClassName={panelClassName}
      className={className}
      display={display}
      maxSelectedLabels={maxSelectedLabels}
      selectedItemsLabel={selectedItemsLabel}
      optionLabel={optionLabel}
      optionValue={optionValue}
      optionGroupChildren={optionGroupChildren}
      optionGroupLabel={optionGroupLabel}
      showSelectAll={showSelectAll}
      panelHeaderTemplate={panelHeaderTemplate}
    />
  );
};

export default CustMultiSelect;
