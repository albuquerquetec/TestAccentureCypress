describe("Browser Windows", () => {
  it("abre uma nova janela e valida a mensagem", () => {
    cy.visitarDemoqa();
    cy.escolherCard("Alerts, Frame & Windows");
    cy.abrirSubmenu("Browser Windows");
    cy.abrirNovaJanela();
    cy.validarMensagemDaNovaJanela("This is a sample page");
    cy.fecharNovaJanela();
  });
});
