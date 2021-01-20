import React, { useState, useEffect } from "react";
import TableEditor from "./components/TableEditor/TableEditor";
import "../index.css";
import { getInitialValue } from "./app.utils";

export const App = ({ sdk }) => {
  const [value, setValue] = useState(
    getInitialValue(sdk.field.getValue(), {
      rows: 3,
      header: ["", ""],
    })
  );

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  useEffect(() => {
    console.log(value);
    sdk.field.setValue(value);
  }, [value]);

  const handleChangeValue = (val) => {
    setValue(val);
  };

  return <TableEditor value={value} onValueChange={handleChangeValue} />;
};

export default App;
