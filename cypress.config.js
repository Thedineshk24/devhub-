const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    specPattern: "cypress/integration/**/*.spec.js",
  },

  component: {
    supportFile: false,
    specPattern: "cypress/integration/**/*.spec.js",
  },

  nodeVersion: "system",

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
