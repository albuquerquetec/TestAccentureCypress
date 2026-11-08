import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://demoqa.com",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    chromeWebSecurity: false,
    viewportWidth: 1366,
    viewportHeight: 900,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
    video: Boolean(process.env.CI),
    screenshotOnRunFailure: true,
    retries: {
      runMode: process.env.CI ? 1 : 0,
      openMode: 0,
    },
  },
});
