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
            
            const userEmail = 'cytest05otpFatLosHim0808@example.net';


            cy.contains('Users').click();
            cy.get('#__BVID__16').clear().type(userEmail +'{enter}')
            cy.contains('.vuetable-body td', userEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('button[title=Impersonate]').click()
                })

            //already in impersonate page
            cy.contains('Edit Profile').click();
            cy.get('#email').should('contain.value', userEmail);
            cy.get('#questionnaire').click();
            
            //verify corrent client questionnaire is displayed
            cy.get('.cdp-form',{timeout:2000});
            cy.get('input[name=email]').should('contain.value', userEmail)
            cy.filloutQuestionnaire();
            //cy.filloutGoldQuestionnaire();
        
            })    
         })

    })