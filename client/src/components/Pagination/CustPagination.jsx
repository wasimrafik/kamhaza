"use client";
import React from 'react';
import {
  Paginator,
  PaginatorCurrentPageReportOptions,
  PaginatorNextPageLinkOptions,
  PaginatorPrevPageLinkOptions,
  PaginatorRowsPerPageDropdownOptions,
} from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from 'primereact/tooltip';
import { Slider } from 'primereact/slider';

const CustPagination = ({
  totalRecords,
  rows,
  page,
  first,
  onPageChange,
  template = 'first',
  rowsPerPageOptions = [5, 10, 20, 50],
  className = '',
}) => {
  const TEMPLATE_LAYOUTS = {
    first: { layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' },
    second: { layout: 'PrevPageLink CurrentPageReport NextPageLink' },
    second2: {
      layout: 'PrevPageLink CurrentPageReport NextPageLink',
      CurrentPageReport: (options) => <span style={{ fontWeight: 'bold', userSelect: 'none' }}>{options?.currentPage}</span>,
    },
    third: { layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink' },
    fourth: {
      layout: 'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink',
      RowsPerPageDropdown: (options) => {
        const dropdownOptions = rowsPerPageOptions;
        return (
          <>
            <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
            <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
          </>
        );
      },
      CurrentPageReport: (options) => (
        <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      ),
    },
    sixth: { layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink' },
    seven: {
      layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
      RowsPerPageDropdown: (options) => {
        return (
          <div className="flex align-items-center">
            <Tooltip target=".slider>.p-slider-handle" content={`${options.value} / page`} position="top" className='text-xs' />
            <span className="mr-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
            <Slider
              className="slider"
              value={options.value}
              onChange={(e) => options?.onChange({ value: e.value })}
              min={10}
              max={120}
              step={30}
              style={{ width: '10rem' }}
            />
          </div>
        );
      },
      CurrentPageReport: (options) => (
        <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      ),
    },
    eight: {
      layout: 'RowsPerPageDropdown PrevPageLink CurrentPageReport NextPageLink',
      RowsPerPageDropdown: (options) => {
        const dropdownOptions = rowsPerPageOptions.map((opt) => ({ label: opt, value: opt }));
        return (
          <>
            <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
            <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
          </>
        );
      },
      CurrentPageReport: (options) => <span style={{ fontWeight: 'bold', userSelect: 'none' }}>{options?.currentPage}</span>,
    },
    ninth: {
      layout: 'PrevPageLink CurrentPageReport NextPageLink',
      PrevPageLink: (options) => (
        <button
          type="button"
          className={classNames('p-paginator-element p-paginator-prev p-link', { 'p-disabled': options.disabled })}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-paginator-icon font-semibold">Prev</span>
          <Ripple />
        </button>
      ),
      NextPageLink: (options) => (
        <button
          type="button"
          className={classNames('p-paginator-element p-paginator-next p-link', { 'p-disabled': options.disabled })}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-paginator-icon font-semibold">Next</span>
          <Ripple />
        </button>
      ),
      CurrentPageReport: (options) => <span className='mx-2' style={{ fontWeight: 'bold', userSelect: 'none' }}>{options?.currentPage}</span>,
    },
  };

  const getTemplate = () => {
    if (template) return TEMPLATE_LAYOUTS[template];
    return undefined;
  };

  return (
    <>
      {totalRecords > 0 && (
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={onPageChange}
          template={getTemplate()}
          className={className}
        />
      )}
    </>
  );
};

export default CustPagination;
