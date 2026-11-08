import "./comandos/navegacao";
import "./comandos/practice-form";
import "./comandos/browser-windows";
import "./comandos/web-tables";
import "./comandos/progress-bar";
import "./comandos/sortable";
import "./comandos/bookstore";

declare global {
  namespace Cypress {
    interface Chainable {
      visitarDemoqa(): Chainable<void>;
      escolherCard(nome: string): Chainable<void>;
      abrirSubmenu(nome: string): Chainable<void>;
      preencherPracticeFormAleatorio(): Chainable<void>;
      anexarArquivoTxtNoFormulario(): Chainable<void>;
      submeterPracticeForm(): Chainable<void>;
      validarPopupDeEnvio(): Chainable<void>;
      fecharPopupDeEnvio(): Chainable<void>;
      abrirNovaJanela(): Chainable<void>;
      validarMensagemDaNovaJanela(mensagem: string): Chainable<void>;
      fecharNovaJanela(): Chainable<void>;
      definirTamanhoDaTabela(tamanho: number): Chainable<void>;
      criarRegistroNaTabela(): Chainable<void>;
      criarVariosRegistros(quantidade: number): Chainable<string[]>;
      editarUltimoRegistro(): Chainable<void>;
      validarRegistroEditado(): Chainable<void>;
      deletarRegistroPorEmail(email: string): Chainable<void>;
      deletarUltimoRegistro(): Chainable<void>;
      deletarRegistrosCriados(): Chainable<null>;
      iniciarEPararProgressBarAntesDe25(): Chainable<void>;
      validarProgressBarAte25(): Chainable<void>;
      completarProgressBar(): Chainable<void>;
      resetarProgressBar(): Chainable<void>;
      validarProgressBarZerada(): Chainable<void>;
      ordenarListaCrescente(): Chainable<void>;
      validarListaCrescente(): Chainable<void>;
      criarUsuario(): Chainable<void>;
      gerarToken(): Chainable<void>;
      confirmarAutorizacao(): Chainable<void>;
      listarLivros(): Chainable<void>;
      alugarDoisLivros(): Chainable<void>;
      validarLivrosNoUsuario(): Chainable<void>;
    }
  }
}

export {};
