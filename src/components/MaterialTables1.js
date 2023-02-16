import React, { useState } from 'react'
import MaterialTable, { MTableToolbar } from '@material-table/core';

import TableSortLabel from '@mui/material/TableSortLabel';

function MaterialTables1({
  tableData,
  tableHeader,
  gridHeight,
  gridLoading,
  tableTitle,
  isTitleShow,
  isCheckboxShow,
  onCheckboxChecked,
  pageIndex,
  totalDataCount,
  pageChangeFuc,
  isFiltering,
  isSearch,
  isPaging,
  isToolbar,
  setbodyHeight,
  leftFixedCols,
  rightFixedCols,
  setBodyFontSize,
  searchQureyFuc,
  addButton,
  disableReorder,
  sortable,
}) {
  // console.log("col", tableHeader)
  const [selectedRow, setSelectedRow] = useState([]);

  const rowcolorChanged = (row) => {
    if (row.priority === 'Routine' && (row.isOutSourced === 'True' || row.isOutsourced === true)) {
      return 'blue';
    }
    if (row.priority === 'Urgent') {
      return '#ff0000';
    }
    return '';
  };

  const rowcolorChange = (row) => {
    if (selectedRow.length > 0) {
      const isExist = selectedRow?.includes(row.id);
      if (isExist) {
        return '#c2f0c2';
      }
    }
    return '';
  };

  const onCheckBoxColorChange = (row) => {
    if (row.length > 0) {
      const ids = row.map((x) => x.id);
      setSelectedRow(ids);
    } else {
      setSelectedRow([]);
    }
    onCheckboxChecked(row);
  };
  let headerPadding;
  let cellPadding;
  if (isCheckboxShow) {
    headerPadding = '5px';
    cellPadding = '2px';
  } else {
    headerPadding = '12px';
    cellPadding = '12px';
  }
  return (
    <div className="filterSize" style={{ width: '100%' }}>
      <MaterialTable
        title={tableTitle}
        icons={{ Filter: () => <div /> }}
        columns={tableHeader}
        data={tableData}
        onSelectionChange={onCheckBoxColorChange}
        page={pageIndex}
        totalCount={totalDataCount}
        onPageChange={pageChangeFuc}
        onSearchChange={searchQureyFuc}
        style={{ width: '100%' }}
        isLoading={gridLoading}
        localization={{
          body: {
            emptyDataSourceMessage: <p style={{ color: 'black', textAlign: 'center' }}>No records to display</p>
          }
          
        }}
        // components={{
        //   Pagination: (props) => (
        //     <TablePagination
        //       {...props}
        //       labelRowsPerPage={<div style={{ fontSize: 14 }}>{props.labelRowsPerPage}</div>}
        //       labelDisplayedRows={(row) => <div style={{ fontSize: 14 }}>{props.labelDisplayedRows(row)}</div>}
        //       SelectProps={{
        //         style: {
        //           fontSize: 14,
        //           height: '40px'
        //         }
        //       }}
        //     />
        //   )
        // }}
        components={{
          Toolbar: (props) => (
            <div
              style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              className="forSearchFocus"
            >
              <div style={{ width: 'width: 100%' }}>
                <MTableToolbar {...props} />
              </div>
              {addButton}
            </div>
          )
        }}
        options={{
          search: isSearch,
          filtering: isFiltering,
          showTitle: isTitleShow,
          emptyRowsWhenPaging: false,
          isLoading: true,
          pageSizeOptions: [10, 50, 100],
          // fixedColumns: {
          //   left: leftFixedCols || 0
          // },
          paging: isPaging,
          pageSize: 15,
          toolbar: isToolbar,
          sorting: true,
          selection: isCheckboxShow,
          maxBodyHeight: '600px',
          tableLayout: 'fixed',
          minBodyHeight: setbodyHeight,
          rowStyle: (rowData) => ({
            fontSize: 13,
            padding: '0px',
            height: '25px',
            color: rowcolorChanged(rowData),
            backgroundColor: selectedRow?.includes(rowData.id) ? '#c2f0c2' : '#ffffff00'
          }),
          cellStyle: {
            padding: cellPadding,
            height: '25px'
          },
          headerStyle: {
            backgroundColor: '#0078d4',
            padding: headerPadding,
            color: '#ffffff',
            position: 'sticky',
            top: 0,
            height: '20px',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            border: '1px solid'
          }
        }}
      />
    </div>
  )
}

export default MaterialTables1