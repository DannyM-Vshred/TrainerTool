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
import 'cypress-file-upload';

Cypress.Commands.add('loginTrainerManager', () => {
    cy.viewport(1920, 1080);
    cy.get('#menu1').contains('Login').click()
    cy.get('#email').clear().type('trainer-one@example.com');
    cy.get('#password').type('123456');
    cy.get('[type="submit"]').click();

    cy.contains('Welcome to the admin dashboard').should('be.visible');
})

Cypress.Commands.add('typeUserInfo', (user) => {
    cy.get('#name', { timeout: 2000 }).clear().type(user.name)
    cy.get('#email').clear().type(user.email)
    cy.get('#phone').clear().type('8152563232')
    cy.contains('Next Step').click();
})

Cypress.Commands.add('typeGoldUserInfo', (user) => {
    cy.get('#name', { timeout: 2000 }).clear().type(user.name)
    cy.get('#email').clear().type(user.email)
    cy.contains('Next Step').click();
})

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
    cy.wait(5000)
})

Cypress.Commands.add('completeWebProfile',()=>{
    
    cy.get('#account-profile > form > div').then(($body) => {
        if ($body.text().includes('Height')) {
          //found it
          cy.get('#profile-birthday').type('1995-01-05')
          cy.get('#height_1').clear({force:true}).type('5', { force: true, waitForAnimations: false })
          cy.get('#height_2').clear({force:true}).type('10', { force: true, waitForAnimations: false })
          cy.get('#profile-weight').clear().type('245')
          cy.get('input[name=activity][id=light]').click({waitForAnimations: false, force:true})
          cy.get('input[name=condition_goal][id=fat-loss]').click({waitForAnimations: false, force:true})
          cy.contains('Save Profile').click()
          cy.url().then(($url)=>{
            if($url.includes('/member/profile')){
              cy.contains('Logout', { timeout: 4000 }).click()
                    } else{
                        cy.contains('Edit Profile').click()
                        cy.contains('Logout', { timeout: 4000 }).click()
                    }
                })
            } else {
          // nope not here
          cy.contains('Save Profile').click()
          cy.contains('Logout', { timeout: 4000 }).click()
        }
    })
})

Cypress.Commands.add('filloutQuestionnaire', () => {
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
    cy.get(':nth-child(9) > div > div > div:nth-child(3) .checkmark').click({ waitForAnimations: false }) //lbs

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
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click({ waitForAnimations: false }) // vege
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click({ waitForAnimations: false }) // gluten
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
    cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({ waitForAnimations: false }) //yes

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
    cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
    // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) //Yes

    // if active
    cy.get(':nth-child(25) .cdp-input').clear().type('so long ago')
    cy.get(':nth-child(26) .cdp-input').clear().type('you tell me')
    cy.get(':nth-child(27) .cdp-input').clear().type('active alright')
    cy.get(':nth-child(28) .cdp-input').clear().type('figure it out')
    cy.get(':nth-child(29) .cdp-input').clear().type('sleep')
    cy.get(':nth-child(30) .cdp-input').clear().type('train')

    //Gym access
    cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
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
        .should('contain.text', 'Questionnaire Submitted')
    cy.get('div:nth-child(2) > div > div.modal-close.modal-close-cross').click({ multiple: true })

})

Cypress.Commands.add('filloutGoldQuestionnaire', () => {
    //questionnaire details       
    //birthday
    cy.get("input[type='date']").type('1995-01-05');

    cy.get("input[name='phone_number']").type('9526542122');

    //country
    cy.get("input[name='Country']").clear().type('US')

    //height
    cy.get(':nth-child(4) select').select('5')  //feet
    cy.get(':nth-child(31) select').select('10') //inches
    // cy.get('select[name=height_feet]').select('5')
    // cy.get('select[name=height_inches]').select('10')

    //weight
    cy.get('input[name=weight]').clear().type('250')
    //weight unit
    // cy.get(':nth-child(33) > div > div > div:nth-child(2) checkmark').click({waitForAnimations : false}) //kg
    cy.get(':nth-child(33) > div > div > div:nth-child(3) .checkmark').click({ waitForAnimations: false }) //lbs

    //Gender
    cy.get(':nth-child(34) > div > div > div:nth-child(2) .checkmark').click() //male
    // cy.get(':nth-child(34) > div > div > div:nth-child(3) .checkmark').click() //female

    //activity level
    // cy.get(':nth-child(35) > div > div > div:nth-child(2) .checkmark').click() //moderate
    // cy.get(':nth-child(35) > div > div > div:nth-child(3) .checkmark').click() //light
    cy.get(':nth-child(35) > div > div > div:nth-child(4) .checkmark').click() //hard

    //Gym TimeSpent
    cy.get(':nth-child(36) > div > div > div:nth-child(2) .checkmark').click() //none
    // cy.get(':nth-child(36) > div > div > div:nth-child(3) .checkmark').click() //4+ Days
    // cy.get(':nth-child(36) > div > div > div:nth-child(4) .checkmark').click() //<4Days

    //diet Preference
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) // none 
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) // paleo 
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) .checkmark').click({waitForAnimations : false}) // vegan
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click({ waitForAnimations: false }) // vege
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click({ waitForAnimations: false }) // gluten
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) .checkmark').click({waitForAnimations : false}) // pescatarian
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) .checkmark').click({waitForAnimations : false}) // lactose free
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) .checkmark').click({waitForAnimations : false}) // low glycemic

    //Other diet
    cy.get(':nth-child(38) .cdp-input').type('new purchase - web Gold Custom Plan')

    //Diet Style
    // cy.get(':nth-child(21) > div > div > div:nth-child(2) .checkmark').click() //keto
    // cy.get(':nth-child(21) > div > div > div:nth-child(3) .checkmark').click() //carb cycling
    // cy.get(':nth-child(21) > div > div > div:nth-child(4) .checkmark').click() //balanced
    // cy.get(':nth-child(21) > div > div > div:nth-child(5) .checkmark').click() //intermittent fast
    cy.get(':nth-child(21) > div > div > div:nth-child(6) .checkmark').click() //trainer recommend

    //Cooking Prep
    cy.get(':nth-child(22) > div > div > div:nth-child(2) .checkmark').click() //simple
    // cy.get(':nth-child(22) > div > div > div:nth-child(2) .checkmark').click() //complex

    //fav Foods
    // cy.get(':nth-child(4) .cdp-input').clear().type('burgers')

    //least fav Foods
    // cy.get(':nth-child(4) .cdp-input').clear().type('vegetables')

    //not eat Foods
    cy.get(':nth-child(19) .cdp-input').clear().type('hotdogs')

    //allergies
    // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //No
    cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({ waitForAnimations: false }) //yes

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
    cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
    // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) //Yes

    // if active
    cy.get(':nth-child(25) .cdp-input').clear().type('so long ago')
    cy.get(':nth-child(26) .cdp-input').clear().type('you tell me')
    cy.get(':nth-child(27) .cdp-input').clear().type('active alright')
    cy.get(':nth-child(28) .cdp-input').clear().type('figure it out')
    cy.get(':nth-child(29) .cdp-input').clear().type('sleep')
    cy.get(':nth-child(30) .cdp-input').clear().type('train')

    //Gym access
    cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
    // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //Yes

    //help to reach goal
    cy.get(':nth-child(6) .cdp-input').clear().type('Train me to be a jedi')

    //how many hours of sleep           
    cy.get(':nth-child(7) > div:nth-child(2) .cdp-input').clear().type('Check my Lifestyle')
    // cy.get(':nth-child(7) .cdp-input').clear().type('Check my Lifestyle')

    //stress level
    cy.get(':nth-child(8) .cdp-input').select('9')
    cy.get(':nth-child(9) .cdp-input').clear().type('1,2,3')

    //overweight
    cy.get(':nth-child(10) > div > div > div:nth-child(2) .checkmark').click() //no
    // cy.get(':nth-child(10) > div > div > div:nth-child(3) .checkmark').click() //yes

    cy.get(':nth-child(11) > div > div > div:nth-child(2) .checkmark').click() //no
    // cy.get(':nth-child(11) > div > div > div:nth-child(3) .checkmark').click() //yes

    cy.get(':nth-child(12) > div > div > div:nth-child(2) .checkmark').click() //no
    // cy.get(':nth-child(12) > div > div > div:nth-child(3) .checkmark').click() //na
    // cy.get(':nth-child(12) > div > div > div:nth-child(4) .checkmark').click() //yes

    //injuries
    cy.get(':nth-child(14) > :nth-child(1) > :nth-child(1) > :nth-child(2) .checkmark').click() //no
    // cy.get(':nth-child(39) > :nth-child(1) > :nth-child(1) > :nth-child(3) .checkmark').click() //yes


    cy.get(':nth-child(2) .cdp-input').clear().type('NA')
    cy.get(':nth-child(3) .cdp-input').clear().type('NA')
    cy.get(':nth-child(4) .cdp-input').clear().type('NA')
    cy.get(':nth-child(13) .cdp-input').clear().type('NA')
    //misc
    cy.get(':nth-child(15) > :nth-child(2) .cdp-input').clear().type('Its a mystery')
    cy.get(':nth-child(18) .cdp-input').clear().type('Facebook')

    //agree
    cy.get('.col-12 > .cdp-field > .checkbox-container > .checkmark').click()

    //Submit Questionnaire
    cy.get('.cdp-form-submit-button').click()
    cy.wait(5000)
    cy.get('.modal-active .wpb_wrapper h2')
        .should('contain.text', 'Questionnaire Submitted')
    cy.get('div:nth-child(2) > div > div.modal-close.modal-close-cross').click({ multiple: true })

})

Cypress.Commands.add('filloutShippingDetails',(user)=>{
    cy.get('#shipping_name').type(user.name)
    cy.get('#shipping_street1').type('51251 New Address')
    cy.get('#shipping_city').type('new city')
    cy.get('#shipping_state_us').select(user.state)
    cy.get('#shipping_postal_code').type('42012')
    cy.get('#shipping_country').select('United States')
    cy.get('#shipping_phone').type(user.phone)
    cy.contains('Save address').click()
})

Cypress.Commands.add('verifyAssignedClient',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
    cy.wait(2000);

    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(5000)

    cy.contains('.vuetable-body td', record.email)
        .parent()
        .within($tr => {
            cy.get('td.vuetable-td-trainer_name')
                .should('have.text', record.trainer)
            cy.get('td.vuetable-td-status')
                .should('have.text', 'active')
        })
})

Cypress.Commands.add('verifyAssignedClientOTP',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
    cy.wait(2000);

    cy.get('#__BVID__17').select('One-Time Plans')      //filter as Order
    cy.wait(2000)
    cy.get('#__BVID__19').select('Not Sent')        //filte Not Sent
    cy.wait(2000)
    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(5000)

    cy.contains('.vuetable-body td', record.email)
        .parent()
        .within($tr => {
            cy.get('td.vuetable-td-trainer_name')
                .should('have.text', record.trainer)
            cy.get('td.vuetable-td-status')
                .should('have.text', 'active')
        })
})

Cypress.Commands.add('verifyAssignedClientSubs',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
    cy.wait(2000);

    cy.get('#__BVID__17').select('Subscriptions')       //filter as subscription
    cy.wait(2000)
    cy.get('#__BVID__19').select('Not Sent')
    cy.wait(2000)
    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(5000)

    cy.contains('.vuetable-body td', record.email)
        .parent()
        .within($tr => {
            cy.get('td.vuetable-td-trainer_name')
                .should('have.text', record.trainer)
            cy.get('td.vuetable-td-status')
                .should('have.text', 'active')
        })
})