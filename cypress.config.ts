const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");


async function setupNodeEvents(on, config) {
  // Add Cucumber preprocessor plugin
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  // Use esbuild for preprocessing
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Generate Cucumber JSON after run
  on("after:run", () => {
    const reportsDir = "cucumber-json";
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }
  });

  // Return the updated config
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    },
  },
});