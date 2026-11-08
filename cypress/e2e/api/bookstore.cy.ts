describe("Book Store API", () => {
  it("cria um usuario, autoriza, aluga dois livros e lista os detalhes", () => {
    cy.criarUsuario();
    cy.gerarToken();
    cy.confirmarAutorizacao();
    cy.listarLivros();
    cy.alugarDoisLivros();
    cy.validarLivrosNoUsuario();
  });
});
