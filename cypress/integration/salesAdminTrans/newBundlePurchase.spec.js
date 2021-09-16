/// <reference types = "Cypress" /> 
import 'cypress-iframe';

describe('new Bundle purchase through sales Admin', () => {

    before(() => {
        cy.fixture('supplements/customBundle').as('bundle');
        cy.fixture('loginData').as('loginData');
        cy.viewport(1920, 1080)
        cy.visit('/')

    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    });

    const ctr = '32'
    const dateS = '0615';
    const cName = 'cyBundle'
    const assignTrainer = 'beta TrainerBundle'

    it('can create Bundle with Custom Plans via Sales Agent', function() {                                                                                                                              
        const customBundle = this.bundle
        const salesAgentlogin = this.loginData

        cy.get(customBundle).each((searchBundle) => {
            const fName = cName + ctr
            const lName = searchBundle.customBundleOrder + dateS
            const cEmail = fName + lName + '@example.net'
            
            cy.visit('/')

            //login as SalesAgent
            cy.get('#menu1').contains('Login').click()
            cy.get(salesAgentlogin).then(login => {
                cy.get('#email').clear().type(login[3].email);
                cy.get('#password').type(login[3].password)
                cy.get('[type="submit"]').click()
                cy.contains('Welcome to the admin dashboard').should('be.visible');
            })

            cy.contains('Users').click()
            cy.url().should('include', '/admin/users')

            // create new Member user
            cy.createNewMemberUser(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            //Purchase tab
            cy.get('ul[role=tablist]').contains('Purchases')
                .click()
                .should('have.attr', 'aria-selected')
                .and('include', 'true')
            cy.wait(2000)

            //Creating new Order
            cy.get('#new-order').click()
            cy.url().should('include', '/process-order/')

            // add new Shipping address
            cy.addNewShipBillAddress({ shipname: cName })

            //Add order Cart   
            cy.get('button').contains('Add Offer').click()

            //select Bundles
            cy.get('#addOfferModal___BV_modal_body_ li')
                .then(($tr) => {
                    cy.wrap($tr).find('a').contains('Bundles').click()
                })
            //search known bundle
            cy.get('input[placeholder="Search by Title or Description"]').clear().type(searchBundle.custmoBundleSearch)
            cy.contains('td', searchBundle.cartSummary)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('button').contains('Add Bundle').click()
                })

            cy.wait(2000)
            //review Cart details
            cy.get('tbody td').then(($orderCart) => {
                cy.wrap($orderCart).contains(searchBundle.cartOrder1).should('be.visible')
                cy.wrap($orderCart).contains(searchBundle.cartOrder2).should('be.visible')
                
            })

            cy.get('button').contains('Place Order').click()
            cy.wait(2000)

            cy.get('#paymentModal___BV_modal_body_')
                .then(($payCart) => {
                    cy.wrap($payCart).contains(searchBundle.cartSummary).should('be.visible')
                })
            cy.wait(5000)

            cy.get('.braintree-cc a').contains('New Card').click()
            //enter payment info
            cy.enterPaymentInfoAdmin()

            //check Payment section
            cy.get('#__BVID__55 tbody')
                .then(($payments) => {
                    cy.wrap($payments).contains('td', 'Submitted For Settlement')
                        .should('be.visible')
                        .next()
                        .should('contain.text', 'true')
                })
            cy.wait(1500)

            //new client
            cy.get('.wrapper.wrapper-content .card-body')
                .then(($OrderDetails) => {
                    cy.wrap($OrderDetails).within(($str) => {
                        cy.wrap($str).contains(cEmail)
                            .should('be.visible')
                    })
                })

            cy.get('button').contains('Void').should('be.visible').and('be.enabled')


            //search newly created user
            cy.contains('Users').click()
            cy.url().should('include', '/admin/users')

            // search existing user
            cy.get('#__BVID__16').clear().type(cEmail + '{enter}')
            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('button[title=View]').click()
                })

            //Purchase tab
            cy.get('ul[role=tablist]').contains('Purchases')
                .click()
                .should('have.attr', 'aria-selected')
                .and('include', 'true')
            cy.wait(2000)

            //Open existing order
            cy.get('tbody td').contains(searchBundle.cartSummary)
                .should('be.visible')
                .parent()
                .within(($str) => {
                    cy.wrap($str).get('.th-id a').invoke('text').then((text) => {
                        const orderID = text
                        cy.log('OrderId: ' + orderID)
                    })
                    cy.wrap($str).get('.th-status')
                        .should('contain.text', 'Paid')
                        .invoke('text').then((text) => {
                            const orderStatus = text
                            cy.log('OrderId: ' + orderStatus)
                        })
                })

            cy.wait(2000)
            //logout as Sales Agent
            cy.get('.navbar-top-links a').contains('Logout').click()

            //login as Trainer Manager
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            cy.contains('Users').click()
            cy.url().should('include', '/admin/users')

            // search existing user
            cy.get('#__BVID__16').clear().type(cEmail + '{enter}')
            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('button[title=Impersonate]').click()
                })

            cy.get('.modal-active .modal-close-cross').click({ force: true, multiple: true })

            cy.get('#profile-gender').select('male')
            cy.contains('Save Profile').click()

            // cy.completeWebProfile()

            cy.contains('Edit Profile').click()
            cy.get('button').contains('Questionnaire').click()

            cy.filloutQuestionnaire();

            cy.get('#menu1').contains('Admin').click()

            cy.get('.dropdown--active .menu-vertical').contains('Stop impersonating').click()        //Stop impersonating

            //back in Admin dashboard
            cy.url().should('include', 'admin/users')
            cy.contains(cEmail).should('exist')

            cy.verifyRecordNotInAssignedClientPage({ email: cEmail })

            cy.verifyOTPInUnassignedPlansPage({ email: cEmail })
            //assign trainer
            cy.assignTrainer({ email: cEmail, trainer: assignTrainer })

            //check assignment
            cy.verifyAssignedClientOTP({ email: cEmail, trainer: assignTrainer })

            //Upload PDF Plan
            cy.uploadPlan({ email: cEmail })

            //logout
            cy.get('a[href="https://testing-2.vshred.com/logout"]').click({multiple:true, force:true})

            cy.log("Custom Bundle: "+searchBundle.cartSummary+ " >> Passed")

        })
    })
})
