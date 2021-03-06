/// <reference types="cypress" />
import 'cypress-iframe';

describe('Custom Diet and Training Subscriptions', () => {
    beforeEach(() => {
        cy.fixture('loginData').as('loginData');
        cy.fixture('orderForms').as('orderForms')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    const myCtr = '41';
    const dateS = '0921';
    const assignTrainer = 'cyTrainer Subs'
    const clName = 'cyTest'

    const testEnv = 'TESTING2_URL'  //STAGING-TT_URL , STAGING_URL, TESTING2_URL

    it('can purchase Custom Diet Plan Monthly Subscription', () => {

        cy.get('@orderForms').then(json => {
            cy.envUnderTest(""+Cypress.env(testEnv)+json[9].url+"")         //replaces cy.visit('/' + json[0].url) referencing baseUrl
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[9].offer)

            const fName = clName + myCtr
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
            cy.verifySubInUnassignedPlansPage({ email : cEmail })

            cy.assignTrainer({ email : cEmail, trainer : assignTrainer })    

            cy.verifyAssignedClientSubs({ email: cEmail, trainer: assignTrainer })
        
            //Upload PDF Plan
            cy.uploadPlan({ email: cEmail })

            //View plan sent in Web profile
            cy.viewWebPlanSent({ email: cEmail })

            cy.stopImpersonating()

        })
    })

    it.only('can purchase Gold Diet Plan Subscription', () => {
        cy.get('@orderForms').then(json => {
            cy.envUnderTest(""+Cypress.env(testEnv)+json[10].url+"")         //replaces cy.visit('/' + json[0].url) referencing baseUrl
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[10].offer)

            const fName = clName + myCtr
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
            cy.verifySubInUnassignedPlansPage({ email : cEmail })

            cy.assignTrainer({ email : cEmail, trainer : assignTrainer })    

            cy.verifyAssignedClientSubs({ email: cEmail, trainer: assignTrainer })
        
            //Upload PDF Plan
            cy.uploadPlan({ email: cEmail })

            //View plan sent in Web profile
            cy.viewWebPlanSent({ email: cEmail })

            cy.stopImpersonating()

        })
    })

})
