[//]: # "vscode-table-configuration(property:Id NEW|description:Description NEW|default:Default NEW)"

| Id                                 | Description                                                                                                                                                | Default         | Available values                                                                                            | Example                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| color-picker-universal.disable     | Controls if plugin is disabled                                                                                                                             | false           | true false                                                                                                  | true                                      |
| color-picker-universal.strictAlpha | If enabled, when bulk translating color formats, if the target format includes Alpha (e.g. RGBA), alpha will be by default 1, otherwise it will be trimmed | true            | true false                                                                                                  | false                                     |
| color-picker-universal.languages   | Enabled language identifiers. Use "!" to exclude languages                                                                                                 | ["\*"]          | [Default identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers) | ["\*", "!css", "!less", "!sass", "!scss"] |
| color-picker-universal.formatsFrom | Enabled formats to translate from. Use "!" to exclude formats                                                                                              | ["\*"]          | "\*" "cmyk" "hex" "hsl" "hwb" "named" "rgb"                                                                 | ["*", "!named"]                           |
| color-picker-universal.formatsTo   | Enabled formats to translate into. Use "!" to exclude formats                                                                                              | ["\*", "!cmyk"] | "\*" "cmyk" "hex" "hsl" "hwb" "named" "rgb"                                                                 | ["*", "!cmyk", "!hwb"]                    |

[//]: # "vscode-table-commands(title:Name NEW|command:Command NEW)"

| Name                               | Command                       |
| ---------------------------------- | ----------------------------- |
| Translate colors to another format | Bulk color format translation |

[//]: # "vscode-table-menus(title:Name NEW|command:Command NEW)"

| Name                               | Command                       |
| ---------------------------------- | ----------------------------- |
| Translate colors to another format | Bulk color format translation |

[//]: # "vscode-table-authentication(id|label)"
[//]: # "vscode-table-breakpoints(language|when)"
[//]: # "vscode-table-codeActions(description|kind|title|languages)"
[//]: # "vscode-table-colors(dark|highContrast|highContrastLight|light|description|id)"
[//]: # "vscode-table-configuration(title|order|property|$comment|$id|$ref|$schema|additionalItems|additionalProperties|allOf|anyOf|const|contains|contentEncoding|contentMediaType|default|definitions|dependencies|deprecationMessage|description|editPresentation|else|enum|enumDescriptions|enumItemLabels|examples|exclusiveMaximum|exclusiveMinimum|format|if|ignoreSync|items|markdownDeprecationMessage|markdownDescription|markdownEnumDescriptions|maximum|maxItems|maxLength|maxProperties|minimum|minItems|minLength|minProperties|multipleOf|not|oneOf|order|pattern|patternProperties|properties|propertyNames|readOnly|required|scope|then|title|type|uniqueItems)"

[//]: # "vscode-table-configurationDefaults(language|configurationDefault|configurationDefaultValue)"
[//]: # "vscode-table-commands(category|command|enablement|dark|light|shortTitle|title)"



[//]: # "vscode-table-continueEditSession(command|description|group|qualifiedName|remoteGroup|when)"
[//]: # "vscode-table-css.customData(data)"
[//]: # "vscode-table-customEditors(viewType|displayName|priority|selector)"
[//]: # "vscode-table-debuggers(args|configurationAttributes|configurationSnippets|deprecated|initialConfigurations|label|languages|linux|osx|program|runtime|runtimeArgs|strings|type|variables|when|windows|unverifiedBreakpoints|linuxRuntime|osxRuntime|windowsRuntime)"
[//]: # "vscode-table-documentation(command|title|when)"
[//]: # "vscode-table-grammars(language|scopeName|path|balancedBracketScopes|embeddedLanguages|injectTo|tokenTypes|unbalancedBracketScopes)"
[//]: # "vscode-table-html.customData(data)"
[//]: # "vscode-table-htmlLanguageParticipants(autoInsert|languageId)"
[//]: # "vscode-table-icons(iconId|description|fontPath|fontCharacter)"
[//]: # "vscode-table-iconThemes(id|label|path)"
[//]: # "vscode-table-jsonValidation(fileMatch|url)"
[//]: # "vscode-table-keybindings(command|key|args|linux|mac|when|win)"
[//]: # "vscode-table-languages(id|aliases|extensions|configuration|filenamePatterns|filenames|firstLine|dark|light|mimetypes)"
[//]: # "vscode-table-localizations(languageId|languageName|localizedLanguageName|translations)"
[//]: # "vscode-table-markdown.markdownItPlugins()"
[//]: # "vscode-table-markdown.previewScripts(data)"
[//]: # "vscode-table-markdown.previewStyles(data)"
[//]: # "vscode-table-menus(area|command|title|alt|group|when)"






[//]: # "vscode-table-notebookPreload(type|entrypoint)"
[//]: # "vscode-table-notebookRenderer(id|displayName|mimeTypes|entrypoint|dependencies|optionalDependencies|requiresMessaging)"
[//]: # "vscode-table-notebooks(type|displayName|selector|priority)"
[//]: # "vscode-table-problemMatchers(applyTo|background|base|fileLocation|label|name|owner|pattern|regexp|file|location|message|code|column|endColumn|endLine|kind|line|loop|severity|severity|source|activeOnStart|beginsPatternFile|beginsPatternRegexp|endsPatternFile|endsPatternRegexp)"
[//]: # "vscode-table-problemPatterns(regexp|file|location|message|code|column|endColumn|endLine|kind|line|loop|name|severity)"
[//]: # "vscode-table-productIconThemes(id|label|path)"
[//]: # "vscode-table-remoteHelp()"
[//]: # "vscode-table-resourceLabelFormatters(authority|label|separator|stripPathStartingSeparator|tildify|workspaceSuffix|scheme)"
[//]: # "vscode-table-semanticTokenModifiers(description|id)"
[//]: # "vscode-table-semanticTokenScopes(language|scope|fallbackScope)"
[//]: # "vscode-table-semanticTokenTypes(description|id|superType)"
[//]: # "vscode-table-snippets(language|path)"
[//]: # "vscode-table-submenus(dark|light|id|label)"
[//]: # "vscode-table-taskDefinitions(properties|required|type|when)"
[//]: # "vscode-table-terminal(id|title|dark|light)"
[//]: # "vscode-table-themes(label|id|uiTheme|path)"
[//]: # "vscode-table-typescriptServerPlugins(label|id|uiTheme|path|enableForWorkspaceTypeScriptVersions|name)"
[//]: # "vscode-table-views(area|id|name|contextualTitle|icon|initialSize|type|visibility|when)"
[//]: # "vscode-table-viewsContainers(area|icon|id|title)"
[//]: # "vscode-table-viewsWelcome(contents|enablement|group|view|when)"
[//]: # "vscode-table-walkthroughs(id|title|description|steps|featuredFor|icon|when)"
