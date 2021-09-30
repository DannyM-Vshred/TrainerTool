/// <reference types="cypress" />
import 'cypress-iframe';

describe('OTP Custom Diet and Training Web Purchases', () => {
    beforeEach(() => {
        // cy.fixture('newClientRecord').as('clientData');
        cy.fixture('loginData').as('loginData');
        cy.fixture('testBoostOrder').as('testBoost')
        cy.envUnderTest(""+Cypress.env('TESTING2_URL')+"")
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
        // cy.visit('/')
        
        
        cy.get('.btn__text').contains('Login').click()
        cy.loginTrainerManager()

        // search existing user

        const searchMail = 'cyBundle32plus1Burn0615@example.net'

        cy.contains('Trainer Tool').click();
        cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
        cy.wait(2000)
    
        cy.get('#__BVID__17').select('One-Time Plans')      //filter as Order
        cy.wait(2000)
        // cy.get('#__BVID__19').select('Not Sent')        //filter Not Sent
        cy.get('#__BVID__19').select('Sent')        //filter Not Sent
        cy.wait(2000)
        cy.get('#__BVID__16')
            .clear()
            .type(searchMail + '{enter}');
        cy.wait(2000)
        
        cy.contains('.vuetable-body td', searchMail)
            .should('exist')
            .parent()
            .within($tr => {
                cy.get('i.fas.fa-check.checkmark').should('be.visible').click({force:true})
            })

        cy.contains("Files sent to ").should('be.visible')
        // cy.contains('.list-group-item h3', 'sample-pdf-file.pdf')
        cy.get('.list-group-item h3').then(($filename)=>{
            const filename = $filename.text()

            expect(filename).to.match(/sample-pdf-file.pdf/)
        })
        cy.get('.btn.btn-block').contains('Close').click()

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

            cy.contains('VIEW MY CUSTOM PLAN').should('be.visible').click()
            cy.get('button[id=view-custom-plan-362]').should('be.visible').then(($filename)=>{
                const webPlanfile = $filename.text()
                expect(webPlanfile).to.include('sample-pdf-file.pdf')
            })


        // cy.contains('Edit Profile').click()
        // cy.url().should('include', '/member/profile')
        // cy.contains('Purchases').click()
        // cy.contains('#orders-table td', 'Turmeric Black').should('exist')
        // cy.get('#menu1').contains('Admin').click()
        // cy.get('.dropdown--active').contains('Stop impersonating').click()

    })
})

