module.exports = {
  extends: "./babel.base.js",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "8",
        },
        useBuiltIns: "usage",
        corejs: "3.28.0",
        modules: "commonjs",
      },
    ],
  ],
  plugins: [
    [
      "module-extension-resolver",
      {
        dstExtension: ".cjs",
      },
    ],
  ],
};
