/// <reference types="cypress" />
import 'cypress-iframe';
import { waitForDebugger } from 'inspector';

describe('Custom Diet and Training Web Purchase', ()=>{
    before(()=>{
        cy.fixture('newClientRecord').as('clientData');
        //Custom Training and Diet Plan - 8 Weeks and FREE Bonuses
        cy.visit('https://testing-2.vshred.com');
        
       
        //cy.visit('https://testing-2.vshred.com/order-form/custom-training-and-diet-plan-8-week/?ref=programs%2Fcustom-training-and-diet-plan-8-week')

    })

    it.only('can purchase Custom 8Weeks OTP from web', ()=>{
       
        cy.get('#menu1').contains('Programs').click()
        cy.get('.programs-container').contains('Custom Diet and Training Plan for Him').click()

        //optional step    
        // cy.get('.btn__text').contains('Yes I want a Customized Plan').click()
        
        cy.get('.pricing a[data-name="Custom Diet and Training Plan for Him"]').click()
        cy.get('.product-details-content p', {timeout: 2000})
            .should('contain.text', 'Custom Training and Diet Plan - 8 Weeks and FREE Bonuses')
        
        cy.wait(3000);
        cy.get('@clientData').then(json=>{
            //Enter Client Infoprmation    
            const myCtr = '14 '
            const dateS = '0730'
            cy.get('#name').clear().type(json[0].fname+myCtr+json[0].lname+dateS);
            cy.get('#email').clear().type(json[0].email+myCtr+dateS+json[0].domain);
            cy.get('#phone').clear().type(json[0].phone);

            cy.contains('Next Step').click()

        })
        
        // Enter Payment Information
        cy.get('#braintree-hosted-field-number')
            .then(($iframe) => {
               const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .find('#credit-card-number')
                    .type('4242424242424242')
            });
        // expiration date
        cy.get('#braintree-hosted-field-expirationDate').then(function($iframe){
            var iExpDate = $iframe.contents().find('#expiration')
            cy.wrap(iExpDate)
            .type('1225')
        })
        // CVV
        cy.get('#braintree-hosted-field-cvv').then(function($iframe){
            var iCvv = $iframe.contents().find('#cvv')
            cy.wrap(iCvv)
            .type('644')
        })
        // Postal Code
        cy.get('#braintree-hosted-field-postalCode').then(function($iframe){
            var iPostalCode = $iframe.contents().find('#postal-code')
            cy.wrap(iPostalCode)
            .type('90210')
        })
        cy.get('.expand-area-2 > .expand-inputs > .next-step').click()

        //Submit Order
        cy.get('.ifNotTAKEN > :nth-child(1) > :nth-child(1)').should('contain.text','Custom Training and Diet Plan - 8 Weeks and FREE Bonuses')
        cy.get('.ifNotTAKEN > :nth-child(1) > .checkout-prices').should('contain.text', '$149.00');
        cy.get('#submit-order').click()

        cy.wait(20000);
        // cy.contains('Thank you', {timeout : 20000})
        // // cy.get('h2.text-center').should('contain.text', 'Thank you for your order');
        // cy.get('.h5').should('contain.text','Custom Training and Diet Plan - 8 Weeks');
        //fillout questionnaire
        cy.get('#questionnaire',{timeout:5000}).click()

        //questionnaire details
        //birthday
        cy.get("input[type='date']").type('1999-01-05');
            
        //country
        cy.get("input[name='Country']").clear().type('US')
        
        //height
        cy.get(':nth-child(6) select').select('5')
        cy.get(':nth-child(7) select').select('7')
        // cy.get("select[name='height_feet']").select('5')
        // cy.get("select[name='height_inches']").select('8')

        //weight
        cy.get("input[name='weight']").clear().type('230')          
        //weight unit
        // cy.get(':nth-child(9) > div > div > div:nth-child(2) checkmark').click() //kg
        cy.get(':nth-child(9) > div > div > div:nth-child(3) .checkmark').click() //lbs
                  
        //Gender
        cy.get(':nth-child(10) > div > div > div:nth-child(2) .checkmark').click() //male
        // cy.get(':nth-child(10) > div > div > div:nth-child(3) .checkmark').click() //female
        
        //activity level
        cy.get(':nth-child(11) > div > div > div:nth-child(2) .checkmark').click() //moderate
        // cy.get(':nth-child(11) > div > div > div:nth-child(3) .checkmark').click() //light
        // cy.get(':nth-child(11) > div > div > div:nth-child(4) .checkmark').click() //hard

        //Gym TimeSpent
        cy.get(':nth-child(12) > div > div > div:nth-child(2) .checkmark').click() //none
        // cy.get(':nth-child(12) > div > div > div:nth-child(3) .checkmark').click() //4+ Days
        // cy.get(':nth-child(12) > div > div > div:nth-child(4) .checkmark').click() //<4Days

        //diet Preference
        cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() // none 
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click() // paleo 
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) .checkmark').click() // vegan
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click() // vege
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click() // gluten
        cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) .checkmark').click() // pescatarian
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) .checkmark').click() // lactose free
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) .checkmark').click() // low glycemic

        //Other diet
        cy.get(':nth-child(14) .cdp-input').type('new purchase - web Custom for Him')
        
        //Diet Style
        // cy.get(':nth-child(15) > div > div > div:nth-child(2) .checkmark').click() //keto
        // cy.get(':nth-child(15) > div > div > div:nth-child(3) .checkmark').click() //carb cycling
        // cy.get(':nth-child(15) > div > div > div:nth-child(4) .checkmark').click() //balanced
        // cy.get(':nth-child(15) > div > div > div:nth-child(5) .checkmark').click() //intermittent fast
        cy.get(':nth-child(15) > div > div > div:nth-child(6) .checkmark').click() //trainer recommend

        //Cooking Prep
        cy.get(':nth-child(16) > div > div > div:nth-child(2) .checkmark').click() //simple
        // cy.get(':nth-child(16) > div > div > div:nth-child(2) .checkmark').click() //complex
        
        //fav Foods
        cy.get(':nth-child(17) .cdp-input').clear().type('burgers')
        
        //least fav Foods
        cy.get(':nth-child(18) .cdp-input').clear().type('vegetables')
        
        //not eat Foods
        cy.get(':nth-child(19) .cdp-input').clear().type('hotdogs')

        //allergies
        // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //No
        cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click() //yes

        //food allergies
        cy.get(':nth-child(21) .cdp-input').clear().type('peanuts')
        
        //fitness goals
        cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(2) .checkmark').click() // gainMuscle
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(3) .checkmark').click() // weightLoss
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(4) .checkmark').click() // improveHealth
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(5) .checkmark').click() // overcomeInjury
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(6) .checkmark').click() // improveStrength
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(7) .checkmark').click() // decreaseBodyFat

        //additional goal
        cy.get(':nth-child(23) .cdp-input').type('lean mean machine')
        
        //lifting weights
        cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //No
        // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click() //Yes
        
        // if active
        cy.get(':nth-child(25) .cdp-input').clear().type('so long ago')
        cy.get(':nth-child(26) .cdp-input').clear().type('you tell me')
        cy.get(':nth-child(27) .cdp-input').clear().type('active alright')
        cy.get(':nth-child(28) .cdp-input').clear().type('figure it out')
        cy.get(':nth-child(29) .cdp-input').clear().type('sleep')
        cy.get(':nth-child(30) .cdp-input').clear().type('train')

        //Gym access
        cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //No
        // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //Yes

        //help to reach goal
        cy.get(':nth-child(32) .cdp-input').clear().type('Train me')     
        
        //how many hours of sleep           
        cy.get(':nth-child(33) .cdp-input').clear().type('Check my Lifestyle')     

        //stress level
        cy.get(':nth-child(34) .cdp-input').select('9')
        cy.get(':nth-child(35) .cdp-input').type('1,2,3')     
        
        //overweight
        cy.get(':nth-child(36) > div > div > div:nth-child(2) .checkmark').click() //no
        // cy.get(':nth-child(36) > div > div > div:nth-child(3) .checkmark').click() //yes
        
        cy.get(':nth-child(37) > div > div > div:nth-child(2) .checkmark').click() //no
        // cy.get(':nth-child(37) > div > div > div:nth-child(3) .checkmark').click() //yes

        cy.get(':nth-child(38) > div > div > div:nth-child(2) .checkmark').click() //no
        // cy.get(':nth-child(38) > div > div > div:nth-child(3) .checkmark').click() //na
        // cy.get(':nth-child(38) > div > div > div:nth-child(4) .checkmark').click() //yes
                   
        //injuries
        cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(2) .checkmark').click() //no
        // cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(3) .checkmark').click() //yes
        

        cy.get(':nth-child(40) .cdp-input').clear().type('NA')
        cy.get(':nth-child(41) .cdp-input').clear().type('NA')
        cy.get(':nth-child(42) .cdp-input').clear().type('NA')
        cy.get(':nth-child(43) .cdp-input').clear().type('NA')
        //misc
        cy.get(':nth-child(44) > :nth-child(2) .cdp-input').clear().type('Its a mystery')
        cy.get(':nth-child(45) .cdp-input').clear().type('Facebook')
        
        //agree
        cy.get('.col-12 > .cdp-field > .checkbox-container > .checkmark').click()
        
        //Submit Questionnaire
        cy.get('.cdp-form-submit-button').click()

    })

    })

     // cy.contains('Custom Diet and Training Plan for Her')
        // cy.contains('Fat Loss Extreme for Him')
        // cy.contains('Fat Loss Extreme for Her')

