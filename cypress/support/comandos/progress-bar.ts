import { clicar } from "./comum";

const BARRA = "#progressBar .progress-bar";

function percentual(barra: JQuery<HTMLElement>): number {
  return Number(barra.attr("aria-valuenow"));
}

function aguardar(milissegundos: number): Cypress.Chainable<void> {
  return cy.window().then((win) => {
    return new Cypress.Promise<void>((resolve) => {
      win.setTimeout(() => resolve(), milissegundos);
    });
  });
}

Cypress.Commands.add("iniciarEPararProgressBarAntesDe25", () => {
  clicar("#startStopButton");
  cy.document().then((doc) => {
    const view = doc.defaultView;
    const barra = doc.querySelector(BARRA);
    const botao = doc.querySelector("#startStopButton") as HTMLButtonElement | null;
    if (!view || !barra || !botao) {
      throw new Error("Progress bar nao encontrada");
    }

    return new Cypress.Promise<number>((resolve, reject) => {
      const limite = Date.now() + 8000;
      const parar = () => {
        const valor = Number(barra.getAttribute("aria-valuenow"));
        if (valor > 0 && valor <= 25) {
          observar.disconnect();
          view.clearInterval(vigia);
          botao.click();
          resolve(valor);
          return;
        }
        if (valor > 25 || Date.now() > limite) {
          observar.disconnect();
          view.clearInterval(vigia);
          reject(new Error(`A barra passou de 25%. Valor: ${valor}`));
        }
      };
      const observar = new view.MutationObserver(parar);
      observar.observe(barra, { attributes: true, attributeFilter: ["aria-valuenow"] });
      const vigia = view.setInterval(parar, 15);
    });
  });
  cy.get("#startStopButton").should(($botao) => {
    expect($botao.text().trim().toLowerCase()).to.eq("start");
  });
});

Cypress.Commands.add("validarProgressBarAte25", () => {
  cy.get(BARRA).should(($barra) => {
    const valor = percentual($barra);
    expect(valor).to.be.greaterThan(0);
    expect(valor).to.be.lte(25);
  });
});

Cypress.Commands.add("completarProgressBar", () => {
  cy.get("#startStopButton").then(($botao) => {
    if ($botao.text().trim().toLowerCase() === "start") {
      cy.wrap($botao).click({ force: true });
    }
  });
  cy.get(BARRA, { timeout: 20000 }).should(($barra) => {
    expect(percentual($barra)).to.eq(100);
  });
  // O intervalo da pagina so e encerrado no tick seguinte aos 100.
  aguardar(400);
  cy.get(BARRA).should(($barra) => {
    expect(percentual($barra)).to.eq(100);
  });
});

Cypress.Commands.add("resetarProgressBar", () => {
  cy.get("#resetButton").should("be.visible").click({ force: true });
});

Cypress.Commands.add("validarProgressBarZerada", () => {
  cy.get(BARRA, { timeout: 5000 }).should(($barra) => {
    expect(percentual($barra)).to.eq(0);
  });
  cy.get("#startStopButton").should(($botao) => {
    expect($botao.text().trim().toLowerCase()).to.eq("start");
  });
  aguardar(400);
  cy.get(BARRA).should(($barra) => {
    expect(percentual($barra)).to.eq(0);
  });
});
