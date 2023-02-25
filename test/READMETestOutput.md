# 🌌 Color Picker Universal 🌌

## ✅ Features

Pick and translate between multiple color formats, in any file.

Formats supported: rgb/a, hex/a, hsl/a, hwb/a, cmyk/a, and named colors.

This extension can be used through its color pickers, commands, or context menu options.

![Demo](images/demo.gif)

## ⚙ Settings

To see settings press `CTRL + ,` OR `⌘ + ,`

[//]: # "vscode-table-configuration(property:Id NEW|description:Description NEW|default:Default NEW)"

| Id NEW                             | Description NEW                                                                                                                                          | Default NEW    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| color-picker-universal.disable     | Controls if plugin is disabled                                                                                                                           | false          |
| color-picker-universal.strictAlpha | If enabled, when bulk translating color formats, if the target format includes Alpha (e.g. RGBA), alpha will be by default 1, otherwise it'll be trimmed | true           |
| color-picker-universal.formatsFrom | Formats to be detected by the extension. "\*" to translate from any format. Prepend format with "!" to exclude formats (e.g. "!named")                   | ["\*"]         |
| color-picker-universal.formatsTo   | Formats to translate into. "\*" to translate into any format. Prepend format with "!" to exclude formats (e.g. "!cmyk")                                  | ["\*","!cmyk"] |
| color-picker-universal.languages   | Languages to be detected by the extension. "\*" to detect any language. Prepend language id with "!" to exclude languages (e.g. "!markdown")             | ["\*"]         |

## ✍ Commands

To see commands press `F1` and type `Color Picker Universal`

[//]: # "vscode-table-commands(title:Name NEW|command:Command NEW)"

| Name NEW                           | Command NEW                            |
| ---------------------------------- | -------------------------------------- |
| Translate colors to another format | color-picker-universal.translateColors |

## 🗨 Editor's context menu options

To see the editor's context menu options press `right click` inside a file content's editor

[//]: # "vscode-table-menus(title:Name NEW|command:Command NEW)"

| Name NEW                           | Command NEW                            |
| ---------------------------------- | -------------------------------------- |
| Translate colors to another format | color-picker-universal.translateColors |

## 🐞 Known Issues

[#68](https://github.com/jeronimoek/color-picker-universal/issues/68) When working with **css**, **less**, **sass** and **scss** files, the color picker is duplicated due to the default Vscode color picker. Currently the only workaround is excluding these file extensions in the `color-picker-universal.languages` setting (see example value above)

![Duplicated picker in css file](images/css-duplication.png)

## 🌐 Links

[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=JeronimoEkerdt.color-picker-universal)

[Open VSX Registry](https://open-vsx.org/extension/JeronimoEkerdt/color-picker-universal)

[Github Repository](https://github.com/jeronimoek/color-picker-universal)
