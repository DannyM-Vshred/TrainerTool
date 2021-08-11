/// <reference types="cypress" />
import { mapLimit } from 'async';
import 'cypress-iframe';
import { waitForDebugger } from 'inspector';

describe('Custom Diet and Training Subscriptions', () => {
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
    const myCtr = '01';
    const dateS = '0811';
    const assignTrainer = 'cyTrainer Subs'

    it('can purchase Custom Diet Plan Monthly Subscription', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/'+json[9].url)
            // cy.visit(json[9].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[9].offer)

            const fName = 'cytest' + myCtr
            const lName = json[9].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                .should('contain.text', json[9].purchaseNote)
            cy.get('#order-summary').contains(json[9].orderItem1).should('exist')

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[9].confirmOrder1);

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[0].gender)
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            // cy.get('#__BVID__21').type(cEmail + '{enter}');
            // cy.get('.vuetable-td-email').contains(cEmail).should('exist')
            cy.wait(2000)       
            cy.contains('.vuetable-body td', cEmail) //search within the record row
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text','Recurring')         //recurring
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')        //assign trainer selected
                })
            cy.get('p.toast-text')                              //confirmation message
                .should('contain.text', 'Successfully assigned trainer to client')

            //record under test is in Assigne Clients page
            cy.verifyAssignedClientSubs(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
        cy.get('circle[fill=none]').click({force:true})
        })
    })

    it('can purchase Gold Diet Plan Subscription', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/'+json[10].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[10].offer)

            const fName = 'cytest' + myCtr
            const lName = json[10].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeGoldUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            // cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
            //     .should('contain.text', json[10].purchaseNote)
            cy.get('#order-summary').contains(json[10].orderItem1).should('exist')

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[10].confirmOrder1);

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            // cy.url().should('contains', 'gold-program-questionnaire')       //verify questionnaire url
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[10].gender)
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            // cy.get('#__BVID__21').type(cEmail + '{enter}');
            // cy.get('.vuetable-td-email').contains(cEmail).should('exist')
            cy.wait(2000)       
            cy.contains('.vuetable-body td', cEmail) //search within the record row
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text','Recurring')         //recurring
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')        //assign trainer selected
                })
            cy.get('p.toast-text')                              //confirmation message
                .should('contain.text', 'Successfully assigned trainer to client')

            //record under test is in Assigne Clients page
            cy.verifyAssignedClientSubs(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
        // cy.get('circle[fill=none]').click({force:true})
        })
    })

})
