import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { debounce } from 'lodash';

const CustAutoComplete = ({
  placeholder = 'Search...',
  fetchOptions = async (e) => [],
  onOptionSelect,
  debounceTime = 300,
  displayField = 'label',
  minLength = 0,
  className = '',
  disabled = false,
  id,
  style,
  inputSearch,
  label = '',
  description = '',
  remove = 0,
  invalid,
  error,
  required,
  labelSize = 'lg',
  readOnly,
  preventEmptyOnBlur = false,
  clientSideFiltering = false,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const isSelectingRef = useRef(false);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    if (inputSearch) setInputValue(inputSearch);
    else setInputValue('');
  }, [inputSearch]);

  useEffect(() => {
    if (clientSideFiltering && !dataLoadedRef.current) {
      const loadAllOptions = async () => {
        setLoading(true);
        try {
          const results = (await fetchOptions('')) || [];
          setAllOptions(results);
          dataLoadedRef.current = true;
        } catch (err) {
          console.error('Error fetching all options:', err);
        } finally {
          setLoading(false);
        }
      };
      loadAllOptions();
    }
  }, [clientSideFiltering, fetchOptions]);

  const debouncedLoadOptions = useCallback(
    debounce(async (searchTerm) => {
      if (isSelectingRef.current) {
        isSelectingRef.current = false;
        return;
      }
      setLoading(true);
      try {
        if (clientSideFiltering && dataLoadedRef.current) {
          const filteredResults = allOptions.filter((option) => {
            const optionLabel = option[displayField];
            return String(optionLabel || '')
              .toLowerCase()
              .includes(String(searchTerm || '').toLowerCase());
          });
          setOptions(filteredResults);
          if (filteredResults.length > 0) autocompleteRef.current?.show();
        } else {
          const results = (await fetchOptions(searchTerm)) || [];
          setOptions(results);
          if (results.length > 0) autocompleteRef.current?.show();
        }
      } catch (err) {
        console.error('Error fetching options:', err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, debounceTime),
    [fetchOptions, debounceTime, clientSideFiltering, allOptions, displayField]
  );

  const handleFocus = () => {
    if (clientSideFiltering && !dataLoadedRef.current) {
      const loadAllOptions = async () => {
        setLoading(true);
        try {
          const results = (await fetchOptions('')) || [];
          setAllOptions(results);
          setOptions(results);
          dataLoadedRef.current = true;
          if (results.length > 0) autocompleteRef.current?.show();
        } catch (err) {
          console.error('Error fetching all options:', err);
        } finally {
          setLoading(false);
        }
      };
      loadAllOptions();
    } else {
      debouncedLoadOptions(inputValue);
    }
  };

  const handleInputChange = (e) => {
    const query = e.query;
    setInputValue(query);
    debouncedLoadOptions(query);
  };

  const handleSelect = (e) => {
    const selectedValue = e.value;
    isSelectingRef.current = true;
    setInputValue(selectedValue[displayField]);
    onOptionSelect?.(selectedValue);
    setTimeout(() => inputRef.current?.blur(), 50);
  };

  const handleClear = () => {
    isSelectingRef.current = false;
    setInputValue('');
    onOptionSelect?.(null);
    if (document.activeElement === inputRef.current) {
      if (clientSideFiltering && dataLoadedRef.current) {
        setOptions(allOptions);
        if (allOptions.length > 0) autocompleteRef.current?.show();
      } else {
        debouncedLoadOptions('');
      }
    }
  };

  const itemTemplate = (option) => <div>{option?.[displayField]}</div>;

  useEffect(() => {
    if (remove !== 0) setInputValue('');
  }, [remove]);

  const handleBlur = () => {
    if (!isSelectingRef.current) {
      if (inputValue === '') {
        if (preventEmptyOnBlur && inputSearch) setInputValue(inputSearch);
        else onOptionSelect?.(null);
      } else {
        setInputValue(inputSearch || '');
      }
    }
  };

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
      dataLoadedRef.current = false;
    };
  }, []);

  return (
    <div className={`${rest?.pClass}`}>
      {label && (
        <div className={`font-bold text-${labelSize} mb-1`}>
          {label}{' '}
          {required && <span className="text-red-400 relative -left-1">*</span>}
        </div>
      )}
      {description && (
        <div className="font-medium text-sm block mb-1">{description}</div>
      )}
      <AutoComplete
        ref={autocompleteRef}
        inputRef={inputRef}
        id={id}
        value={inputValue}
        suggestions={options}
        completeMethod={handleInputChange}
        field={displayField}
        onSelect={handleSelect}
        invalid={invalid}
        onClear={handleClear}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full ${className}`}
        inputClassName="w-full"
        dropdownMode="blank"
        forceSelection
        itemTemplate={itemTemplate}
        disabled={disabled}
        minLength={minLength}
        style={style}
        aria-label={placeholder}
        required={required}
        readOnly={readOnly}
        {...rest}
      />
      <div className="text-red-500 text-sm">{error}</div>
    </div>
  );
};

export default CustAutoComplete;
