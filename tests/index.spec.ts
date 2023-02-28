import fs from "fs";
import "mocha";
import { assert } from "chai";

import { markdownVscodeContributions } from "../src/index";
import npmPackage from "../src/index";
import path from "path";

describe("NPM Package", () => {
  it("should be an object", () => {
    assert.isObject(npmPackage);
  });

  it("should have a markdownVscodeContributions property", () => {
    assert.property(npmPackage, "markdownVscodeContributions");
  });
});

describe("Markdown Vscode Contributions Function", () => {
  it("should be a function", () => {
    assert.isFunction(markdownVscodeContributions);
  });

  const expectedPath = "./expected.md";
  const expected = fs
    .readFileSync(path.join(__dirname, expectedPath))
    .toString();

  const packagePath = "./tests/package.json";
  const outputPath = "./tests/output.md";

  const files = fs
    .readdirSync("./tests")
    .filter((fn) => fn.startsWith("input-"));
  files.forEach((file) => {
    const inputPath = path.join("./tests", file);
    const actual = markdownVscodeContributions({
      packagePath,
      inputPath,
      outputPath,
    });
    it(`should create ${path.basename(outputPath)} from ${path.basename(
      inputPath
    )} matching ${path.basename(expectedPath)}`, () => {
      assert.equal(actual, expected);
    });
  });

  it("should update the output.md file without changes", () => {
    const expectedOutputPath = "./expected.md";
    const expected = fs
      .readFileSync(path.join(__dirname, expectedOutputPath))
      .toString();

    const packagePath = "./tests/package.json";
    const inputPath = "./tests/output.md";

    const actual = markdownVscodeContributions({
      packagePath,
      inputPath,
    });
    assert.equal(actual, expected);

    fs.rmSync(inputPath);
  });
});
