import React from "react";
import ReactMarkdown from "react-markdown";

export const TableEditor = ({ selected, onCellClick, data }) => {
  const makeCellCLickHandler = (row, col) => {
    return () => {
      onCellClick({ row, col });
    };
  };

  return (
    <table>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((val, j) => {
              const isActive =
                selected && selected.row === i && selected.col === j;
              return (
                <td
                  className={isActive ? "active" : ""}
                  onClick={makeCellCLickHandler(i, j)}
                  key={j}
                >
                  <div>
                    <ReactMarkdown>{val}</ReactMarkdown>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableEditor;
