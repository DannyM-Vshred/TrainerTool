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

    it('can view Admin Users View',()=>{
        cy.visit('/')
        cy.get('.btn__text').contains('Login').click()
        cy.loginTrainerManager()

        // search existing user
        const searchMail = 'cyTest15TurmericMonthly0511@example.net'

        cy.get('#side-menu').contains('Users').click()
        cy.get('#__BVID__16').clear().type( searchMail+'{enter}')

        //select View button from table view
        cy.contains('.vuetable-body td', searchMail)
            .should('exist')
            .parent()
            .within($tr => {
                cy.get('button[title=View]').click()
                cy.url().should('include', '/view')
            })
        
        //impersonate button from table view
        cy.contains('.vuetable-body td', searchMail)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('button[title=Impersonate]').click()
            cy.url().should('include', '/member')
        })

        //New Order button from table view
        cy.contains('.vuetable-body td', searchMail)
            .should('exist')
            .parent()
            .within($tr => {
                cy.get('button[title="New Order"]').click()
                cy.url().should('include', '/process-order')
            })

        //select Edit tab
        cy.get('ul[role=tablist]').contains('Edit')
            .click()
            .should('have.attr', 'aria-selected')
            .and('include', 'true')
        cy.wait(2000)

        cy.get('#email').should('have.value',searchMail)
        
        //select Subscription tab
        cy.get('ul[role=tablist]').contains('Subscriptions')
            .click()
            .should('have.attr', 'aria-selected')
            .and('include', 'true')
        cy.wait(2000)

        cy.contains('#tab-subscriptions td', 'bt_turmeric-black-monthly')   //subscription sku
            .should('exist')
            .next().should('contain.text', 'canceled')

        //select Purchase tab
        cy.get('ul[role=tablist]').contains('Purchases')
        .click()
        .should('have.attr', 'aria-selected')
        .and('include', 'true')
        cy.wait(2000)

        cy.contains('#orders-table td.th-name', 'Turmeric Black').should('exist')
            .prev().should('contain.text','Canceled Test')

    })
})

