describe("Practice Form", () => {
  it("preenche o formulario, envia um txt e fecha o popup", () => {
    cy.visitarDemoqa();
    cy.escolherCard("Forms");
    cy.abrirSubmenu("Practice Form");
    cy.preencherPracticeFormAleatorio();
    cy.anexarArquivoTxtNoFormulario();
    cy.submeterPracticeForm();
    cy.validarPopupDeEnvio();
    cy.fecharPopupDeEnvio();
  });
});
