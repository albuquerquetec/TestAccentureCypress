describe("Sortable", () => {
  it("ordena os itens da lista em ordem crescente", () => {
    cy.visitarDemoqa();
    cy.escolherCard("Interactions");
    cy.abrirSubmenu("Sortable");
    cy.ordenarListaCrescente();
    cy.validarListaCrescente();
  });
});
