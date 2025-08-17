"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';

const NewCustAutoComplete = ({
  placeholder = 'Search...',
  fetchOptions,
  onOptionSelect,
  inputSearch,
  className = '',
  disabled = false,
  id,
  style,
  label,
  description,
  invalid = false,
  error,
  required = false,
  readOnly = false,
  minLength = 1,
  onSearch,
  onRefresh,
}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(inputSearch || '');
  }, [inputSearch]);

  const handleCompleteMethod = useCallback(
    async (event) => {
      const query = event.query;
      if (!query || query.trim() === '') {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const results = await fetchOptions(query);
        setSuggestions(results || []);
      } catch (err) {
        console.error('Error fetching autocomplete options:', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchOptions]
  );

  const handleSelect = useCallback(
    (e) => {
      const selectedOption = e.value;
      if (selectedOption) {
        setValue(selectedOption.label);
        onOptionSelect(selectedOption);
        if (onSearch) onSearch(selectedOption.label);
      }
    },
    [onOptionSelect, onSearch]
  );

  const handleChange = useCallback(
    (e) => {
      const inputValue =
        typeof e.value === 'string' ? e.value : e.value?.label || '';
      setValue(inputValue);
      if (!inputValue) onOptionSelect(null);
    },
    [onOptionSelect]
  );

  const handleClear = useCallback(() => {
    setValue('');
    setSuggestions([]);
    onOptionSelect(null);
  }, [onOptionSelect]);

  const itemTemplate = useCallback((option) => {
    return (
      <div className="flex align-items-center">
        <span>{option.label}</span>
      </div>
    );
  }, []);

  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-bold text-lg mb-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      {description && (
        <div className="font-medium text-sm text-gray-600 mb-1">
          {description}
        </div>
      )}
      <div className="flex gap-2 items-center">
        <AutoComplete
          id={id}
          value={value}
          suggestions={suggestions}
          completeMethod={handleCompleteMethod}
          field="label"
          onChange={handleChange}
          onSelect={handleSelect}
          onClear={handleClear}
          placeholder={placeholder}
          className={`flex-1 ${className}`}
          inputClassName={`w-full ${invalid ? 'p-invalid' : ''}`}
          disabled={disabled}
          readOnly={readOnly}
          style={style}
          forceSelection={false}
          autoFocus={false}
          minLength={minLength}
          itemTemplate={itemTemplate}
          emptyMessage="No results found"
          aria-label={placeholder}
        />
        {onSearch && (
          <Button
            icon="pi pi-search"
            className="p-button-primary"
            onClick={() => onSearch(value)}
            disabled={disabled || !value}
            tooltip="Search"
            tooltipOptions={{ position: 'top' }}
          />
        )}
        {onRefresh && (
          <Button
            icon="pi pi-refresh"
            className="p-button-primary"
            onClick={onRefresh}
            disabled={disabled || !value}
            tooltip="Refresh"
            tooltipOptions={{ position: 'top' }}
          />
        )}
      </div>
      {error && <small className="text-red-500 mt-1">{error}</small>}
    </div>
  );
};

export default NewCustAutoComplete;
