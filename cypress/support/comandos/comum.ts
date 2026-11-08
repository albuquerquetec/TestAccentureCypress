export function esconderAnuncios(): void {
  cy.document().then((doc) => {
    doc
      .querySelectorAll("#fixedban, footer, iframe[id^='google_ads'], iframe[src*='googlesyndication'], .Advertisement-Section")
      .forEach((element) => {
        (element as HTMLElement).style.setProperty("display", "none", "important");
      });
  });
}

export function clicar(seletor: string): void {
  esconderAnuncios();
  cy.get(seletor).scrollIntoView().click({ force: true });
}

export function definirValor(seletor: string, valor: string): void {
  cy.get(seletor).then(($element) => {
    const input = $element[0] as HTMLInputElement;
    const prototype = input.ownerDocument.defaultView?.HTMLInputElement.prototype;
    const setter = prototype && Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    if (!setter) {
      throw new Error(`Nao foi possivel preencher ${seletor}`);
    }
    setter.call(input, valor);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
