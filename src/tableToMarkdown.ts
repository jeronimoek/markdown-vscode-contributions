import { Table } from "./index";
import { unicodePadEnd } from "./utils";

export function tableToMarkdown(table: Table) {
  let tableString = "\r\n\r\n";
  const rows = Object.values(table.columns)[0].values.length + 2;
  for (let row = 0; row < rows; row++) {
    tableString += "|";
    for (const columnProps of Object.values(table.columns)) {
      tableString += " ";
      if (row === 0) {
        tableString += unicodePadEnd(
          columnProps.columnHeader,
          columnProps.width
        );
      } else if (row === 1) {
        tableString += unicodePadEnd("", columnProps.width, "-");
      } else {
        tableString += unicodePadEnd(
          columnProps.values[row - 2] || "-",
          columnProps.width
        );
      }
      tableString += " |";
    }
    tableString += "\r\n";
  }
  tableString += "\r\n";
  return tableString;
}
