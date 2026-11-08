import { clicar } from "./comum";

Cypress.Commands.add("abrirNovaJanela", () => {
  cy.window().then((win) => {
    cy.stub(win, "open").as("novaJanela");
  });
  clicar("#windowButton");
  cy.get("@novaJanela").should("be.called");
  cy.visit("/sample");
});

Cypress.Commands.add("validarMensagemDaNovaJanela", (mensagem: string) => {
  cy.get("#sampleHeading").should("be.visible").and("have.text", mensagem);
});

Cypress.Commands.add("fecharNovaJanela", () => {
  cy.go("back");
  cy.get("#windowButton").should("be.visible");
});
