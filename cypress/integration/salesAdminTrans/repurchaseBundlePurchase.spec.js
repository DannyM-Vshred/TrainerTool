/// <reference types = "Cypress" /> 
import 'cypress-iframe';

describe('Repurchase Bundle through Sales Admin',()=>{

    before(()=>{
        cy.fixture('loginData').as('loginData');
        cy.viewport(1920, 1080)
        cy.visit('/')

    })
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
        });

    const searchMail = '3013oda48@example.org'
    const shipName = 'testShip NameOnly'
    const order_id = 'c35a4593-5962-4711-b887-8908101853ca'

    it('can create Bundle Purchase for Existing Member users through Admin',()=>{    
        //login as SalesAgent
        cy.get('#menu1').contains('Login').click()
        cy.get('@loginData').then(login=>{
            cy.get('#email').clear().type(login[3].email);
            cy.get('#password').type(login[3].password)
            cy.get('[type="submit"]').click()
            cy.contains('Welcome to the admin dashboard').should('be.visible');
        })

        cy.contains('Users').click()
        cy.url().should('include','/admin/users')

        // search existing user
        cy.get('#__BVID__16').clear().type(searchMail +'{enter}')
        cy.contains('.vuetable-body td', searchMail)
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

        //Creating new Order
        cy.get('#new-order').click()
        cy.url().should('include', '/process-order/')
       
        // add new Shipping address
        cy.addNewShipBillAddress(
            {
                shipname : shipName
            })
        
        //Add order Cart   
        cy.get('button').contains('Add Offer').click()

        //select Bundles
        cy.get('#addOfferModal___BV_modal_body_ li')
            .then(($tr)=>{
                cy.wrap($tr).find('a').contains('Bundles').click()
            })
        //search known bundle
        cy.get('input[placeholder="Search by Title or Description"]').clear().type('last')
        cy.contains('td', 'Last Ditch')
           .should('exist')
           .parent()
           .within($tr => {
               cy.get('button').contains('Add Bundle').click()
           })

        cy.wait(2000)
        //review Cart details
        cy.get('tbody td').then(($orderCart)=>{
            cy.wrap($orderCart).contains("I'm Worth It Custom Diet Plan and One Bottle of Burn Bundle").should('be.visible')
            cy.wrap($orderCart).contains('Burn Evolved').should('be.visible')
            cy.wrap($orderCart).contains('Custom Diet Plan - 8 Week').should('be.visible')
        })
        
        cy.get('button').contains('Place Order').click()
        cy.wait(2000)

        cy.get('#paymentModal___BV_modal_body_')
            .then(($payCart)=>{
                cy.wrap($payCart).contains("I'm Worth It Custom Diet Plan and One Bottle of Burn Bundle").should('be.visible')
           })
        cy.wait(5000)

        //force use new card
        cy.get('.braintree-cc a').contains('New Card').click()
        //enter payment info
        cy.enterPaymentInfoAdmin()
        cy.wait(1500)
        
        //check Payment section
        cy.get('#__BVID__55 tbody')
            .then(($payments)=>{
                cy.wrap($payments).contains('td','Submitted For Settlement')
                    .should('be.visible')
                    .next()
                    .should('contain.text', 'true')
        })
   
        
        //existing client
        cy.get('.wrapper.wrapper-content .card-body')
            .then(($OrderDetails)=>{
                cy.wrap($OrderDetails).within(($str)=>{
                    cy.wrap($str).contains(searchMail)
                        .should('be.be.visible')
                })
            })

        cy.get('button').contains('Void').should('be.visible').and('be.enabled')
    })
})

      //Open existing order
        // cy.get('tbody td').contains(order_id).click()
        // cy.url().should('include', '/process-order/')
        // cy.wait(3000)
        // cy.get('.wrapper.wrapper-content .card-body').then(($OrderDetails)=>{
        //     cy.wrap($OrderDetails).contains(searchMail).should('be.be.visible')
        // })