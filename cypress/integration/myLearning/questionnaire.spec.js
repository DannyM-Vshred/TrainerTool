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
            cy.get('#menu1').contains('Login').click()
            cy.get('@loginData').then(json=>{
                cy.get('#email').clear().type(json[2].email);
                cy.get('#password').type(json[2].password);
                cy.get('[type="submit"]').click();
            
            cy.contains('Welcome to the admin dashboard').should('be.visible');
    
            // Search Test Users
            
            const userEmail = 'cytest10goldsubs@example.com';


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
            cy.get('input[name=email]').should('contain.text', userEmail)
            // cy.get(':nth-child(27) > div > div > input').should('contain.value', userEmail);
            cy.filloutQuestionnaire();

            // //questionnaire details
            
            // //birthday
            // cy.get("input[type='date']").type('1999-01-05');
            
            // //country
            // cy.get("input[name='Country']").clear().type('US')
            
            // //height
            // cy.get("select[name='height_feet']").select('5')
            // cy.get("select[name='height_inches']").select('8')

            // //weight
            // cy.get("input[name='weight']").clear().type('230')          
            // //weight unit
            // // cy.get(':nth-child(9) > div > div > div:nth-child(2) checkmark').click() //kg
            // cy.get(':nth-child(9) > div > div > div:nth-child(3) .checkmark').click() //lbs
                      
            // //Gender
            // cy.get(':nth-child(10) > div > div > div:nth-child(2) .checkmark').click() //male
            // // cy.get(':nth-child(10) > div > div > div:nth-child(3) .checkmark').click() //female
            
            // //activity level
            // cy.get(':nth-child(11) > div > div > div:nth-child(2) .checkmark').click() //moderate
            // // cy.get(':nth-child(11) > div > div > div:nth-child(3) .checkmark').click() //light
            // // cy.get(':nth-child(11) > div > div > div:nth-child(4) .checkmark').click() //hard

            // //Gym TimeSpent
            // cy.get(':nth-child(12) > div > div > div:nth-child(2) .checkmark').click() //none
            // // cy.get(':nth-child(12) > div > div > div:nth-child(3) .checkmark').click() //4+ Days
            // // cy.get(':nth-child(12) > div > div > div:nth-child(4) .checkmark').click() //<4Days

            // //diet Preference
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() // none 
            // // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click() // paleo 
            // // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(3) .checkmark').click() // vegan
            // // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(4) .checkmark').click() // vege
            // // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(5) .checkmark').click() // gluten
            // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(6) .checkmark').click() // pescatarian
            // // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(7) .checkmark').click() // lactose free
            // // cy.get('#dietary_preferences\\[\\]-checkbox-field > div:nth-child(8) .checkmark').click() // low glycemic

            // //Other diet
            // cy.get(':nth-child(14) .cdp-input').type('new purchase - web Custom for Him')
            
            // //Diet Style
            // // cy.get(':nth-child(15) > div > div > div:nth-child(2) .checkmark').click() //keto
            // // cy.get(':nth-child(15) > div > div > div:nth-child(3) .checkmark').click() //carb cycling
            // // cy.get(':nth-child(15) > div > div > div:nth-child(4) .checkmark').click() //balanced
            // // cy.get(':nth-child(15) > div > div > div:nth-child(5) .checkmark').click() //intermittent fast
            // cy.get(':nth-child(15) > div > div > div:nth-child(6) .checkmark').click() //trainer recommend

            // //Cooking Prep
            // cy.get(':nth-child(16) > div > div > div:nth-child(2) .checkmark').click() //simple
            // // cy.get(':nth-child(16) > div > div > div:nth-child(2) .checkmark').click() //complex
            
            // //fav Foods
            // cy.get(':nth-child(17) .cdp-input').clear().type('burgers')
            
            // //least fav Foods
            // cy.get(':nth-child(18) .cdp-input').clear().type('vegetables')
            
            // //not eat Foods
            // cy.get(':nth-child(19) .cdp-input').clear().type('hotdogs')

            // //allergies
            // // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //No
            // cy.get('#has_food_allergies\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click() //yes

            // //food allergies
            // cy.get(':nth-child(21) .cdp-input').clear().type('peanuts')
            
            // //fitness goals
            // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(2) .checkmark').click() // gainMuscle
            // // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(3) .checkmark').click() // weightLoss
            // // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(4) .checkmark').click() // improveHealth
            // // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(5) .checkmark').click() // overcomeInjury
            // // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(6) .checkmark').click() // improveStrength
            // // cy.get(':nth-child(22) > div:nth-child(2) > div > div:nth-child(7) .checkmark').click() // decreaseBodyFat

            // //additional goal
            // cy.get(':nth-child(23) .cdp-input').type('lean mean machine')
            
            // //lifting weights
            // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //No
            // // cy.get('#currently_active\\[\\]-checkbox-field > div:nth-child(2) .checkmark').click() //Yes
            
            // // if active
            // cy.get(':nth-child(25) .cdp-input').clear().type('so long ago')
            // cy.get(':nth-child(26) .cdp-input').clear().type('you tell me')
            // cy.get(':nth-child(27) .cdp-input').clear().type('active alright')
            // cy.get(':nth-child(28) .cdp-input').clear().type('figure it out')
            // cy.get(':nth-child(29) .cdp-input').clear().type('sleep')
            // cy.get(':nth-child(30) .cdp-input').clear().type('train')

            // //Gym access
            // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //No
            // // cy.get('#gym_access\\[\\]-checkbox-field > div:nth-child(1) .checkmark').click() //Yes

            // //help to reach goal
            // cy.get(':nth-child(32) .cdp-input').clear().type('Train me')     
            
            // //how many hours of sleep           
            // cy.get(':nth-child(33) .cdp-input').clear().type('Check my Lifestyle')     

            // //stress level
            // cy.get(':nth-child(34) .cdp-input').select('9')
            // cy.get(':nth-child(35) .cdp-input').type('1,2,3')     
            
            // //overweight
            // cy.get(':nth-child(36) > div > div > div:nth-child(2) .checkmark').click() //no
            // // cy.get(':nth-child(36) > div > div > div:nth-child(3) .checkmark').click() //yes
            
            // cy.get(':nth-child(37) > div > div > div:nth-child(2) .checkmark').click() //no
            // // cy.get(':nth-child(37) > div > div > div:nth-child(3) .checkmark').click() //yes

            // cy.get(':nth-child(38) > div > div > div:nth-child(2) .checkmark').click() //no
            // // cy.get(':nth-child(38) > div > div > div:nth-child(3) .checkmark').click() //na
            // // cy.get(':nth-child(38) > div > div > div:nth-child(4) .checkmark').click() //yes
                       
            // //injuries
            // cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(2) .checkmark').click() //no
            // // cy.get(':nth-child(39) > :nth-child(2) > :nth-child(1) > :nth-child(3) .checkmark').click() //yes
            

            // cy.get(':nth-child(40) .cdp-input').clear().type('NA')
            // cy.get(':nth-child(41) .cdp-input').clear().type('NA')
            // cy.get(':nth-child(42) .cdp-input').clear().type('NA')
            // cy.get(':nth-child(43) .cdp-input').clear().type('NA')
            // //misc
            // cy.get(':nth-child(44) > :nth-child(2) .cdp-input').clear().type('Its a mystery')
            // cy.get(':nth-child(45) .cdp-input').clear().type('Facebook')
            
            // //agree
            // cy.get('.col-12 > .cdp-field > .checkbox-container > .checkmark').click()
            
            // //Submit Questionnaire
            // cy.get('.cdp-form-submit-button').click()


            // cy.wait(5000)
            // cy.get('.modal-active .wpb_wrapper h2')
            //     .should('contain.text','Questionnaire Submitted')
            // cy.get('.modal-active .modal-close-cross').click()
            
            // //Stop impersonating
            // cy.get('#menu1').contains('Admin').click()
            // cy.get('.menu-vertical li').contains('Stop impersonating').click()

            // //check record in Unassigned Plans page
            // cy.contains('Trainer Tool').click();
            // cy.contains('Unassigned Plans').should('exist');
            // cy.contains('Unassigned Plans').click();
            // cy.wait(10000);

            // cy.get('#__BVID__21').type(userEmail+'{enter}');
            // cy.get('.vuetable-td-email').contains(userEmail).should('exist')

            })    
         })

    })