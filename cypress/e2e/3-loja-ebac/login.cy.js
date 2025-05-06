/// <reference types="cypress"/>
const { da } = require("@faker-js/faker");
const perfil = require("../../fixtures/perfil.json");

describe("funcionalidade: login", () => {
  beforeEach(() => {
    cy.visit("minha-conta");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("deve fazer login com sucesso", () => {
    cy.get("#username").type("admin30");
    cy.get("#password").type("12345");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, admin30 (não é admin30? Sair)"
    );
  });

  it("deve exibir uma mensagem de erro ao inserir usuario invalido", () => {
    cy.get("#username").type("admin300");
    cy.get("#password").type("12345");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-error").should(
      "contain",
      "Erro: O usuário admin300 não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail."
    );
  });

  it("deve exibir uma mensagem de erro ao inserir senha invalido", () => {
    cy.get("#username").type("admin30");
    cy.get("#password").type("12355");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-error").should(
      "contain",
      "Erro: A senha informada para o usuário admin30 está incorreta. Perdeu a senha?"
    );
  });

  it("deve fazer login com sucesso - usando massa de dados", () => {
    cy.get("#username").type(perfil.usuario);
    cy.get("#password").type(perfil.senha);
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, admin30 (não é admin30? Sair)"
    );
  });

  it("deve fazer login com sucesso - usando fixture", () => {
    cy.fixture("perfil").then((dados) => {
      cy.get("#username").type(dados.usuario);
      cy.get("#password").type(dados.senha, { log: false});
      cy.get(".woocommerce-form > .button").click();

      cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
        "contain",
        "Olá, admin30 (não é admin30? Sair)"
      );
    });
  });
});
