// this config for jest to trans ts to js, And run test cases.
// only for trans ts files, can not for type checking.
module.exports = {
  // targets, useBuiltIns 等选项用于编译出兼容目标环境的代码
  // 其中 useBuiltIns 如果设为 "usage" Babel 会根据实际代码中使用的 ES6/ES7 代码，以及与你指定的 targets，
  // 按需引入对应的 polyfill 而无需在代码中直接引入 import '@babel/polyfill'，避免输出的包过大，同时又可以放心使用各种新语法特性。
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {browsers: ["> 1%", "last 2 versions", "not ie <= 8"]},
        useBuiltIns: "usage",
        corejs: {version: 3, proposals: true}
      }
    ],
    "@babel/react",
    "@babel/preset-typescript",
  ],
  plugins: [
    // https://blog.csdn.net/weixin_30949361/article/details/102300061
    ["@babel/plugin-transform-runtime", {corejs: {version: 3, proposals: true}}],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ]
}
