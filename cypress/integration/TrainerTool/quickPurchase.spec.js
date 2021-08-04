/// <reference types="cypress" />
import 'cypress-iframe';

describe('Quick Purchase', ()=>{
    before(()=>{
        // cy.visit('https://testing-2.vshred.com');
        cy.visit('https://testing-2.vshred.com/order-form/custom-training-and-diet-plan-8-week/?ref=programs%2Fcustom-training-and-diet-plan-8-week')

    })

    it.only('can purchase from web', ()=>{
        // cy.get('#menu1').contains('Programs').click()

        // cy.get('.programs-container').contains('Custom Diet and Training Plan for Him').click()

        // //optional step    
        // // cy.get('.btn__text').contains('Yes I want a Customized Plan').click()
        
        // cy.get('.pricing a[data-name="Custom Diet and Training Plan for Him"]').click()


        // cy.get('.product-details-content p', {timeout: 2000})
        //     .should('contain.text', 'Custom Training and Diet Plan - 8 Weeks and FREE Bonuses')
        
        //Enter Client Infoprmation    
        
        cy.get('#name').clear().type('cyNameTest')
            .invoke('val')
            .then(val =>{
                const cName = val;
                cy.get('#email').clear().type(cName +'a1@test.com')
            })       
        cy.get('#phone').clear().type(2352323222)
        // cy.contains('Next Step').click()
        // // Enter Payment Information
        // cy.get('#braintree-hosted-field-number')
        //     .then(($iframe) => {
        //        const $body = $iframe.contents().find('body')
        //         cy.wrap($body)
        //             .find('#credit-card-number')
        //             .type('4242424242424242')
        //     });

        // // expiration date
        // cy.get('#braintree-hosted-field-expirationDate').then(function($iframe){
        //     var iExpDate = $iframe.contents().find('#expiration')
        //     cy.wrap(iExpDate)
        //     .type('1225')
        // })

        // // CVV
        // cy.get('#braintree-hosted-field-cvv').then(function($iframe){
        //     var iCvv = $iframe.contents().find('#cvv')
        //     cy.wrap(iCvv)
        //     .type('635')
        // })

        // // Postal Code
        // cy.get('#braintree-hosted-field-postalCode').then(function($iframe){
        //     var iPostalCode = $iframe.contents().find('#postal-code')
        //     cy.wrap(iPostalCode)
        //     .type('98254')
        // })

        // cy.get('.expand-area-2 > .expand-inputs > .next-step').click()

        // //Submit Order
        // cy.get('.ifNotTAKEN > :nth-child(1) > :nth-child(1)').should('contain.text','Custom Training and Diet Plan - 8 Weeks and FREE Bonuses')
        // cy.get('.ifNotTAKEN > :nth-child(1) > .checkout-prices').should('contain.text', '$149.00');
        // cy.get('#submit-order')
        
        
        // cy.contains('Custom Diet and Training Plan for Her')
        // cy.contains('Fat Loss Extreme for Him')
        // cy.contains('Fat Loss Extreme for Her')


    })
})
