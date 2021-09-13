/// <reference types="cypress" />
import 'cypress-iframe';

describe('Purchase a single Bottle Supplement Only', () => {
    before(() => {
        // cy.fixture('newClientRecord').as('clientData');
        cy.fixture('loginData').as('loginData');
        cy.fixture('supplements/oneBottleSupplement').as('oneBottle')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    const myCtr = '17';
    const dateS = '0515';
    const clName = 'cyBottle'

    it.only('can purchase monthly supplement subscriptions', function() {
        const supplement = this.oneBottle
        
        cy.get(supplement).each((oneBottleSupp)=>{
            cy.visit('/'+oneBottleSupp.url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', oneBottleSupp.offer)
            
            const fName = clName + myCtr
            const lName = oneBottleSupp.lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            cy.filloutSupplementShippinginfo(
                {
                    name: fName + " " + lName,
                })

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', oneBottleSupp.orderItem1)
                .next().should('contain.text', oneBottleSupp.orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.contains('No thanks',{matchCase : false}).click()

            cy.skipPromoVideos()
            cy.contains('No thanks',{matchCase : false}).click()

            cy.skipPromoVideos()
            cy.contains('No thanks',{matchCase : false}).click()

            cy.skipPromoVideos()
            cy.contains('No thanks',{matchCase : false}).click()

            //Verify Order confirmation page is displayed
            cy.wait(2000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', oneBottleSupp.confirmOrder1);


            //verify no Questionnaire button   
            cy.contains('Questionnaire').should('not.exist')
            cy.contains('HERE').click()
            cy.get('div:nth-child(1) > div > div.modal-close.modal-close-cross').click({ multiple: true })

            //complete profile
            cy.get('#profile-gender').select(oneBottleSupp.gender)
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
            cy.contains('#orders-table td', oneBottleSupp.confirmOrder1).should('exist')
            
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
                .should('not.exist')
    
            //select Purchase tab
            cy.get('ul[role=tablist]').contains('Purchases')
            .click()
            .should('have.attr', 'aria-selected')
            .and('include', 'true')
            cy.wait(2000)
    
            cy.contains('#orders-table td.th-name', oneBottleSupp.confirmOrder1).should('exist')

            //verify record is not in Unassigned Plans page
            cy.verifyRecordNotInUnassignedPlansPage({email: cEmail})
            //verify record is not in Assigned Clients page
            cy.verifyRecordNotInAssignedClientPage({email: cEmail      })
        })
    })

})