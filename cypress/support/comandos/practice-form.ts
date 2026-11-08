import * as dados from "../dados";
import { clicar, esconderAnuncios } from "./comum";

function digitar(seletor: string, valor: string): void {
  cy.get(seletor).scrollIntoView().clear({ force: true });
  cy.get(seletor).type(valor, { force: true });
}

function escolherReact(id: string, valor: string): void {
  clicar(`#${id}`);
  cy.get(`#${id} input`).type(`${valor}{enter}`, { force: true });
}

Cypress.Commands.add("preencherPracticeFormAleatorio", () => {
  const nome = dados.firstName();
  const estado = dados.stateIndex();
  esconderAnuncios();
  digitar("#firstName", nome);
  digitar("#lastName", dados.lastName());
  digitar("#userEmail", dados.email(nome));
  cy.contains("label", "Male").click({ force: true });
  digitar("#userNumber", dados.phone());
  cy.get("#dateOfBirthInput").click({ force: true });
  cy.get("#dateOfBirthInput").type("{selectall}15 Oct 1992{enter}", { force: true });
  cy.get("#subjectsInput").type("Maths{enter}", { force: true });
  cy.contains("label", "Sports").click({ force: true });
  cy.contains("label", "Reading").click({ force: true });
  digitar("#currentAddress", dados.address());
  escolherReact("state", dados.state(estado));
  escolherReact("city", dados.city(estado));
});

Cypress.Commands.add("anexarArquivoTxtNoFormulario", () => {
  cy.get("#uploadPicture").selectFile("cypress/fixtures/upload/sample.txt", { force: true });
});

Cypress.Commands.add("submeterPracticeForm", () => {
  clicar("#submit");
});

Cypress.Commands.add("validarPopupDeEnvio", () => {
  cy.get("#example-modal-sizes-title-lg").should("be.visible").and("contain", "Thanks for submitting the form");
});

Cypress.Commands.add("fecharPopupDeEnvio", () => {
  esconderAnuncios();
  cy.get("#closeLargeModal").click({ force: true });
  cy.get("body").type("{esc}", { force: true });
  cy.get("#example-modal-sizes-title-lg").should("not.exist");
});
