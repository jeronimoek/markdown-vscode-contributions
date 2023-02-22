const fs = require("fs-extra");
const path = require("path");

const Contributions = {
  AUTHENTICATION: "authentication",
  BREAKPOINTS: "breakpoints",
  COLORS: "colors", // TODO:
  COMMANDS: "commands",
  CONFIGURATION: "configuration",
  CONFIGURATIONDEFAULTS: "configurationDefaults", // TODO:
  CUSTOMEDITORS: "customEditors", // TODO:
  DEBUGGERS: "debuggers", // TODO:
  GRAMMARS: "grammars", // TODO:
  ICONS: "icons", // TODO:
  ICONTHEMES: "iconThemes", // TODO:
  JSONVALIDATION: "jsonValidation", // TODO:
  KEYBINDINGS: "keybindings", // TODO:
  LANGUAGES: "languages", // TODO:
  MENUS: "menus",
  PROBLEMMATCHERS: "problemMatchers", // TODO:
  PROBLEMPATTERNS: "problemPatterns", // TODO:
  PRODUCTICONTHEMES: "productIconThemes", // TODO:
  RESOURCELABELFORMATTERS: "resourceLabelFormatters", // TODO:
  SEMANTICTOKENMODIFIERS: "semanticTokenModifiers", // TODO:
  SEMANTICTOKENSCOPES: "semanticTokenScopes", // TODO:
  SEMANTICTOKENTYPES: "semanticTokenTypes", // TODO:
  SNIPPETS: "snippets", // TODO:
  SUBMENUS: "submenus", // TODO:
  TASKDEFINITIONS: "taskDefinitions", // TODO:
  TERMINAL: "terminal", // TODO:
  THEMES: "themes", // TODO:
  TYPESCRIPTSERVERPLUGINS: "typescriptServerPlugins", // TODO:
  VIEWS: "views", // TODO:
  VIEWSCONTAINERS: "viewsContainers", // TODO:
  VIEWSWELCOME: "viewsWelcome", // TODO:
  WALKTHROUGHS: "walkthroughs", // TODO:
};

function getTablesInfo(readmeFile) {
  const tablesToInsertMatched = [
    ...readmeFile.matchAll(
      /\r?\n\[\/\/\]\: \# [\("]vscode-table-(.*)\((.*)\)[\)"]/gi
    ),
  ];

  const tablesToInsert = tablesToInsertMatched.reduce(
    (accTables, currTable) => {
      const [, contribution, columnsString] = currTable;

      const columns = columnsString
        .split("|")
        .reduce((accColumns, currColumn) => {
          const [name, alias] = currColumn.split(":");
          const columnHeader = alias || name;

          accColumns[name] = {
            columnHeader,
            values: [],
            width: columnHeader.length,
          };

          return accColumns;
        }, {});

      accTables[contribution] = {
        columns,
        index: currTable.index,
      };

      return accTables;
    },
    {}
  );

  return tablesToInsert;
}

function getContributions(packageFile) {
  const contributions = JSON.parse(packageFile).contributes;

  return contributions;
}

function propsOfPlainContribution(contributionArr) {
  return contributionArr;
}

function propsOfMenus(menus) {
  return Object.keys(menus).flatMap((menuContext) => {
    return menus[menuContext].map((menu) => ({
      ...menu,
      context: menuContext,
    }));
  });
}

function propsOfConfiguration(settings) {
  return Object.keys(settings.properties).map((property) => {
    return {
      ...settings.properties[property],
      property,
      title: settings.title,
      order: settings.order,
    };
  });
}

function propsFunctionByContribution(tableName) {
  switch (tableName) {
    case Contributions.AUTHENTICATION:
    case Contributions.BREAKPOINTS:
    case Contributions.COMMANDS:
      return propsOfPlainContribution;
    case Contributions.CONFIGURATION:
      return propsOfConfiguration;
    case Contributions.MENUS:
      return propsOfMenus;
  }
}

function getTablesWithData(packageFile, readmeFile) {
  const tables = getTablesInfo(readmeFile);

  const contributions = getContributions(packageFile);

  for (const [tableName, tableValues] of Object.entries(tables)) {
    const tableContributions = contributions[tableName];
    if (!contributions[tableName]) continue;

    const propsFunction = propsFunctionByContribution(tableName);
    const tableContributionsProps = propsFunction(tableContributions);
    for (const tableContributionsEntry of tableContributionsProps) {
      for (const [columnName, columnProps] of Object.entries(
        tableValues.columns
      )) {
        let value = tableContributionsEntry[columnName];
        if (typeof value !== "string") value = JSON.stringify(value);

        columnProps.values.push(value);
        if (value && value.length > columnProps.width) {
          columnProps.width = value.length;
        }
      }
    }
  }

  return tables;
}

function mdTable(table) {
  let tableString = "";
  let rows = Object.values(table.columns)[0].values.length + 2;
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
  return tableString;
}

function main(packagePath = "./package.json", readmePath = "./README.md") {
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
      mdTable(tableValues) +
      finalReadmeText.slice(tableEndIndex);
  }
  return tables;
}

main("./packageTest.json", "./READMETest.md");
