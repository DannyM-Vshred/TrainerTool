/// <reference types="cypress" />
import { mapLimit } from 'async';
import 'cypress-iframe';
import { waitForDebugger } from 'inspector';

describe('Custom Diet and Training Web Purchase', () => {
    beforeEach(() => {
        // cy.fixture('newClientRecord').as('clientData');
        cy.fixture('loginData').as('loginData');
        cy.fixture('orderForms').as('orderForms')

    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    const myCtr = '05';
    const dateS = '0804';
    
    it.only('can purchase Custom CDP 8-Weeks for Him OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit(json[0].url)
            cy.get('.product-details-content p', {timeout: 2000})
                    .should('contain.text',json[0].offer)
            
            const fName = 'cytest' + myCtr 
            const lName = json[0].lname + dateS
            const cEmail = fName+lName+'@example.net'

            cy.typeUserInfo(
                { name: fName+" "+lName, 
                  email : cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                    .should('contain.text',json[0].orderItem1)
            
            //Submit Order
            cy.get('#submit-order',{timeout:2000}).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', {timeout : 8000})
            cy.get('[test-id="email"]').should('contain.text',cEmail)
            cy.get('.h5').should('contain.text','Custom Training and Diet Plan - 8 Weeks');

            //fillout questionnaire
            cy.get('#questionnaire',{timeout:5000}).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[0].gender)
            cy.contains('Save Profile').click()
            cy.contains('Logout',{timeout:4000}).click()
        })

    })

})




