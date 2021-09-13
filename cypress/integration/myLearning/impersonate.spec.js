/// <reference types="cypress" />
import 'cypress-iframe';

describe('OTP Custom Diet and Training Web Purchases', () => {
    beforeEach(() => {
        // cy.fixture('newClientRecord').as('clientData');
        cy.fixture('loginData').as('loginData');
        cy.fixture('testBoostOrder').as('testBoost')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    const myCtr = '26';
    const dateS = '0909';
    const clName = 'cyTest'

    it('can impersonate user',()=>{
        cy.visit('/')
        cy.get('.btn__text').contains('Login').click()
        cy.loginTrainerManager()

        // search existing user

        const searchMail = 'cyTest15TurmericMonthly0511@example.net'

        cy.get('#side-menu').contains('Users').click()
        cy.get('#__BVID__16').clear().type( searchMail+'{enter}')

        // cy.get('#__BVID__16').clear().type(searchMail + '{enter}')
        cy.contains('.vuetable-body td', searchMail)
            .should('exist')
            .parent()
            .within($tr => {
                cy.get('button[title=Impersonate]').click()
                cy.url().should('include', '/member')
            })

        cy.contains('Edit Profile').click()
        cy.url().should('include', '/member/profile')
        cy.contains('Purchases').click()
        cy.contains('#orders-table td', 'Turmeric Black').should('exist')
        cy.get('#menu1').contains('Admin').click()
        cy.get('.dropdown--active').contains('Stop impersonating').click()

    })
})

