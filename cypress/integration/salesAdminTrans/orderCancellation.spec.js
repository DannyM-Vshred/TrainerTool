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

    const searchMail = 'cyTest55subSilverTlink0913@example.com'
    // const searchMail = 'test04newmember06012021@mailinator.com' // multiple orders
    // const searchMail = 'cyTest20otpCdpHim0827@example.net'      //'cyTest11otp6PackShred0825@example.net'
    // const searchMail = 'tests+gi+1592159600422@vshred.com'
    const order_id = 'c35a4593-5962-4711-b887-8908101853ca'

<<<<<<< HEAD
    it.only('can Cancel Orders',()=>{    
=======
    it('can Cancel Orders',()=>{    

>>>>>>> 9ee3676e3725d8799ed65c72a2da2a58b2f4a4be
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

        //select Purchase tab
        cy.get('ul[role=tablist]').contains('Purchases')
            .click()        
            .should('have.attr', 'aria-selected')
            .and('include', 'true')
        cy.wait(2000)

        //get order record with status=Fulfilled or Paid
        cy.contains('tbody .th-name','Custom').then(($cdp)=>{
            cy.wrap($cdp).prev().invoke('text').then((status)=>{
                const orderStatus = status
                cy.log('Order Status: '+ orderStatus)
                
                if((orderStatus==="\n Paid\n")||(orderStatus==="\n Fulfilled\n")){
                    // case "\n Paid\n":
                        cy.wrap($cdp).parent().within(($th)=>{
                            cy.wrap($th).get('.th-id').invoke('text').then((order)=>{
                                cy.log('OrderId: ' + order)    
                                cy.get('.th-id').click()
                                cy.wait(2000)
                                cy.url().should('contain', '/process-order/'+order.trim())
                            })
                            
                        })

                    cy.get('tbody td').then(($orderCart) => {
                    cy.wrap($orderCart).contains('Custom').should('be.visible')

                    //check correct record is displayed
                    cy.get('.wrapper.wrapper-content .card-body')
                        .within(($str) => {
                            cy.wrap($str).contains(searchMail).should('be.visible')
                        })

                    //check Payment status is 'Submitted for Settlement'
                    cy.get('#__BVID__55 td[aria-colindex=4]')
                        .then(($payments) => {
                            cy.wrap($payments)  //.contains('td', 'Submitted For Settlement')
                                .should('contain.text', 'Submitted For Settlement')
                                .next()
                                .should('contain.text', 'true')
                        })

                    //Void order    
                    cy.get('button').contains('Void')
                        .should('be.visible').and('be.enabled')
                        .click()

                    cy.get('#voidOrderModal___BV_modal_content_').should('contain.text', 'Confirm that you would like to void this order')
                    cy.get('#voidOrderModal___BV_modal_footer_ button').contains('Void').click()
                    cy.wait(1000)
                    cy.get('.toast-success .toast-message').should('contain.text', 'successfully voided')

                    // check Payment section
                    cy.get('#__BVID__55 tbody')
                        .then(($payments) => {
                            cy.wrap($payments).contains('td', 'Voided')
                                .should('be.visible')
                                .next()
                                .should('contain.text', 'false')
                        })
                    cy.wait(1500)

                    //move back to users view
                    cy.get('.wrapper.wrapper-content .card-body').contains(searchMail)
                        .then(($email) => {
                            cy.wrap($email).find('a').click()
                            cy.url().should('contain', '/admin/users/')
                        })

                    //select Purchase tab
                    cy.get('ul[role=tablist]').contains('Purchases')
                        .click()
                        .should('have.attr', 'aria-selected')
                        .and('include', 'true')
                    cy.wait(2000)

                    //get order record with status=Fulfilled or Paid   
                    cy.contains('tbody .th-name', 'Custom').then(($cdp) => {
                        cy.wrap($cdp).prev()
                            .should('contain.text', 'Canceled')
                            .invoke('text')
                            .then((status) => {
                                const orderStatus = status
                                cy.log('Order Status: ' + orderStatus)
                            })
                    })
                })

                } else {
                    cy.log('Order is not for cancellation')
                    
                }
                
            })
        })
    })

    it.skip('can Refund Orders',()=>{    
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

        //select Purchase tab
        cy.get('ul[role=tablist]').contains('Purchases')
            .click()        
            .should('have.attr', 'aria-selected')
            .and('include', 'true')
        cy.wait(2000)

        //get order record with status=Fulfilled or Paid
        cy.contains('tbody .th-name','Custom').then(($cdp)=>{
            cy.wrap($cdp).prev().invoke('text').then((status)=>{
                const orderStatus = status
                cy.log('Order Status: '+ orderStatus)
                
                if(orderStatus==="\n Paid\n"){
                        cy.wrap($cdp).parent().within(($th)=>{
                            cy.wrap($th).get('.th-id').invoke('text').then((order)=>{
                                cy.log('OrderId: ' + order)    
                                cy.get('.th-id').click()
                                cy.wait(2000)
                                cy.url().should('contain', '/process-order/'+order.trim())
                            })
                            
                        })

                    cy.get('tbody td').then(($orderCart) => {
                    cy.wrap($orderCart).contains('Custom').should('be.visible')

                    //check correct record is displayed
                    cy.get('.wrapper.wrapper-content .card-body')
                        .within(($str) => {
                            cy.wrap($str).contains(searchMail).should('be.visible')
                        })

                    //check Payment status is 'Submitted for Settlement'
                    cy.get('#__BVID__55 td[aria-colindex=4]')
                        .then(($payments) => {
                            cy.wrap($payments)  //.contains('td', 'Submitted For Settlement')
                                .should('contain.text', 'Settled')
                                .next()
                                .should('contain.text', 'true')
                        })

                    //Refund order    
                    cy.get('button').contains('Refund')
                        .should('be.visible').and('be.enabled')
                        .click()

                    cy.get('#refundOrderModal___BV_modal_header_')
                    cy.get('#voidOrderModal___BV_modal_content_').should('contain.text', 'Confirm that you would like to void this order')
                    cy.get('#voidOrderModal___BV_modal_footer_ button').contains('Refund').click()
                    cy.wait(1000)
                    cy.get('.toast-success .toast-message').should('contain.text', 'successfully voided')

                    // check Payment section
                    cy.get('#__BVID__55 tbody')
                        .then(($payments) => {
                            cy.wrap($payments).contains('td', 'Voided')
                                .should('be.visible')
                                .next()
                                .should('contain.text', 'false')
                        })
                    cy.wait(1500)

                    //move back to users view
                    cy.get('.wrapper.wrapper-content .card-body').contains(searchMail)
                        .then(($email) => {
                            cy.wrap($email).find('a').click()
                            cy.url().should('contain', '/admin/users/')
                        })

                    //select Purchase tab
                    cy.get('ul[role=tablist]').contains('Purchases')
                        .click()
                        .should('have.attr', 'aria-selected')
                        .and('include', 'true')
                    cy.wait(2000)

                    //get order record with status=Fulfilled or Paid   
                    cy.contains('tbody .th-name', 'Custom').then(($cdp) => {
                        cy.wrap($cdp).prev()
                            .should('contain.text', 'Canceled')
                            .invoke('text')
                            .then((status) => {
                                const orderStatus = status
                                cy.log('Order Status: ' + orderStatus)
                            })
                    })
                })

                } else {
                    cy.log('Order is not for cancellation')
                    
                }
                
            })
        })
    })
})
