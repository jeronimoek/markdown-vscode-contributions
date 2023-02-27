import { Table } from "./index";
import { Contributions } from "./enums";

function flattenObject(obj: Record<string, any>) {
  const flattened: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
}

function propsNestedObject(contributionArr: Record<string, any>[]) {
  return contributionArr.map((contribution) => flattenObject(contribution));
}

function propsPlain(contributionArr: any[]) {
  return contributionArr;
}

function propsWithAreas(contributions: Record<string, any>) {
  return Object.keys(contributions).flatMap((area) => {
    return contributions[area].map((contribution: Record<string, any>) => ({
      ...contribution,
      area,
    }));
  });
}

function propsConfiguration(settings: Record<string, any>) {
  return Object.keys(settings.properties).map((property) => {
    return {
      ...settings.properties[property],
      property,
      title: settings.title,
      order: settings.order,
    };
  });
}

function propsDebuggers(debuggers: Record<string, any>[]) {
  return debuggers.map((currentDebugger) => ({
    ...currentDebugger,
    unverifiedBreakpoints: currentDebugger.strings?.unverifiedBreakpoints,
    linuxRuntime: currentDebugger.linux?.runtime,
    osxRuntime: currentDebugger.osx?.runtime,
    windowsRuntime: currentDebugger.windows?.runtime,
  }));
}

function propsDocumentation(documentation: {
  refactoring: Record<string, any>[];
}) {
  return documentation.refactoring;
}

function propsIcons(icons: Record<string, any>) {
  return Object.keys(icons).map((iconId) => {
    return {
      ...flattenObject(icons[iconId]),
      iconId,
    };
  });
}

function propsFlatObjectOrObjectArray(
  contributionArr: Record<string, any> | Record<string, any>[]
) {
  return [contributionArr].flat();
}

// TODO: missing "quickFixes" data
function propsTerminalProfiles(terminal: Record<string, any>) {
  return terminal.profiles.map((profile: Record<string, any>) =>
    flattenObject(profile)
  );
}

function propsSemanticTokenScopes(semanticTokenScopes: Record<string, any>[]) {
  return semanticTokenScopes
    .map((semanticTokenScope) => {
      const { language, scopes } = semanticTokenScope;
      return Object.keys(scopes).map((scope) => {
        return scopes[scope].map((fallbackScope: string) => ({
          language,
          scope,
          fallbackScope,
        }));
      });
    })
    .flat(3);
}

function propsProblemMatchers(problemMatchers: Record<string, any>[]) {
  return problemMatchers.map((problemMatcher) => ({
    ...problemMatcher,
    activeOnStart: problemMatcher.background?.activeOnStart,
    beginsPatternFile: problemMatcher.background?.beginsPattern?.file,
    beginsPatternRegexp: problemMatcher.background?.beginsPattern?.regexp,
    endsPatternFile: problemMatcher.background?.endsPattern?.file,
    endsPatternRegexp: problemMatcher.background?.endsPattern?.regexp,
    ...problemMatcher.pattern,
  }));
}

function propsArray(contributions: any[]) {
  return contributions.map((contribution) => ({ data: contribution }));
}

function propsConfigurationDefaults(
  configurationDefaults: Record<string, any>
) {
  return Object.keys(configurationDefaults).map((key) => {
    if (key.startsWith("[") && key.endsWith("]")) {
      const languageConfigurationDefaults = configurationDefaults[key];
      return Object.keys(languageConfigurationDefaults).map(
        (configurationDefault) => ({
          language: key,
          configurationDefault,
          configurationDefaultValue:
            languageConfigurationDefaults[configurationDefault],
        })
      );
    } else {
      return {
        configurationDefault: key,
        configurationDefaultValue: configurationDefaults[key],
      };
    }
  });
}

function propsFunctionByContribution(tableName: string) {
  switch (tableName) {
    case Contributions.CONFIGURATION:
      return propsConfiguration;
    case Contributions.DEBUGGERS:
      return propsDebuggers;
    case Contributions.DOCUMENTATION:
      return propsDocumentation;
    case Contributions.ICONS:
      return propsIcons;
    case Contributions.TERMINALPROFILES:
      return propsTerminalProfiles;
    case Contributions.SEMANTICTOKENSCOPES:
      return propsSemanticTokenScopes;
    case Contributions.PROBLEMMATCHERS:
      return propsProblemMatchers;
    case Contributions.CONFIGURATIONDEFAULTS:
      return propsConfigurationDefaults;
    case Contributions.CSSCUSTOMDATA:
    case Contributions.HTMLCUSTOMDATA:
    case Contributions.MARKDOWNPREVIEWSCRIPTS:
    case Contributions.MARKDOWNPREVIEWSTYLES:
      return propsArray;
    case Contributions.MENUS:
    case Contributions.VIEWS:
    case Contributions.VIEWSCONTAINERS:
      return propsWithAreas;
    case Contributions.COMMANDS:
    case Contributions.KEYBINDINGS:
      return propsFlatObjectOrObjectArray;
    case Contributions.CODEACTIONS:
    case Contributions.COLORS:
    case Contributions.LANGUAGES:
    case Contributions.RESOURCELABELFORMATTERS:
    case Contributions.SUBMENUS:
      return propsNestedObject;
    case Contributions.AUTHENTICATION:
    case Contributions.BREAKPOINTS:
    case Contributions.CONTINUEEDITSESSION:
    case Contributions.CUSTOMEDITORS:
    case Contributions.GRAMMARS:
    case Contributions.HTMLLANGUAGEPARTICIPANTS:
    case Contributions.ICONTHEMES:
    case Contributions.JSONVALIDATION:
    case Contributions.LOCALIZATIONS:
    case Contributions.NOTEBOOKPRELOAD:
    case Contributions.NOTEBOOKRENDERER:
    case Contributions.NOTEBOOKS:
    case Contributions.PROBLEMPATTERNS:
    case Contributions.PRODUCTICONTHEMES:
    case Contributions.SEMANTICTOKENMODIFIERS:
    case Contributions.SEMANTICTOKENTYPES:
    case Contributions.SNIPPETS:
    case Contributions.TASKDEFINITIONS: // TODO: could improve "properties" and "required" data
    case Contributions.THEMES:
    case Contributions.TYPESCRIPTSERVERPLUGINS:
    case Contributions.VIEWSWELCOME:
    case Contributions.WALKTHROUGHS:
    default:
      return propsPlain;
  }
}

function getContributions(packageFile: string) {
  const contributions = JSON.parse(packageFile).contributes;

  return contributions;
}

function escapeMarkdown(str = "") {
  return str.replaceAll(/([*_])/gi, "\\$1");
}

function getTablesInfo(readmeFile: string) {
  const tablesToInsertMatched = [
    ...readmeFile.matchAll(
      /(?<=\r?\n|^)\[\/\/\]: # [("]vscode-table-(.+)\((.+)\)[)"]\r?\n/gi
    ),
  ];

  const tablesToInsert = tablesToInsertMatched.reduce(
    (accTables: Table[], currTable) => {
      const [match, contribution, columnsString] = currTable;

      const columns = columnsString
        .split("|")
        .reduce((accColumns: Table["columns"], currColumn: string) => {
          const [name, alias] = currColumn.split(":");
          const columnHeader = alias || name;

          accColumns[name] = {
            columnHeader,
            values: [],
            width: columnHeader.length,
          };

          return accColumns;
        }, {});

      accTables.push({
        contribution,
        columns,
        index: currTable.index || 0,
        endIndex: (currTable.index || 0) + match.length,
      });

      return accTables;
    },
    []
  );

  return tablesToInsert;
}

export function getTablesWithData(packageFile: string, readmeFile: string) {
  const tables = getTablesInfo(readmeFile);

  const contributions = getContributions(packageFile);
  if (!contributions)
    throw new Error("Missing contributions property in package");

  for (const table of tables) {
    const contribution = contributions[table.contribution];
    if (!contribution) continue;

    const propsFunction = propsFunctionByContribution(table.contribution);
    const contributionProps = propsFunction(contribution);
    for (const contributionEntry of contributionProps) {
      for (const [columnName, columnProps] of Object.entries(table.columns)) {
        let value = contributionEntry[columnName];
        if (typeof value !== "string") value = JSON.stringify(value);

        value = escapeMarkdown(value);

        columnProps.values.push(value);
        if (value && value.length > columnProps.width) {
          columnProps.width = value.length;
        }
      }
    }
  }

  return tables;
}
