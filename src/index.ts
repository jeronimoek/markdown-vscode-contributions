import fs from "fs-extra";
import path from "path";
import { getTablesWithData } from "./getTablesWithData";
import { tableToMarkdown } from "./tableToMarkdown";
import appRoot from "app-root-path";
import { EOL } from "os";

interface Column {
  columnHeader: string;
  values: any[];
  width: number;
}

interface Options {
  rootPaths?: boolean;
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
  options = {},
}: {
  packagePath?: string;
  inputPath?: string;
  outputPath?: string;
  options?: Options;
} = {}) {
  const defaultOptions: Options = { rootPaths: true };
  options = { ...defaultOptions, ...options };

  const getPath = (filePath: string) =>
    options.rootPaths ? path.join(appRoot.path, filePath) : filePath;

  const rootInputFile = getPath(inputPath);
  let inputFile;
  try {
    inputFile = fs.readFileSync(rootInputFile, "utf8").replace(/\r?\n/g, EOL);
  } catch (error) {
    throw new Error(`Error reading file ${rootInputFile}`);
  }

  const rootPackagePath = getPath(packagePath);
  let packageFile;
  try {
    packageFile = fs.readFileSync(rootPackagePath, "utf8");
  } catch (error) {
    throw new Error(`Error reading file ${rootPackagePath}`);
  }

  let outputText = inputFile;

  let tables;
  try {
    tables = getTablesWithData(packageFile, inputFile);
  } catch (error: any) {
    if (error?.message) {
      throw new Error(
        `Error getting tables data from files ${rootPackagePath} and ${rootInputFile}: ${error.message}`
      );
    }
    throw error;
  }
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

  if (fs.existsSync(getPath(outputPath))) {
    const outputInitialText = fs.readFileSync(getPath(outputPath), "utf8");
    if (outputInitialText === outputText) {
      // TODO: Notify no changes done (skip step)
      return outputText;
    }
  }

  fs.writeFileSync(getPath(outputPath), outputText);

  // TODO: Commit changes

  return outputText;
}

export default { markdownVscodeContributions };
