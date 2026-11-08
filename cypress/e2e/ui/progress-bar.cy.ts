describe("Progress Bar", () => {
  it("para antes de 25%, completa e reseta a barra", () => {
    cy.visitarDemoqa();
    cy.escolherCard("Widgets");
    cy.abrirSubmenu("Progress Bar");
    cy.iniciarEPararProgressBarAntesDe25();
    cy.validarProgressBarAte25();
    cy.completarProgressBar();
    cy.resetarProgressBar();
    cy.validarProgressBarZerada();
  });
});
