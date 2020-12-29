module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parse: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  plugin: ["prettier"],
  rules: {
    "no-console": "off",
  },
};
