import * as dados from "../dados";
import { definirValor } from "./comum";

interface Registro {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  salary: number;
  department: string;
}

const tabela = {
  ultimoEmail: "",
  ultimoDepartamento: "",
  emails: [] as string[],
};

let emailsCriados: string[] = [];

function novoRegistro(): Registro {
  const nome = dados.firstName();
  return {
    firstName: nome,
    lastName: dados.lastName(),
    email: dados.email(nome),
    age: dados.age(),
    salary: dados.salary(),
    department: dados.department(),
  };
}

function linhaDoEmail(email: string): Cypress.Chainable<JQuery<HTMLTableRowElement>> {
  return cy.get("tr").should(($rows) => {
    const encontrada = [...$rows].some((row) => (row.textContent || "").includes(email));
    expect(encontrada, email).to.eq(true);
  }).then(($rows) => {
    const row = [...$rows].find((element) => (element.textContent || "").includes(email));
    return cy.wrap(row as HTMLTableRowElement);
  });
}

function apagarEmails(emails: string[]): Cypress.Chainable<null> {
  if (emails.length === 0) {
    tabela.emails = [];
    cy.get("body").should("contain", "cierra@example.com");
    cy.get("body").should("contain", "alden@example.com");
    cy.get("body").should("contain", "kierra@example.com");
    return cy.wrap(null);
  }
  const [email, ...resto] = emails;
  cy.get("body").then(($body) => {
    const texto = $body.text() || "";
    if (!texto.includes(email)) {
      return;
    }
    const dono = [...$body[0].querySelectorAll("*")].find(
      (element) => element.children.length === 0 && (element.textContent || "").trim() === email
    );
    const button = dono?.closest("tr")?.querySelector("[title='Delete']") as HTMLElement | undefined;
    if (!button?.id) {
      throw new Error(`Registro ${email} nao apareceu na tabela`);
    }
    cy.get(`#${button.id}`).click();
  });
  cy.get("body").should(($body) => {
    expect($body.text(), email).to.not.include(email);
  });
  return cy.then(() => apagarEmails(resto));
}

function preencherEEnviar(registro: Registro): void {
  cy.get("#addNewRecordButton").scrollIntoView().click({ force: true });
  cy.get("#firstName").should("be.visible");
  definirValor("#firstName", registro.firstName);
  definirValor("#lastName", registro.lastName);
  definirValor("#userEmail", registro.email);
  definirValor("#age", String(registro.age));
  definirValor("#salary", String(registro.salary));
  definirValor("#department", registro.department);
  cy.get("#submit").scrollIntoView().click({ force: true });
  cy.get(".modal.show").should("not.exist");
}

Cypress.Commands.add("definirTamanhoDaTabela", (tamanho: number) => {
  cy.get("select").then(($selects) => {
    const select = [...$selects].reverse().find((element) =>
      [...element.options].some((option) => option.value === String(tamanho) || option.text.includes(String(tamanho)))
    );
    if (!select) {
      throw new Error("Seletor de quantidade de linhas nao encontrado");
    }
    const option = [...select.options].find(
      (item) => item.value === String(tamanho) || item.text.includes(String(tamanho))
    );
    cy.wrap(select).select(option!.value, { force: true }).should("have.value", option!.value);
  });
  cy.contains("td", "cierra@example.com").should("exist");
});

Cypress.Commands.add("criarRegistroNaTabela", () => {
  const registro = novoRegistro();
  tabela.ultimoEmail = registro.email;
  tabela.ultimoDepartamento = registro.department;
  tabela.emails.push(registro.email);
  preencherEEnviar(registro);
  cy.get("tbody").should("contain", registro.email);
});

Cypress.Commands.add("criarVariosRegistros", (quantidade: number) => {
  tabela.emails = [];
  cy.definirTamanhoDaTabela(50);

  const criar = (restante: number): Cypress.Chainable<string[]> => {
    if (restante === 0) {
      return cy.wrap([...tabela.emails]);
    }
    const registro = novoRegistro();
    tabela.ultimoEmail = registro.email;
    tabela.ultimoDepartamento = registro.department;
    tabela.emails.push(registro.email);
    preencherEEnviar(registro);
    return cy.get("td").should(($cells) => {
      const textos = [...$cells].map((cell) => (cell.textContent || "").trim());
      expect(textos, registro.email).to.include(registro.email);
    }).then(() => criar(restante - 1));
  };

  return criar(quantidade).then((emails) => {
    emailsCriados = emails;
    cy.get("body").should(($body) => {
      const texto = $body.text() || "";
      expect(emails, "quantidade").to.have.length(quantidade);
      emails.forEach((email) => {
        expect(texto, email).to.include(email);
      });
    });
    return apagarEmails(emails);
  });
});

Cypress.Commands.add("editarUltimoRegistro", () => {
  const departamento = `Quality${dados.suffix()}`;
  tabela.ultimoDepartamento = departamento;
  linhaDoEmail(tabela.ultimoEmail).find("span[title='Edit']").scrollIntoView().click({ force: true });
  cy.get("#department").should("be.visible");
  definirValor("#department", departamento);
  cy.get("#submit").scrollIntoView().click({ force: true });
  cy.get(".modal.show").should("not.exist");
});

Cypress.Commands.add("validarRegistroEditado", () => {
  linhaDoEmail(tabela.ultimoEmail).should("contain", tabela.ultimoDepartamento);
});

Cypress.Commands.add("deletarRegistroPorEmail", (email: string) => {
  linhaDoEmail(email).find("span[title='Delete']").scrollIntoView().trigger("click");
  cy.get("tbody").should(($tbody) => {
    expect($tbody.text(), email).to.not.include(email);
  });
});

Cypress.Commands.add("deletarUltimoRegistro", () => {
  cy.deletarRegistroPorEmail(tabela.ultimoEmail);
  tabela.emails = tabela.emails.filter((email) => email !== tabela.ultimoEmail);
});

Cypress.Commands.add("deletarRegistrosCriados", () => {
  cy.get("body").should(($body) => {
    const texto = $body.text() || "";
    emailsCriados.forEach((email) => {
      expect(texto, email).to.not.include(email);
    });
    expect(texto).to.include("cierra@example.com");
  });
});
