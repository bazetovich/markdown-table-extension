import React, { useState } from "react";
import TableInner from "../TableInner/TableInner";
import {
  getValueByColCount,
  getValueByRowCount,
  isColCountValid,
  isRowCountValid,
  updateValue,
  getCellValue,
  MAX_ROW,
  MIN_ROW,
  MAX_COL,
  MIN_COL,
} from "../../app.utils";

import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

export const TableEditor = ({ value, onValueChange }) => {
  const [curCell, setCurCell] = useState();
  const [colCount, setColCount] = useState(value.tableData[0].length);
  const [rowCount, setRowCount] = useState(value.tableData.length);

  const handleCellClick = (params) => {
    setCurCell(params);
  };

  const handleColChange = (e) => {
    const colCount = e.currentTarget.value;

    if (isColCountValid(colCount)) {
      onValueChange(getValueByColCount(value, colCount));
    }

    setColCount(colCount);
    setCurCell(null);
  };

  const handleRowChange = (e) => {
    const rowCount = e.currentTarget.value;

    if (isRowCountValid(rowCount)) {
      onValueChange(getValueByRowCount(value, rowCount));
    }

    setRowCount(rowCount);
    setCurCell(null);
  };

  const handleMDChange = ({ text }) => {
    if (curCell) {
      onValueChange(updateValue(value, text, curCell));
    }
  };

  return (
    <div className="table-editor">
      <div className="table-settings">
        <div>
          <label>Columns</label>
          <input
            onChange={handleColChange}
            value={colCount}
            className="col-count"
            type="number"
            min={MIN_COL}
            max={MAX_COL}
          />
        </div>
        <div>
          <label>Rows</label>
          <input
            onChange={handleRowChange}
            value={rowCount}
            className="row-count"
            type="number"
            min={MIN_ROW}
            max={MAX_ROW}
          />
        </div>
      </div>
      <TableInner
        selected={curCell}
        onCellClick={handleCellClick}
        data={value.tableData}
      />
      {curCell && (
        <>
          <div style={{ height: "1rem" }} />
          <MdEditor
            onChange={handleMDChange}
            value={getCellValue(value, curCell)}
            config={{
              view: {
                html: false,
              },
              canView: {
                fullScreen: false,
                html: false,
                md: false,
              },
            }}
            style={{ height: "220px" }}
          />
        </>
      )}
    </div>
  );
};

export default TableEditor;
