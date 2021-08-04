// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('typeUserInfo', (user) => {
        cy.get('#name',{timeout : 2000}).clear().type(user.name)
        cy.get('#email').clear().type(user.email)
        cy.get('#phone').clear().type('8152563232')
        cy.contains('Next Step').click();
    })

// Cypress.Commands.add('typeUserInfo', (user) => {
//     const myMail = ''
//     cy.get('#name',{timeout : 2000}).clear().type(user.name)
        
//         .invoke('val').as('clientName')
//         .then(val => {
//             const cname = val;
//             cy.get('#email').clear().type(cname + '@example.net')
//             // .invoke('val').as('clientEmail')
//             // .then((email)=>{
//             //     myMail = email;
//             // })
//         })
//     cy.get('#phone').clear().type('8152563232')
//     cy.contains('Next Step').click();
// })


Cypress.Commands.add('typePaymentInfo', () => {
    // Enter Payment Information
    cy.get('#braintree-hosted-field-number')
        .then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find('#credit-card-number')
                .type('4242424242424242')
        });
    // expiration date
    cy.get('#braintree-hosted-field-expirationDate').then(function ($iframe) {
        var iExpDate = $iframe.contents().find('#expiration')
        cy.wrap(iExpDate)
            .type('1225')
    })
    // CVV
    cy.get('#braintree-hosted-field-cvv').then(function ($iframe) {
        var iCvv = $iframe.contents().find('#cvv')
        cy.wrap(iCvv)
            .type('644')
    })
    // Postal Code
    cy.get('#braintree-hosted-field-postalCode').then(function ($iframe) {
        var iPostalCode = $iframe.contents().find('#postal-code')
        cy.wrap(iPostalCode)
            .type('90210')
    })
    cy.get('.expand-area-2 > .expand-inputs > .next-step').click()

})

Cypress.Commands.add('filloutQuestionnaire',()=>{
    //questionnaire details
        
        //birthday
        cy.get("input[type='date']").type('1995-01-05');
            
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
        // cy.get(':nth-child(9) > div > div > div:nth-child(2) checkmark').click({waitForAnimations : false}) //kg
        cy.get(':nth-child(9) > div > div > div:nth-child(3) .checkmark').click({waitForAnimations : false}) //lbs
                  
        //Gender
        cy.get(':nth-child(10) > div > div > div:nth-child(2) .checkmark').click() //male
        // cy.get(':nth-child(10) > div > div > div:nth-child(3) .checkmark').click() //female
        
        //activity level
        // cy.get(':nth-child(11) > div > div > div:nth-child(2) .checkmark').click() //moderate
        cy.get(':nth-child(11) > div > div > div:nth-child(3) .checkmark').click() //light
        // cy.get(':nth-child(11) > div > div > div:nth-child(4) .checkmark').click() //hard

        //Gym TimeSpent
        // cy.get(':nth-child(12) > div > div > div:nth-child(2) .checkmark').click() //none
        cy.get(':nth-child(12) > div > div > div:nth-child(3) .checkmark').click() //4+ Days
        // cy.get(':nth-child(12) > div > div > div:nth-child(4) .checkmark').click() //<4Days

        //diet Preference
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) // none 
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) // paleo 
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) .checkmark').click({waitForAnimations : false}) // vegan
        cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click({waitForAnimations : false}) // vege
        cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click({waitForAnimations : false}) // gluten
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) .checkmark').click({waitForAnimations : false}) // pescatarian
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) .checkmark').click({waitForAnimations : false}) // lactose free
        // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) .checkmark').click({waitForAnimations : false}) // low glycemic

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
        // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //No
        cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) //yes

        //food allergies
        cy.get(':nth-child(21) .cdp-input').clear().type('peanuts')
        
        //fitness goals
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(2) .checkmark').click() // gainMuscle
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(3) .checkmark').click() // weightLoss
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(4) .checkmark').click() // improveHealth
        cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(5) .checkmark').click() // overcomeInjury
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(6) .checkmark').click() // improveStrength
        // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(7) .checkmark').click() // decreaseBodyFat

        //additional goal
        cy.get(':nth-child(23) .cdp-input').type('lean mean machine')
        
        //lifting weights
        cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //No
        // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) //Yes
        
        // if active
        cy.get(':nth-child(25) .cdp-input').clear().type('so long ago')
        cy.get(':nth-child(26) .cdp-input').clear().type('you tell me')
        cy.get(':nth-child(27) .cdp-input').clear().type('active alright')
        cy.get(':nth-child(28) .cdp-input').clear().type('figure it out')
        cy.get(':nth-child(29) .cdp-input').clear().type('sleep')
        cy.get(':nth-child(30) .cdp-input').clear().type('train')

        //Gym access
        cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //No
        // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //Yes

        //help to reach goal
        cy.get(':nth-child(32) .cdp-input').clear().type('Train me')     
        
        //how many hours of sleep           
        cy.get(':nth-child(33) .cdp-input').clear().type('Check my Lifestyle')     

        //stress level
        cy.get(':nth-child(34) .cdp-input').select('9')
        cy.get(':nth-child(35) .cdp-input').clear().type('1,2,3')     
        
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
        cy.wait(5000)
        cy.get('.modal-active .wpb_wrapper h2')
                .should('contain.text','Questionnaire Submitted')
        cy.get('div:nth-child(2) > div > div.modal-close.modal-close-cross').click({multiple: true})
        
})