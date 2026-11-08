import { clicar, esconderAnuncios } from "./comum";

const CRESCENTE = ["One", "Two", "Three", "Four", "Five", "Six"];

function item(texto: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.contains("#demo-tabpane-list .list-group-item", new RegExp(`^${texto}$`));
}

function ordem(): Cypress.Chainable<string[]> {
  return cy.get("#demo-tabpane-list .list-group-item").then(($items) =>
    Cypress.$.makeArray($items)
      .map((element) => (element.textContent || "").trim())
      .filter((texto) => texto.length > 0)
  );
}

function igual(esquerda: string[], direita: string[]): boolean {
  return esquerda.length === direita.length && esquerda.every((valor, indice) => valor === direita[indice]);
}

function arrastarAntes(origem: string, destino: string): void {
  item(origem).then(($origem) => {
    item(destino).then(($destino) => {
      cy.window().then((win) => {
        const dataTransfer = new win.DataTransfer();
        const disparar = (element: Element, type: string) => {
          element.dispatchEvent(new win.DragEvent(type, { bubbles: true, cancelable: true, dataTransfer }));
        };
        disparar($origem[0], "dragstart");
        disparar($destino[0], "dragenter");
        disparar($destino[0], "dragover");
        disparar($destino[0], "drop");
        disparar($origem[0], "dragend");
      });
    });
  });
}

function colocarCadaItem(tentativa = 0): void {
  if (tentativa >= 8) {
    return;
  }
  ordem().then((atual) => {
    if (igual(atual, CRESCENTE)) {
      return;
    }
    for (let indice = 0; indice < CRESCENTE.length; indice += 1) {
      const esperado = CRESCENTE[indice];
      if (atual.indexOf(esperado) !== indice) {
        arrastarAntes(esperado, atual[indice]);
        colocarCadaItem(tentativa + 1);
        return;
      }
    }
  });
}

Cypress.Commands.add("ordenarListaCrescente", () => {
  clicar("#demo-tab-list");
  esconderAnuncios();
  ordem().then((atual) => {
    if (igual(atual, CRESCENTE)) {
      arrastarAntes("Six", "One");
    }
  });
  colocarCadaItem();
});

Cypress.Commands.add("validarListaCrescente", () => {
  ordem().should("deep.equal", CRESCENTE);
});
