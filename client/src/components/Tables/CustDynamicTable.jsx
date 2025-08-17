"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
// import CustNoData from "../NoData/CustNoData";
import CustomActionMenu from "../Modal/CustomActionMenu";
import NoDataFound from "../NoDataFound/NoDataFound";

const CustDynamicTable = ({
  data,
  columns,
  totalRecords,
  loading,
  rowSpanColumn,
  rowSelectionEnabled = false,
  selectedRows,
  onRowSelectionChange,
  pagination,
  sorting,
  filters,
  onPageChange,
  onSortChange,
  onFilterChange,
  actionConfig,
  onMenuAction,
  showDefaultPaginator = true,
  customPaginator,
  stripedRows = true,
  emptyIcon = false,
  selectionId = "id",
}) => {
  const [rowData, setRowData] = useState([]);
  const [rowSpanData, setRowSpanData] = useState([]);

  useEffect(() => {
    if (data && rowSpanColumn) {
      const groupedData = data.reduce((acc, item) => {
        const key = item[rowSpanColumn];
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});

      const processedData = data.map((item) => {
        const key = item[rowSpanColumn];
        const group = groupedData[key];
        const index = group.findIndex((i) => i === item);
        return { ...item, rowSpan: index === 0 ? group.length : 0 };
      });

      setRowSpanData(processedData);
    } else {
      setRowData(data || []);
    }
  }, [data, rowSpanColumn]);

  const dataTableProps = {
    value: rowSpanColumn ? rowSpanData : rowData,
    className: `p-datatable-sm ${stripedRows ? "p-datatable-striped" : ""}`,
    responsiveLayout: "scroll",
    scrollable: true,
    scrollHeight: "flex",
    loading,
    emptyMessage: emptyIcon ? <NoDataFound /> : <div className="flex justify-center items-center p-4">No data found</div>,
    dataKey: selectionId,
  };

  if (rowSelectionEnabled) {
    dataTableProps.selection = selectedRows;
    dataTableProps.onSelectionChange = (e) => onRowSelectionChange?.(e.value);
  }

  if (sorting) {
    dataTableProps.sortField = sorting.field;
    dataTableProps.sortOrder = sorting.order;
    dataTableProps.onSort = onSortChange;
  }

  if (filters) {
    dataTableProps.filters = filters;
    dataTableProps.onFilter = onFilterChange;
  }

  dataTableProps.onRowClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full overflow-x-auto">
      <DataTable {...dataTableProps}>
        {rowSelectionEnabled && (
          <Column
            selectionMode="multiple"
            pt={{ bodyCell: { className: "!text-center" } }}
            headerStyle={{ width: "3rem", textAlign: "center" }}
          />
        )}

        {columns?.map?.((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            sortable={col.sortable}
            filter={col.filterable}
            showFilterMatchModes={col.showFilterMatchModes}
            filterElement={col.filterElement}
            filterField={col.filterField}
            style={{
              overflow: 'auto',
              fontSize: "78%",
              textAlign: "center",
              width: col?.width
            }}
            body={(row) => {
              if (col.field === rowSpanColumn && row.rowSpan === 0) return null;
              return <span className="flex items-center justify-center text-center">{col.customBody ? col.customBody(row) : row[col.field]}</span>;
            }}
          />
        ))}

        {actionConfig?.showActionColumn && (
          <Column
            header="Action"
            body={(row) => (
              <span className="text-center">
                {actionConfig.actionButtons ? (
                  actionConfig.actionButtons(row)
                ) : actionConfig.menuItems && actionConfig.menuItems(row).length > 0 ? (
                  <CustomActionMenu
                    rowData={row}
                    menuItems={actionConfig.menuItems(row).map((item) => ({
                      label: item.label || "",
                      icon: typeof item.icon === 'string' ? item.icon : undefined,
                      actionType: item.actionType
                    }))}
                    onMenuAction={onMenuAction || (() => {})}
                  />
                ) : null}
              </span>
            )}
          />
        )}
      </DataTable>

      {showDefaultPaginator && <Paginator totalRecords={totalRecords} rows={pagination?.rows} />}
      {!showDefaultPaginator && customPaginator}
    </div>
  );
};

export default CustDynamicTable;
