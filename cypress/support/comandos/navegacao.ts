import { esconderAnuncios } from "./comum";

Cypress.Commands.add("visitarDemoqa", () => {
  cy.visit("/");
  esconderAnuncios();
});

Cypress.Commands.add("escolherCard", (nome: string) => {
  esconderAnuncios();
  cy.contains("h5", nome).scrollIntoView().click({ force: true });
  esconderAnuncios();
});

Cypress.Commands.add("abrirSubmenu", (nome: string) => {
  esconderAnuncios();
  cy.contains("span", nome).scrollIntoView().click({ force: true });
  esconderAnuncios();
});
