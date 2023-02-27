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

  it("should create a README.md file with tables", () => {
    const expectedReadmeOutputPath = "./READMEExpectedOutput.md";
    const expected = fs
      .readFileSync(path.join(__dirname, expectedReadmeOutputPath))
      .toString();

    const packagePath = "./tests/package.json";
    const readmePath = "./tests/README.md";
    const outputReadmePath = "./tests/READMEOutput.md";

    const actual = markdownVscodeContributions({
      packagePath,
      readmePath,
      outputReadmePath,
    });
    assert.equal(actual, expected);

    fs.rmSync(outputReadmePath);
  });
});
