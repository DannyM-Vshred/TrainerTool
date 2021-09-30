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
    cy.get('#menu1').contains('Login').click()
    cy.get('#email').clear().type('trainer-one@example.com');
    cy.get('#password').type('123456');
    cy.get('[type="submit"]').click();

    cy.contains('Welcome to the admin dashboard').should('be.visible');
})

Cypress.Commands.add('loginSalesAgent', () => {
    cy.get('#menu1').contains('Login').click()
    cy.get('#email').clear().type('testSalesAgent@vshred.com');
    cy.get('#password').type('1234567');
    cy.get('[type="submit"]').click();

    cy.contains('Welcome to the admin dashboard').should('be.visible');
})

Cypress.Commands.add('typeUserInfo', (user) => {
    cy.get('#name', { timeout: 2000 }).clear().type(user.name)
    cy.get('#email').clear().type(user.email)
    cy.get('#phone').clear().type('8152563232')
    cy.contains('Next Step').click();
})

Cypress.Commands.add('typeUserInfoSupp', (user) => {
    cy.get('#name', { timeout: 2000 }).clear().type(user.name)
    cy.get('#email').clear().type(user.email)
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
    cy.get('#braintree-hosted-field-expirationDate')
        .then(function ($iframe) {
            var iExpDate = $iframe.contents().find('#expiration')
            cy.wrap(iExpDate)
                .type('1225')
    })
    // CVV
    cy.get('#braintree-hosted-field-cvv')
        .then(function ($iframe) {
            var iCvv = $iframe.contents().find('#cvv')
            cy.wrap(iCvv)
                .type('644')
    })
    // Postal Code
    cy.get('#braintree-hosted-field-postalCode')
        .then(function ($iframe) {
            var iPostalCode = $iframe.contents().find('#postal-code')
            cy.wrap(iPostalCode)
                .type('90210')
    })
    cy.get('.expand-area-2 > .expand-inputs > .next-step').click()
    
})

Cypress.Commands.add('typePaymentInfoSupplement', () => {
    // Enter Payment Information
    cy.get('#braintree-hosted-field-number')
        .then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
                .find('#credit-card-number')
                .type('4242424242424242')
        });
    // expiration date
    cy.get('#braintree-hosted-field-expirationDate')
        .then(function ($iframe) {
            var iExpDate = $iframe.contents().find('#expiration')
            cy.wrap(iExpDate)
                .type('1225')
    })
    // CVV
    cy.get('#braintree-hosted-field-cvv')
        .then(function ($iframe) {
            var iCvv = $iframe.contents().find('#cvv')
            cy.wrap(iCvv)
                .type('644')
    })
    // Postal Code
    cy.get('#braintree-hosted-field-postalCode')
        .then(function ($iframe) {
            var iPostalCode = $iframe.contents().find('#postal-code')
            cy.wrap(iPostalCode)
                .type('90210')
    })
    cy.get('span[test-id=next-step-button-two]').contains('Next Step').click()
    cy.wait(3000)
})

Cypress.Commands.add('enterPaymentInfoAdmin', () => {
    // Enter Payment Information in Admin Dashboard
    cy.get('#braintree-hosted-field-number')
            .then(($iframe) => {
                const $body = $iframe.contents().find('body')
                cy.wrap($body)
                    .find('#credit-card-number')
                    .type('4242424242424242')
            })
        //expiration date
        cy.get('#braintree-hosted-field-expirationDate')
            .then(function ($iframe) {
                var iExpDate = $iframe.contents().find('#expiration')
                cy.wrap(iExpDate)
                    .type('1225')
        })
        // CVV
        cy.get('#braintree-hosted-field-cvv')
            .then(function ($iframe) {
                var iCvv = $iframe.contents().find('#cvv')
                cy.wrap(iCvv)
                    .type('644')
        })
        // Postal Code
        cy.get('#braintree-hosted-field-postalCode')
            .then(function ($iframe) {
                var iPostalCode = $iframe.contents().find('#postal-code')
                cy.wrap(iPostalCode)
                    .type('90210')
        })
        cy.get('#submitTransaction').click()

        cy.wait(1500)
        cy.get('.toast-success .toast-message').should('contain.text', 'Payment successful')

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
          cy.url().then(($url)=>{
            if($url.includes('/member/profile')){
              cy.contains('Logout', { timeout: 4000 }).click()
                    } else{
                        cy.contains('Edit Profile').click()
                        cy.contains('Logout', { timeout: 4000 }).click()
                    }
                })
        //   cy.contains('Logout', { timeout: 4000 }).click()
        }
    })
})

Cypress.Commands.add('filloutQuestionnaire', () => {
    //questionnaire details       
    //birthday
    cy.get('input[name=birthday]').clear().type('1995-05-15');

    //country
    cy.get("input[name='Country']").clear().type('US')

    //height feet
    cy.get('select[name=height_feet]').select('5');
    //height inches
    cy.get('select[name=height_inches]').select('7');

    //weight
    cy.get('input[name=weight]').clear().type('230');

    //weight unit
    cy.get('input[name=weight_unit][value=KG]').next().click()
    // cy.get('input[name=weight_unit][value=LB]').next().click()

    //gender
    // cy.get('input[name=gender][value=male]').next().click()
    cy.get('input[name=gender][value=female]').next().click()

    //activity level
    // cy.get('input[name=daily_activity_level][value="Moderate (manual labor)"]').next().click()
    cy.get('input[name=daily_activity_level][value="Light (office/desk work)"]').next().click()
    // cy.get('input[name=daily_activity_level][value="Heavy (physically demanding)"]').next().click()

    //average gym time
    // cy.get('input[name=average_gym_time][value=None]').next().click()
    // cy.get('input[name=average_gym_time][value="4+ Days per Week"]').next().click()
    cy.get('input[name=average_gym_time][value="1-3 Days Per Week"]').next().click()

    //diet Preference
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) // none 
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) // paleo 
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) .checkmark').click({waitForAnimations : false}) // vegan
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click({ waitForAnimations: false }) // vege
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click({ waitForAnimations: false }) // gluten
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) .checkmark').click({waitForAnimations : false}) // pescatarian
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) .checkmark').click({waitForAnimations : false}) // lactose free
    // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) .checkmark').click({waitForAnimations : false}) // low glycemic

    //other diet preferences
    cy.get('input[name=other_dietary_prefs]').clear().type('Too many to discuss')

    //Diet Style
    // cy.get(':nth-child(15) > div > div > div:nth-child(2) .checkmark').click() //keto
    // cy.get(':nth-child(15) > div > div > div:nth-child(3) .checkmark').click() //carb cycling
    // cy.get(':nth-child(15) > div > div > div:nth-child(4) .checkmark').click() //balanced
    // cy.get(':nth-child(15) > div > div > div:nth-child(5) .checkmark').click() //intermittent fast
    cy.get(':nth-child(15) > div > div > div:nth-child(6) .checkmark').click() //trainer recommend

    //Cooking Prep
    cy.get('input[name=simple_or_complex_recipe][value=simple]').next().click()
    // cy.get('input[name=simple_or_complex_recipe][value=Complex]').next().click()

    //fav Foods
    cy.get('textarea[name=favorite_foods]').clear().type('Burgers, Fries, Salmon, Pasta, Huge Steak')

    //least fav Foods
    cy.get('textarea[name=least_favorite_foods]').clear().type('Fish')

    //not eat Foods
    cy.get('textarea[name=food_you_wont_eat]').clear().type('Hotdogs')

    //allergies
    cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //No
    cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({ waitForAnimations: false }) //yes

    //food allergies
    cy.get('input[name=food_allergies').clear().type('Peanuts')

    //fitness goals
    // cy.get('input[name=fitness_goals][value="Gain Muscle"]').next().click()
    // cy.get('input[name=fitness_goals][value="Weight Loss"]').next().click()
    cy.get('input[name=fitness_goals][value="Improve Health"]').next().click()
    // cy.get('input[name=fitness_goals][value="Overcome Injury"]').next().click()
    // cy.get('input[name=fitness_goals][value="Improve Strength"]').next().click()
    // cy.get('input[name=fitness_goals][value="Weight Loss"]').next().click()
    // cy.get('input[name=fitness_goals][value="Gain Muscle"]').next().click()
    // cy.get('input[name=fitness_goals][value="Decrease Body Fat"]').next().click()
    
    //workout body part
    cy.get('textarea[name=body_part_improvement]').clear().type('lean mean machine')

    //lifting weights
    cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
    // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) //Yes

    // if active
    //if actively length
    cy.get('input[name=activity_length]').clear().type('so long ago')

    //time allowance
    cy.get('input[name=time_allowance]').clear().type('you tell me')

    //weekly routine
    cy.get('textarea[name=weekly_routine]').clear().type('Eat, Work, Sleep, Play and repeat')
    
    //why inactive
    cy.get('textarea[name=why_inactive]').clear().type('figure it out...')

    //fav exercise
    cy.get('textarea[name=favorite_exercises]').clear().type('sleeping while running...')
    
    //least fav exercise
    cy.get('textarea[name=least_favorite_exercises]').clear().type('gym training')
    

    //Gym access
    cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
    // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations : false}) //Yes

    //impt support area
    cy.get('textarea[name=important_support_area]').clear().type('Train me...')
    
    //how many hours of sleep
    cy.get('input[name=hours_sleep]').clear().type('Check my Lifestyle')           
    
    //stress level
    cy.get('select[name=stress_level]').select('10 - Intense Stress')

    //stress factors
    cy.get('textarea[name=stress_factors]').clear().type('Work, Exercise routines')

    //fam overweight
    // cy.get('input[name=family_overweight][value=no]').next().click()
    cy.get('input[name=family_overweight][value=yes]').next().click()

    //self overweight
    cy.get('input[name=self_overweight][value=no]').next().click()
    // cy.get('input[name=self_overweight][value=yes]').next().click()

    //always overweight
    // cy.get('input[name=always_overweight][value=no]').next().click()
    cy.get('input[name=always_overweight][value=yes]').next().click()
    // cy.get('input[name=always_overweight][value="n/a"]').next().click()

    //injuries
    cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(2) .checkmark').click() //no
    // cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(3) .checkmark').click() //yes

    //list of injuries
    cy.get('input[name=injuries_list]').clear().type('Secret')


    //health condition
    cy.get('textarea[name=health_conditions]').clear().type('Eat, Work, Sleep, Play and repeat')

    //supplements taken
    cy.get('textarea[name=supplements_taken]').clear().type('brain booster, vitamins and minerals')

    //additional comments
    cy.get('textarea[name=additional_comments]').clear().type('Additional comments')

    //referal source
    cy.get('input[name=referral_source]').clear().type('Guess Who')

    //deciding factor
    cy.get('textarea[name=deciding_factor]').clear().type('factoring the decision to decide')

    //agree
    cy.get('.col-12 > .cdp-field > .checkbox-container > .checkmark').click()

    //Submit Questionnaire
    cy.get('.cdp-form-submit-button').click()
    cy.get('.modal-active .wpb_wrapper h2')
        .should('contain.text', 'Questionnaire Submitted')
    cy.get('div.modal-content .modal-close.modal-close-cross').click({multiple:true, force:true})
    // cy.get('div:nth-child(2) > div > div.modal-close.modal-close-cross').click({ multiple: true })

})

Cypress.Commands.add('filloutGoldQuestionnaire', () => {
    //questionnaire details       
    cy.url().should('include','/gold-program-questionnaire')

    //health injuries
    cy.get('input[name=any_injuries][value=yes]').next().click()
    // cy.get('input[name=any_injuries][value=no]').next().click()

    //why inactive text area
    cy.get('textarea[name=why_inactive]').clear().type('Reasons.. all the reasons')

    //fav exercise
    cy.get('textarea[name=favorite_exercises]').clear().type('walking, jogging and you know...')
    
    //least fav exercise
    cy.get('textarea[name=least_favorite_exercises]').clear().type('gym exercises')

    //access to gym
    cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //no
    // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({ waitForAnimations: false }) //yes

    //impt support area
    cy.get('textarea[name=important_support_area]').clear().type('Reasons.. all the reasons')

    //hours of sleep
    cy.get('input[name=hours_sleep]').clear().type('5')

    //stress level
    cy.get('select[name=stress_level]').select('8')

    //stress factors
    cy.get('textarea[name=stress_factors]').clear().type('Work, Exercise routines')

    //fam overweight
    // cy.get('input[name=family_overweight][value=no]').next().click()
    cy.get('input[name=family_overweight][value=yes]').next().click()

    //self overweight
    // cy.get('input[name=self_overweight][value=no]').next().click()
    cy.get('input[name=self_overweight][value=yes]').next().click()

    //always overweight
    // cy.get('input[name=always_overweight][value=no]').next().click()
    // cy.get('input[name=always_overweight][value=yes]').next().click()
    cy.get('input[name=always_overweight][value="n/a"]').next().click()

    //weekly routine
    cy.get('textarea[name=weekly_routine]').clear().type('Eat, Work, Sleep, Play and repeat')

    //list of injuries
    cy.get('input[name=injuries_list]').clear().type('Secret')

    //health condition
    cy.get('textarea[name=health_conditions]').clear().type('Eat, Work, Sleep, Play and repeat')

    //supplements taken
    cy.get('textarea[name=supplements_taken]').clear().type('brain booster, vitamins and minerals')

    //additional comments
    cy.get('textarea[name=additional_comments]').clear().type('Additional comments')

    //referral source
    cy.get('input[name=referral_source]').clear().type('Guess Who')

    //deciding factor
    cy.get('textarea[name=deciding_factor]').clear().type('factoring the decision to decide')

    //term condition
    cy.get('input[name=terms_conditions]').next().click()

    //Diet Preference
    // cy.get('input[name=diet_style_preferences][value="Keto"]').next().click()
    // cy.get('input[name=diet_style_preferences][value="Carb Cycling"]').next().click()
    // cy.get('input[name=diet_style_preferences][value="Balanced Diet"]').next().click()
    cy.get('input[name=diet_style_preferences][value="Intermittent Fasting"]').next().click()
    // cy.get('input[name=diet_style_preferences][value="Trainer Recommendation"]').next().click()

    //Recipe
    // cy.get('input[name=simple_or_complex_recipe][value=simple]').next().click()
    cy.get('input[name=simple_or_complex_recipe][value=Complex]').next().click()

    //food you wont eat
    cy.get('textarea[name=food_you_wont_eat]').clear().type('Vegetables, Liver')

    //phone number
    cy.get('input[name=phone_number]').clear().type('8185254510')

    //Dietary Preference
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({waitForAnimations:false})  //None
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations:false})  //Paleo
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) .checkmark').click({waitForAnimations:false})  //Vegan
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click({waitForAnimations:false})  //Vegtarian
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click({waitForAnimations:false})  //Gluten Free
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) .checkmark').click({waitForAnimations:false})  //Pescatarian
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) .checkmark').click({waitForAnimations:false})  //Lactose Free
    cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) .checkmark').click({waitForAnimations:false})  //Low Gycemic

    //birthday
    cy.get('input[name=birthday]').clear().type('2000-01-01');

    //country
    cy.get('input[name=Country]').clear().type('USA');

    //height feet
    cy.get('select[name=height_feet]').select('5');

    //height inches
    cy.get('select[name=height_inches]').select('11');

    //weight
    cy.get('input[name=weight]').clear().type('200');

    //weight unit
    cy.get('input[name=weight_unit][value=KG]').next().click()
    // cy.get('input[name=weight_unit][value=LB]').next().click()

    //gender
    // cy.get('input[name=gender][value=male]').next().click()
    cy.get('input[name=gender][value=female]').next().click()

    //activity level
    // cy.get('input[name=daily_activity_level][value="Moderate (manual labor)"]').next().click()
    // cy.get('input[name=daily_activity_level][value="Light (office/desk work)"]').next().click()
    cy.get('input[name=daily_activity_level][value="Heavy (physically demanding)"]').next().click()

    //average gym time
    // cy.get('input[name=average_gym_time][value=None]').next().click()
    cy.get('input[name=average_gym_time][value="4+ Days per Week"]').next().click()
    // cy.get('input[name=average_gym_time][value="1-3 Days Per Week"]').next().click()

    //other diet preferences
    cy.get('input[name=other_dietary_prefs]').clear().type('Too many to discuss')

    //least fav food
    cy.get('textarea[name=least_favorite_foods]').clear().type('Fish')

    //fav food
    cy.get('textarea[name=favorite_foods]').clear().type('Burgers, Fries, Salmon, Pasta, Huge Steak')

    //has food allergies
    // cy.get('#has_food_allergies\\[\\] input[value=yes]').click({waitForAnimations:false})
    cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations:false})   //no
    // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations:false})   //yes
    // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) > label > span.checkmark')

    //food allergies
    cy.get('input[name=food_allergies').clear().type('None')

    //fitness goals
    // cy.get('input[name=fitness_goals][value="Gain Muscle"]').next().click()
    // cy.get('input[name=fitness_goals][value="Weight Loss"]').next().click()
    // cy.get('input[name=fitness_goals][value="Improve Health"]').next().click()
    // cy.get('input[name=fitness_goals][value="Overcome Injury"]').next().click()
    // cy.get('input[name=fitness_goals][value="Improve Strength"]').next().click()
    // cy.get('input[name=fitness_goals][value="Weight Loss"]').next().click()
    // cy.get('input[name=fitness_goals][value="Gain Muscle"]').next().click()
    cy.get('input[name=fitness_goals][value="Decrease Body Fat"]').next().click()

    //workout body part
    cy.get('textarea[name=body_part_improvement]').clear().type('Chest, Back, Thigh, Abs')

    //lifting weights
    cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click({ waitForAnimations: false }) //No
    // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click({waitForAnimations : false}) //Yes

    //if actively lifting
    cy.get('input[name=activity_length]').clear().type('10 minutes ago')

    //if actively lifting
    cy.get('input[name=time_allowance]').clear().type('30 minutes or less')

    //Submit Questionnaire
    cy.contains('Submit').click()
    cy.get('.modal-active .wpb_wrapper h2')
        .should('contain.text', 'Gold Program Questionnaire Submitted')
    cy.get('div.modal-content .modal-close.modal-close-cross').click({multiple:true, force:true})

})

Cypress.Commands.add('filloutShippingDetails',(user)=>{
    cy.get('#shipping_name').type(user.name)
    cy.get('#shipping_street1').type('Test 4639 Rockford Road')
    cy.get('#shipping_city').type('Reno')
    cy.get('#shipping_state_us').select('Nevada')
    cy.get('#shipping_postal_code').type('89501')
    cy.get('#shipping_country').select('United States')
    cy.get('#shipping_phone').type(user.phone)
    cy.contains('Save address').click()
    cy.wait(2000)
})

Cypress.Commands.add('filloutSupplementShippinginfo',(user)=>{
    cy.get('#shipping_name').type(user.name)
    cy.get('#shipping_street1').type('Test 478 Eagle Lake Rd')
    cy.get('#shipping_city').type('Susanville')
    cy.get('#shipping_state_us').select("California")
    cy.get('#shipping_postal_code').type('96130')
    cy.get('#shipping_country').select('United States')
    cy.get('#shipping_phone').type("530-257-0914")
    cy.get('.next-step.button-two').contains('Next Step').click()
})

Cypress.Commands.add('verifyAssignedClient',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
    cy.wait(2000);

    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');

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
    cy.wait(500);

    cy.get('#__BVID__17').select('One-Time Plans')      //filter as Order

    cy.get('#__BVID__19').select('Not Sent')        //filter Not Sent
    // cy.get('#__BVID__19').select('Sent')        //filter Not Sent

    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(500)

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
    cy.wait(500);

    cy.get('#__BVID__17').select('Subscriptions')       //filter as subscription
    cy.get('#__BVID__19').select('Not Sent')
    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(500)

    cy.contains('.vuetable-body td', record.email)
        .parent()
        .within($tr => {
            cy.get('td.vuetable-td-trainer_name')
                .should('have.text', record.trainer)
            cy.get('td.vuetable-td-status')
                .should('have.text', 'active')
        })
})

Cypress.Commands.add('verifyRecordNotInAssignedClientPage',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
    cy.wait(500);

    cy.get('#__BVID__17').select('All')       //filter as subscription
    cy.get('#__BVID__19').select('All')
    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(500)

    cy.contains('.vuetable-body td', record.email)
        .should('not.exist')
})

Cypress.Commands.add('verifyRecordNotInUnassignedPlansPage',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Unassigned Plans').click();       //assigned clients beta page
    cy.wait(500);

    cy.get('#__BVID__24').select('All')       //filter as subscription
    cy.get('#__BVID__25').select('All')
    cy.get('#__BVID__20').clear('{enter}')
    cy.wait(500)
    cy.get('#__BVID__23').clear('{enter}')
    cy.wait(500)
    cy.get('#__BVID__21')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(500)

    cy.contains('.vuetable-body td', record.email)
        .should('not.exist')
})

Cypress.Commands.add('verifyOTPInUnassignedPlansPage',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Unassigned Plans').click();       //assigned clients beta page
    cy.wait(2000);

    cy.get('#__BVID__24').select('All')       //filter as subscription
    cy.get('#__BVID__25').select('All')
    cy.get('#__BVID__20').clear('{enter}')
    cy.get('#__BVID__23').clear('{enter}')
    cy.wait(1000)
    cy.get('#__BVID__21')
        .clear()
        .type(record.email + '{enter}');

    cy.contains('.vuetable-body td', record.email)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('td.vuetable-td-purchase_type')
                .should('have.text', 'Single')
            cy.get('td.vuetable-td-status')
                .should('have.text', 'Active')
    })
})

Cypress.Commands.add('verifySubInUnassignedPlansPage',(record)=>{
    cy.contains('Trainer Tool').click();
    cy.contains('Unassigned Plans').click();       //assigned Unassigned Plans
    cy.wait(2000);

    cy.get('#__BVID__24').select('All')       
    cy.get('#__BVID__25').select('All')
    cy.get('#__BVID__20').clear('{enter}')
    cy.wait(500)
    cy.get('#__BVID__23').clear('{enter}')
    cy.wait(500)
    cy.get('#__BVID__21')
        .clear()
        .type(record.email + '{enter}');
    cy.wait(500)

    cy.contains('.vuetable-body td', record.email)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('td.vuetable-td-purchase_type')
                .should('have.text', 'Recurring')
            cy.get('td.vuetable-td-status')
                .should('have.text', 'Active')
    })
})

Cypress.Commands.add('assignTrainer',(record)=> {
    cy.contains('.vuetable-body td', record.email)
    .should('exist')
    .parent()
    .within($tr => {
        cy.get('.vuetable-slot .multiselect__placeholder')
            .click()
            .get('.multiselect__input')
            .type(record.trainer + '{enter}')
    })
    cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

})

Cypress.Commands.add('uploadPlan', (record) => {
    const filepath = 'uploadFile/sample-pdf-file.pdf'

    cy.contains('Trainer Tool').click();
    cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
    cy.wait(2000);

    cy.get('#__BVID__17').select('All')      //filter as Order
    cy.get('#__BVID__19').select('All')        //filte Not Sent
    cy.get('#__BVID__16')
        .clear()
        .type(record.email + '{enter}');

    cy.contains('.vuetable-body td', record.email)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('button.btn').contains('Upload').click()
        })
        cy.get('input[type="file"]').attachFile(filepath)
        cy.get('div.drop-zone__inner').should('contain', 'sample-pdf-file.pdf')
        cy.get('button').contains('Upload & Send').click()
        cy.wait(2000)

    cy.get('p.toast-text')
        .should('contain.text', 'Uploaded custom plan and notified client')
    cy.get('p.toast-text').contains('Uploaded and sent plan PDF')
        .should('be.visible')

    cy.get('#__BVID__19').select('Sent')
    cy.wait(2000)
    cy.contains('.vuetable-body td', record.email)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('i.fas.fa-check.checkmark').should('be.visible').click({force:true})
        })
    cy.contains("Files sent to ").should('be.visible')
    cy.get('.list-group-item h3').then(($filename) => {
        const filename = $filename.text()
        expect(filename).to.match(/sample-pdf-file.pdf/)
    })
    cy.get('.btn.btn-block').contains('Close').click()

    // cy.get('#__BVID__19').select('Not Sent')
    // cy.wait(2000)
    // cy.contains('.vuetable-body td', record.email)
    //     .should('not.exist')
})

Cypress.Commands.add('createNewMemberUser', (record) => {
    cy.get('button[title="Create user"]').click()
    cy.get('#createFormModal___BV_modal_header_')
        .should('contain.text', 'Create User')
    cy.get('#user-name').clear().type(record.name)
    cy.get('#user-email').clear().type(record.email)
    cy.get('#user-password').clear().type('Vshred99')
    cy.get('#user-confirm').clear().type('Vshred99')
    cy.get('#user-status').select('Member')
    cy.get('button').contains('Save').click()
    cy.get('.ibox-content > h2').should('contain.text',record.name)
})

Cypress.Commands.add('addNewShipBillAddress',(record) =>{
    // add new Shipping address
    cy.get('button').contains('Add Shipping Address').click()
    cy.get('button').contains('New Address').click()
    cy.get('#input_name').clear().type(record.shipname)
    cy.get('#input_phone').clear().type(7863749833)
    cy.get('#input_address_line_1').clear().type('Test 4920 Rinehart Road')
    cy.get('#input_address_line_2').clear().type('Pure Lane Avenue')
    cy.get('#input_city').clear().type('Miami')
    cy.get('#input_state').clear().type('Florida')
    cy.get('#input_zip').clear().type('33169')
    cy.get('footer[id=addAddressModal___BV_modal_footer_] .btn.btn-primary').contains('OK').click()
    cy.get('[aria-colindex="11"] > .btn').click()

    cy.get('tbody[role=rowgroup]').within(($tr)=>{
        cy.get('button').contains('Use Address').click()
    })
    cy.wait(2000)

    // use shipping address as billing address
    cy.get('button').contains('Add Billing Address').click()
    cy.get('button').contains('Use Address').click()
})

Cypress.Commands.add('skipPromoVideos',()=>{
    cy.window().then((win) => {
        win.eval("javascript:(function(){document.querySelectorAll('.page-contents-lazy').forEach(el => el.style.display = 'block');document.querySelectorAll('.after-banner').forEach(el => el.style.display = 'block');})();")

       });
    cy.wait(2000)
})

Cypress.Commands.add('viewWebPlanSent',(record)=>{       
    cy.get('#side-menu').contains('Users').click()
    cy.url().should('contain', '/admin/users')
    cy.get('#__BVID__16').clear().type( record.email+'{enter}')

    // cy.get('#__BVID__16').clear().type(searchMail + '{enter}')
    cy.contains('.vuetable-body td', record.email)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('button[title=Impersonate]').click()
            cy.url().should('include', '/member')
        })

        cy.contains('VIEW MY CUSTOM PLAN').should('be.visible').click()
        cy.contains('sample-pdf-file.pdf').should('be.visible')
        // cy.get('button[id=view-custom-plan-362]').should('be.visible').then(($filename)=>{          ///possible check user ID 367
        //     const webPlanfile = $filename.text()
        //     expect(webPlanfile).to.include('sample-pdf-file.pdf')
        // })
})

Cypress.Commands.add('stopImpersonating',()=>{
    cy.get('#menu1').contains('Admin').click()
    cy.get('.dropdown--active').contains('Stop impersonating').click({force:true})
})

Cypress.Commands.add('logoutAdminTool',()=>{
    cy.contains('Logout').click({multiple:true, force:true})
    
})

///URL under test
Cypress.Commands.add("envUnderTest", (urlUnderTest) => {
    cy.visit(urlUnderTest)
});


Cypress.Commands.add('getTrainerLink',function (record){
    let trainerLink = "/sp/custom-diet-plan/reup/?utm_source=trainers&utm_medium=zendesk&utm_campaign=referral&utm_content=" +  record.trainer + "&utm_term=" + record.id
    cy.envUnderTest(""+Cypress.env(record.envi)+trainerLink+"")

})
