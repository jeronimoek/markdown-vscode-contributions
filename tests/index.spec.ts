import fs from "fs";

import { markdownVscodeContributions } from "../dist/cjs/index";
import npmPackage from "../dist/cjs/index";
import path from "path";
import stringWidth from "string-width";

describe("NPM Package", () => {
  it("should be an object", () => {
    expect(npmPackage).toBeObject();
  });

  it("should have a markdownVscodeContributions property", () => {
    expect(npmPackage).toHaveProperty("markdownVscodeContributions");
  });
});

describe("Markdown Vscode Contributions Function", () => {
  it("should be a function", () => {
    expect(markdownVscodeContributions).toBeFunction();
  });

  const expectedPath = "./tests/generation/expected.md";
  const expected = fs.readFileSync(expectedPath).toString();

  const packagePath = "./tests/test-package.json";
  const outputPath = "./tests/generation/output.md";

  const files = fs
    .readdirSync("./tests/generation")
    .filter((fn) => fn.startsWith("input-"));
  files.forEach((file) => {
    const inputPath = path.join("./tests/generation", file);
    const actual = markdownVscodeContributions({
      packagePath,
      inputPath,
      outputPath,
    });
    it(`should create ${path.basename(outputPath)} from ${path.basename(
      inputPath
    )} matching ${path.basename(expectedPath)}`, () => {
      expect(actual).toEqual(expected);
    });
  });

  it("should update the output.md file without changes", () => {
    const expectedOutputPath = "./generation/expected.md";
    const expected = fs
      .readFileSync(path.join(__dirname, expectedOutputPath))
      .toString();

    const packagePath = "./tests/test-package.json";
    const inputPath = "./tests/generation/output.md";

    const actual = markdownVscodeContributions({
      packagePath,
      inputPath,
    });
    expect(actual).toEqual(expected);

    fs.rmSync(inputPath);
  });

  it("should output columns with emojis matching width", () => {
    const packagePath = "./tests/test-package.json";
    const inputPath = "./tests/emojis/input.md";
    const outputPath = "./tests/emojis/output.md";

    const output: string = markdownVscodeContributions({
      packagePath,
      inputPath,
      outputPath,
    });

    const lines = output
      .split(/\r?\n/)
      .slice(1)
      .filter((line) => line.length > 0);
    lines.forEach((line) => {
      expect(stringWidth(line)).toEqual(stringWidth(lines[0]));
    });

    fs.rmSync(outputPath);
  });
});
