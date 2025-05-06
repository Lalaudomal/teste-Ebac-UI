/// <reference types="cypress"/> 

describe('funcionalidade: produtos', () => {
    
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('deve selecionar um produto da lista', () => {
        cy.get('.product-block').eq(5).click()
        cy.get('#tab-description > :nth-child(2)').should('exist')
    });
});