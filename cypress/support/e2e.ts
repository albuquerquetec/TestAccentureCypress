import "./commands";

Cypress.on("uncaught:exception", () => false);

beforeEach(() => {
  cy.intercept("GET", /googlesyndication|doubleclick|google-analytics|googletagmanager|adservice/, {
    statusCode: 204,
    body: "",
  });
});
