import fs from "fs-extra";
import path from "path";
import { getTablesWithData } from "./getTablesWithData";
import { tableToMarkdown } from "./tableToMarkdown";

interface Column {
  columnHeader: string;
  values: any[];
  width: number;
}

export interface Table {
  columns: Record<string, Column>;
  index: number;
}

function main(
  packagePath = "./package.json",
  readmePath = "./README.md",
  outputReadmePath = readmePath
) {
  const readmeFile = fs.readFileSync(path.join(__dirname, readmePath), "utf8");
  const packageFile = fs.readFileSync(
    path.join(__dirname, packagePath),
    "utf8"
  );
  let finalReadmeText = readmeFile;
  const tables = getTablesWithData(packageFile, readmeFile);
  const tablesValues = Object.values(tables).sort(
    (table1, table2) => table2.index - table1.index
  );
  for (const tableValues of tablesValues) {
    const tableStartIndex =
      finalReadmeText.slice(tableValues.index).search(/(?<=\r?\n\r?\n)/) +
      tableValues.index;
    const tableEndIndex =
      finalReadmeText.slice(tableStartIndex).search(/(?<=\r?\n)\r?\n/) +
      tableStartIndex;
    finalReadmeText =
      finalReadmeText.slice(0, tableStartIndex) +
      tableToMarkdown(tableValues) + // TODO: KEEP EXTRA EXISTING COLUMNS
      finalReadmeText.slice(tableEndIndex);
  }

  if (fs.existsSync(path.join(__dirname, outputReadmePath))) {
    const outputInitialText = fs.readFileSync(
      path.join(__dirname, outputReadmePath),
      "utf8"
    );
    if (outputInitialText === finalReadmeText) {
      // TODO: don't write / don't create commit
    }
  }

  fs.writeFileSync(path.join(__dirname, outputReadmePath), finalReadmeText);

  return finalReadmeText;
}

main(
  "../test/packageTest.json",
  "../test/READMETest.md",
  "../test/READMETestOutput.md"
);
