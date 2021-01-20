export const MAX_ROW = 10;
export const MIN_ROW = 1;
export const MAX_COL = 10;
export const MIN_COL = 1;

const initiateArray = (length) => {
  const res = [];

  for (let i = 0; i < length; i++) {
    res.push("");
  }

  return res;
};

export const getInitialValue = (value, { rows, header }) => {
  if (value && value.tableData) {
    return value;
  }

  const data = [header];

  for (let i = 0; i < rows; i++) {
    data.push(initiateArray(data[0].length));
  }

  return {
    tableData: data,
  };
};

export const getValueByColCount = (value, count) => {
  const data = value.tableData;
  const rows = data.length;

  count = parseInt(count, 10);

  if (!isNaN(count)) {
    for (let i = 0; i < rows; i++) {
      const row = data[i];

      if (row.length > count) {
        data[i] = row.slice(0, count);
      } else if (row.length < count) {
        data[i] = [...row, ...initiateArray(count - row.length)];
      }
    }
  }

  return {
    tableData: data,
  };
};

export const getValueByRowCount = (value, count) => {
  let data = value.tableData;
  const rows = data.length;

  count = parseInt(count, 10);

  if (!isNaN(count)) {
    if (rows > count) {
      data = data.slice(0, count);
    } else if (rows < count) {
      const newRows = count - rows;
      const newArr = [];

      for (let j = 0; j < newRows; j++) {
        newArr.push(initiateArray(data[0].length));
      }

      data = [...data, ...newArr];
    }
  }

  return {
    tableData: data,
  };
};

export const getCellValue = (value, curCell) => {
  if (value.tableData[curCell.row][curCell.col] !== undefined) {
    return value.tableData[curCell.row][curCell.col];
  }
  return "";
};

export const updateValue = (value, text, curCell) => {
  if (value.tableData[curCell.row][curCell.col] !== undefined) {
    value.tableData[curCell.row][curCell.col] = text;
  }

  return {
    ...value,
  };
};

export const isColCountValid = (count) => {
  count = parseInt(count, 10);

  return !isNaN(count) && MAX_COL >= count && MIN_COL <= count;
};

export const isRowCountValid = (count) => {
  count = parseInt(count, 10);

  return !isNaN(count) && MAX_ROW >= count && MIN_ROW <= count;
};
