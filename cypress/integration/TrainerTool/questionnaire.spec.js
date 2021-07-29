/// <reference types="cypress" />


describe('Impersonate Client', () =>{
    // accessing the fixture file using alias
        before(()=>{
            cy.fixture('loginData').as ('loginData');
            cy.visit('/');
            cy.viewport(1280, 720);
            cy.wait(200);
        
        })

        it('Can Impersonate and Submit Questionnaire',() =>{
    
            cy.get('@loginData').then(json=>{
                cy.get('#email').clear().type(json[3].email);
                cy.get('#password').type(json[3].password);
                cy.get('[type="submit"]').click();
            
            cy.contains('Welcome to the admin dashboard').should('be.visible');
    
            // Search Test Users
            const userEmail = 'testwebCTrainHim17@example.net0728';
            cy.contains('Users').click();
            cy.get('#__BVID__16').type(userEmail+'{enter}');
            cy.get('.vuetable-td-email').contains(userEmail).click();
            
                      
            cy.get('[item-index="0"] > .vuetable-td-id');               //userid
            cy.get('.vuetable-slot > .no-wrap :nth-child(2)').click();   //impersonate button

            //already in impersonate page
            cy.contains('Edit Profile').click();
            cy.get('#email').should('contain.value', userEmail);
            cy.get('#questionnaire').click();
            
            //verify corrent client questionnaire is displayed
            cy.get('.cdp-form',{timeout:2000});
            cy.get(':nth-child(3) > div > div > input').should('contain.value', userEmail);
            // cy.get(':nth-child(3) .cdp-input').should('contain.value', userEmail);

            //questionnaire details
            
            //birthday
            // cy.get("input[name='birthday']").type('02-02-1992{enter}')
            cy.get("input[name='Country']").type('US')

            cy.get("select[name='height_feet']").select('5')
            cy.get("select[name='height_inches']").select('8')

            cy.get("input[name='weight']").type('230')
                        
            //weight unit
            // cy.get(':nth-child(9) > div > div > div:nth-child(2) > label > span.checkmark').click() //kg
            cy.get(':nth-child(9) > div > div > div:nth-child(3) > label > span.checkmark').click() //lbs
                      
            //Gender
            cy.get(':nth-child(10) > div > div > div:nth-child(2) > label > span.checkmark').click() //male
            // cy.get(':nth-child(10) > div > div > div:nth-child(3) > label > span.checkmark').click() //female
            
            //activity level
            cy.get(':nth-child(11) > div > div > div:nth-child(2) > label > span.checkmark').click() //moderate
            cy.get(':nth-child(11) > div > div > div:nth-child(3) > label > span.checkmark').click() //light
            cy.get(':nth-child(11) > div > div > div:nth-child(4) > label > span.checkmark').click() //hard

            //Gym TimeSpent
            cy.get(':nth-child(12) > div > div > div:nth-child(2) > label > span.checkmark').click() //none
            cy.get(':nth-child(12) > div > div > div:nth-child(3) > label > span.checkmark').click() //4+ Days
            cy.get(':nth-child(12) > div > div > div:nth-child(4) > label > span.checkmark').click() //<4Days

            //diet Preference
            cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) > label > span.checkmark').click() // none 
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) > label > span.checkmark').click() // paleo 
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) > label > span.checkmark').click() // vegan
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) > label > span.checkmark').click() // vege
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) > label > span.checkmark').click() // gluten
            cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) > label > span.checkmark').click() // pescatarian
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) > label > span.checkmark').click() // lactose free
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) > label > span.checkmark').click() // low glycemic

            //Other diet
            cy.get(':nth-child(14) .cdp-input').type('new purchase - web Custom for Him')
            
            //Diet Style
            // cy.get(':nth-child(15) > div > div > div:nth-child(2) > label > span.checkmark').click() //keto
            // cy.get(':nth-child(15) > div > div > div:nth-child(3) > label > span.checkmark').click() //carb cycling
            // cy.get(':nth-child(15) > div > div > div:nth-child(4) > label > span.checkmark').click() //balanced
            // cy.get(':nth-child(15) > div > div > div:nth-child(5) > label > span.checkmark').click() //intermittent fast
            cy.get(':nth-child(15) > div > div > div:nth-child(6) > label > span.checkmark').click() //trainer recommend

            //Cooking Prep
            cy.get(':nth-child(16) > div > div > div:nth-child(2) > label > span.checkmark').click() //simple
            // cy.get(':nth-child(16) > div > div > div:nth-child(2) > label > span.checkmark').click() //complex
            
            //fav Foods
            cy.get(':nth-child(17) .cdp-input').type('burgers')
            
            //least fav Foods
            cy.get(':nth-child(18) .cdp-input').type('vegetables')
            
            //not eat Foods
            cy.get(':nth-child(19) .cdp-input').type('hotdogs')

            //allergies
            cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(1) > label > span.checkmark').click() //No
            // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) > label > span.checkmark').click() //yes

            //food allergies
            cy.get(':nth-child(21) .cdp-input').type('peanuts')
            
            //fitness goals
            cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(2) > label > span.checkmark').click() // gainMuscle
            // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(3) > label > span.checkmark').click() // weightLoss
            // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(4) > label > span.checkmark').click() // improveHealth
            // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(5) > label > span.checkmark').click() // overcomeInjury
            // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(6) > label > span.checkmark').click() // improveStrength
            // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(7) > label > span.checkmark').click() // decreaseBodyFat

            //additional goal
            cy.get(':nth-child(23) .cdp-input').type('lean mean machine')
            
            //lifting weights
            cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) > label > span.checkmark').click() //No
            // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) > label > span.checkmark').click() //Yes
            
            // if active
            cy.get(':nth-child(25) .cdp-input').type('so long ago')
            cy.get(':nth-child(26) .cdp-input').type('you tell me')
            cy.get(':nth-child(27) .cdp-input').type('active alright')
            cy.get(':nth-child(28) .cdp-input').type('figure it out')
            cy.get(':nth-child(29) .cdp-input').type('sleep')
            cy.get(':nth-child(30) .cdp-input').type('train')

            //Gym access
            cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) > label > span.checkmark').click() //No
            // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) > label > span.checkmark').click() //Yes

            //help to reach goal
            cy.get(':nth-child(32) .cdp-input').type('Train me')        
            cy.get(':nth-child(33) .cdp-input').type('Check my Lifestyle')     
            cy.get(':nth-child(34) .cdp-input').select('9')
            cy.get(':nth-child(35) .cdp-input').type('1,2,3')     
            
            //overweight
            cy.get(':nth-child(36) > div > div > div:nth-child(2) > label > span.checkmark').click() //no
            // cy.get(':nth-child(36) > div > div > div:nth-child(3) > label > span.checkmark').click() //yes
            
            cy.get(':nth-child(37) > div > div > div:nth-child(2) > label > span.checkmark').click() //no
            // cy.get(':nth-child(37) > div > div > div:nth-child(3) > label > span.checkmark').click() //yes

            cy.get(':nth-child(38) > div > div > div:nth-child(2) > label > span.checkmark').click() //no
            // cy.get(':nth-child(38) > div > div > div:nth-child(3) > label > span.checkmark').click() //na
            // cy.get(':nth-child(38) > div > div > div:nth-child(4) > label > span.checkmark').click() //yes
                       
            //injuries
            cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(2) .checkmark').click() //no
            // cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(3) .checkmark').click() //yes
            

            cy.get(':nth-child(40) .cdp-input').type('NA')
            cy.get(':nth-child(41) .cdp-input').type('NA')
            cy.get(':nth-child(42) .cdp-input').type('NA')
            cy.get(':nth-child(43) .cdp-input').type('NA')
            //misc
            cy.get(':nth-child(44) > :nth-child(2) .cdp-input').type('Its a mystery')
            cy.get(':nth-child(45) .cdp-input').type('Facebook')
            
            //agree
            cy.get('.col-12 > .cdp-field > .checkbox-container > .checkmark').click()
            
            //Submit Questionnaire
            cy.get('.cdp-form-submit-button').click()

            })
    
        })








    })