/// <reference types="cypress"/> 
import {fa, faker } from '@faker-js/faker';


describe('funcionalidade: cadastro', () => {

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it('deve completar o cadastro com sucesso ', () => {
        cy.get('#reg_email').type(faker.internet.email())
        cy.get('#reg_password').type(faker.internet.password())
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(faker.person.firstName())
        cy.get('#account_last_name').type(faker.person.lastName())
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('exist')
    });

    it('deve completar o cadastro com sucesso - usando variaveis', () => {
       
        var email = faker.internet.email()
        var nome = faker.person.firstName()
        var sobrenome = faker.person.lastName()
        
        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type(faker.internet.password())
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobrenome)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('exist')
    });
    
    it('deve completar o cadastro com sucesso - usando comandos customizados', () => {
        cy.preCadastro(faker.internet.email(), '12345', faker.person.firstName(), faker.person.lastName())        
        cy.get('.woocommerce-message').should('exist')
    });
});