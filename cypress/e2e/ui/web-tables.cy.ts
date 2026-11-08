describe("Web Tables", () => {
  it("cria, edita e deleta um registro", () => {
    cy.visitarDemoqa();
    cy.escolherCard("Elements");
    cy.abrirSubmenu("Web Tables");
    cy.criarRegistroNaTabela();
    cy.editarUltimoRegistro();
    cy.validarRegistroEditado();
    cy.deletarUltimoRegistro();
  });

  it("cria 12 registros dinamicamente e deleta todos", () => {
    cy.visitarDemoqa();
    cy.escolherCard("Elements");
    cy.abrirSubmenu("Web Tables");
    cy.criarVariosRegistros(12);
    cy.deletarRegistrosCriados();
  });
});
