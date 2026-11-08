import * as dados from "../dados";

interface Usuario {
  userID?: string;
  userId?: string;
  books?: { isbn: string }[];
}

const api = {
  userName: "",
  password: "",
  userId: "",
  token: "",
  isbns: [] as string[],
};

Cypress.Commands.add("criarUsuario", () => {
  api.userName = dados.uniqueUserName();
  api.password = dados.strongPassword();
  cy.request<Usuario>({
    method: "POST",
    url: "/Account/v1/User",
    body: { userName: api.userName, password: api.password },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status, JSON.stringify(response.body)).to.eq(201);
    api.userId = response.body.userID || response.body.userId || "";
    expect(api.userId).to.not.equal("");
  });
});

Cypress.Commands.add("gerarToken", () => {
  cy.request<{ token: string; status: string }>({
    method: "POST",
    url: "/Account/v1/GenerateToken",
    body: { userName: api.userName, password: api.password },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status, JSON.stringify(response.body)).to.eq(200);
    expect(response.body.status).to.eq("Success");
    api.token = response.body.token;
    expect(api.token).to.not.equal("");
  });
});

Cypress.Commands.add("confirmarAutorizacao", () => {
  cy.request<boolean>({
    method: "POST",
    url: "/Account/v1/Authorized",
    body: { userName: api.userName, password: api.password },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.eq(true);
  });
});

Cypress.Commands.add("listarLivros", () => {
  cy.request<{ books: { isbn: string }[] }>({
    method: "GET",
    url: "/BookStore/v1/Books",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    api.isbns = response.body.books.map((book) => book.isbn).filter((isbn) => isbn.length > 0);
    expect(api.isbns.length).to.be.greaterThan(1);
  });
});

Cypress.Commands.add("alugarDoisLivros", () => {
  const escolhidos = api.isbns.slice(0, 2);
  cy.request({
    method: "POST",
    url: "/BookStore/v1/Books",
    headers: { Authorization: `Bearer ${api.token}` },
    body: {
      userId: api.userId,
      collectionOfIsbns: escolhidos.map((isbn) => ({ isbn })),
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status, JSON.stringify(response.body)).to.eq(201);
    api.isbns = escolhidos;
  });
});

Cypress.Commands.add("validarLivrosNoUsuario", () => {
  cy.request<Usuario>({
    method: "GET",
    url: `/Account/v1/User/${api.userId}`,
    headers: { Authorization: `Bearer ${api.token}` },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status, JSON.stringify(response.body)).to.eq(200);
    const reservados = (response.body.books || []).map((book) => book.isbn);
    api.isbns.forEach((isbn) => {
      expect(reservados, isbn).to.include(isbn);
    });
  });
});
