import fs from "fs-extra";
import path from "path";
import { getTablesWithData } from "./getTablesWithData";
import { tableToMarkdown } from "./tableToMarkdown";
import appRoot from "app-root-path";

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
  readmePath = "./README.md",
  outputReadmePath = readmePath,
}: {
  packagePath?: string;
  readmePath?: string;
  outputReadmePath?: string;
} = {}) {
  const readmeFile = fs.readFileSync(
    path.join(appRoot.path, readmePath),
    "utf8"
  );
  const packageFile = fs.readFileSync(
    path.join(appRoot.path, packagePath),
    "utf8"
  );
  let finalReadmeText = readmeFile;
  const tables = getTablesWithData(packageFile, readmeFile);
  tables.sort((table1, table2) => table2.index - table1.index);
  for (const table of tables) {
    if (Object.keys(table.columns).length === 0) continue;
    if (Object.values(table.columns)[0].values.length === 0) continue;
    const tableStartIndex = table.endIndex;
    // Search new lines non empty and not starting with "|"
    const nextNewLineNonRelatedRelativeIndex = (
      "\r\n" + finalReadmeText.slice(tableStartIndex)
    ).search(/\r?\n[^|\r\n]/);
    const tableEndIndex =
      nextNewLineNonRelatedRelativeIndex !== -1
        ? nextNewLineNonRelatedRelativeIndex + tableStartIndex
        : tableStartIndex;
    finalReadmeText =
      finalReadmeText.slice(0, tableStartIndex) +
      tableToMarkdown(table) +
      finalReadmeText.slice(tableEndIndex);
  }

  if (fs.existsSync(path.join(appRoot.path, outputReadmePath))) {
    const outputInitialText = fs.readFileSync(
      path.join(appRoot.path, outputReadmePath),
      "utf8"
    );
    if (outputInitialText === finalReadmeText) {
      // TODO: Notify no changes done (skip step)
      return finalReadmeText;
    }
  }

  fs.writeFileSync(path.join(appRoot.path, outputReadmePath), finalReadmeText);

  // TODO: Commit changes

  return finalReadmeText;
}

export default { markdownVscodeContributions };
