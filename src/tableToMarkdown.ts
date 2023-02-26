import { Table } from "./index";

export function tableToMarkdown(table: Table) {
  let tableString = "\r\n";
  const rows = Object.values(table.columns)[0].values.length + 2;
  for (let row = 0; row < rows; row++) {
    tableString += "|";
    for (const columnProps of Object.values(table.columns)) {
      tableString += " ";
      if (row === 0) {
        tableString += columnProps.columnHeader.padEnd(columnProps.width);
      } else if (row === 1) {
        tableString += "".padEnd(columnProps.width, "-");
      } else {
        tableString += (columnProps.values[row - 2] || "-").padEnd(
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
