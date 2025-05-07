/// <reference types="cypress"/>

import produtosPage from "../../support/page-objects/produtos.page";

describe("funcionalidade: produtos", () => {
  beforeEach(() => {
    produtosPage.visitarUrl();
  });

  it("deve selecionar um produto da lista", () => {
    produtosPage.buscarProdutoLista("Abominable Hoodie");
    cy.get("#tab-description > :nth-child(2)").should("exist");
  });

  it("deve buscar um produto com sucesso", () => {
    produtosPage.buscarProduto("Aero Daily Fitness Tee");
    cy.get(".product_title").should("exist");
  });

  it("deve visitar a pagina do produto", () => {
    produtosPage.visitarProduto("Zeppelin Yoga Pant");
    cy.get(".product_title").should("exist");
  });

  it("deve adicionar produto ao carrinho", () => {
    let qtd = 7;
    produtosPage.buscarProduto("Abominable Hoodie");
    produtosPage.adicionarProdutoCarrinho("M", "Green", qtd);
    cy.get(".woocommerce-message").should(
      "contain",
      qtd + " × “Abominable Hoodie” foram adicionados no seu carrinho."
    );
  });

  it.only("deve adicionar produto ao carrinho buscando da massa de dados", () => {
    cy.fixture("produtos").then((dados) => {
      produtosPage.buscarProduto(dados[0].nomeProduto);
      produtosPage.adicionarProdutoCarrinho(
        dados[0].tamanho,
        dados[0].cor,
        dados[0].quantidade
      );
      cy.get(".woocommerce-message").should(
        "contain",
        dados[0].nomeProduto
      );
    });
  });
});
