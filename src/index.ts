import fs from "fs-extra";
import path from "path";
import { getTablesWithData } from "./getTablesWithData";
import { tableToMarkdown } from "./tableToMarkdown";
import appRoot from "app-root-path";
const { EOL } = require("os");

interface Column {
  columnHeader: string;
  values: any[];
  width: number;
}

export interface Table {
  contribution: string;
  columns: Record<string, Column>;
  index: number;
  endIndex: number;
}

export function markdownVscodeContributions({
  packagePath = "./package.json",
  inputPath = "./README.md",
  outputPath = inputPath,
}: {
  packagePath?: string;
  inputPath?: string;
  outputPath?: string;
} = {}) {
  const inputFile = fs
    .readFileSync(path.join(appRoot.path, inputPath), "utf8")
    .replace(/\r?\n/g, EOL);
  const packageFile = fs.readFileSync(
    path.join(appRoot.path, packagePath),
    "utf8"
  );
  let outputText = inputFile;
  const tables = getTablesWithData(packageFile, inputFile);
  tables.sort((table1, table2) => table2.index - table1.index);
  for (const table of tables) {
    if (Object.keys(table.columns).length === 0) continue;
    if (Object.values(table.columns)[0].values.length === 0) continue;
    const tableStartIndex = table.endIndex;
    // Search new lines non empty and not starting with "|"
    const nextNewLineNonRelatedRelativeIndex = (
      EOL + outputText.slice(tableStartIndex)
    ).search(/\r?\n([^|\r\n]|$)/);
    const tableEndIndex =
      nextNewLineNonRelatedRelativeIndex !== -1
        ? nextNewLineNonRelatedRelativeIndex + tableStartIndex
        : tableStartIndex;
    outputText =
      outputText.slice(0, tableStartIndex) +
      tableToMarkdown(table) +
      outputText.slice(tableEndIndex);
  }

  if (fs.existsSync(path.join(appRoot.path, outputPath))) {
    const outputInitialText = fs.readFileSync(
      path.join(appRoot.path, outputPath),
      "utf8"
    );
    if (outputInitialText === outputText) {
      // TODO: Notify no changes done (skip step)
      return outputText;
    }
  }

  fs.writeFileSync(path.join(appRoot.path, outputPath), outputText);

  // TODO: Commit changes

  return outputText;
}

export default { markdownVscodeContributions };
