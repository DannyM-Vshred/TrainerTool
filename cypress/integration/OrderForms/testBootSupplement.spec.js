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

    it.only('can purchase Test Boost monthly subscription', () => {
        cy.get('@testBoost').then(json => {
            cy.visit('/' + json[0].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[0].offer)

            const fName = clName + myCtr
            const lName = json[0].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp({name: fName + " " + lName,email: cEmail})
            cy.filloutSupplementShippinginfo({name: fName + " " + lName})

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', json[0].orderItem1)
                .next().should('contain.text', json[0].orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.contains('No thanks,').click()

            cy.skipPromoVideos()
            cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(2000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[0].confirmOrder1);
            

             //verify no Questionnaire button   
             cy.contains('Questionnaire').should('not.exist')
             cy.contains('HERE').click()
             cy.get('div:nth-child(1) > div > div.modal-close.modal-close-cross').click({ multiple: true })
 
             //complete profile
             cy.get('#profile-gender').select('Male')
             cy.completeWebProfile()
 
             //Login as Trainer Manager to check order is in Trainer Tool
             cy.get('.btn__text').contains('Login').click()
             cy.loginTrainerManager()

             //impersoante to Client Purchases View
             cy.get('#side-menu').contains('Users').click()
             cy.get('#__BVID__16').clear().type( cEmail+'{enter}')
             cy.contains('.vuetable-body td', cEmail)
                 .should('exist')
                 .parent()
                 .within($tr => {
                     cy.get('button[title=Impersonate]').click()
                     cy.url().should('include', '/member')
                 })
     
             cy.contains('Edit Profile').click()
             cy.url().should('include', '/member/profile')
             cy.contains('Purchases').click()
            //  cy.contains('#orders-table td', 'Turmeric Black').should('exist')
             cy.contains('#orders-table td', json[0].confirmOrder1).should('exist')
             
             cy.get('#menu1').contains('Admin').click()
             cy.get('.dropdown--active').contains('Stop impersonating').click()
     
             //select Subscription tab
             cy.get('ul[role=tablist]').contains('Subscriptions')
                 .click()
                 .should('have.attr', 'aria-selected')
                 .and('include', 'true')
             cy.wait(2000)
     
             cy.contains('#tab-subscriptions td', 'bt_test-boost-max-monthly')
            //  cy.contains('#tab-subscriptions td', 'bt_turmeric-black-monthly')
                 .should('exist')
                 .next().should('contain.text', 'active')
     
             //select Purchase tab
             cy.get('ul[role=tablist]').contains('Purchases')
             .click()
             .should('have.attr', 'aria-selected')
             .and('include', 'true')
             cy.wait(2000)
     
             cy.contains('#orders-table td.th-name', json[0].confirmOrder1).should('exist')
            //  cy.contains('#orders-table td.th-name', 'Turmeric Black').should('exist')

                 .prev().should('contain.text','Paid')
                 //
             //checkorders
             
             //verify record is not in Unassigned Plans page
             cy.verifyRecordNotInUnassignedPlansPage({email : cEmail})
             //verify record is not in Assigned Clients page
             cy.verifyRecordNotInAssignedClientPage({email : cEmail})                
        })
    })

})

