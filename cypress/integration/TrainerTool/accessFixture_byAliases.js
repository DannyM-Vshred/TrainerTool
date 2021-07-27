/// <reference types="cypress" />


describe('Login Tests using Alias', () =>{
// accessing the fixture file using alias
    before(()=>{
        cy.fixture('invalidLogin').as ('loginData');
        // cy.visit('https://staging-tt.vshred.com')
        // cy.get('.btn__text').contains('Login').click()
        // cy.visit('https://staging-tt.vshred.com/login')
        cy.visit('/');
    
    })

       it('Invalid Login', () => {
         
        cy.get('@loginData').then(json=>{
            cy.get('#email').clear().type(json[0].email);
            cy.get('#password').type(json[0].password);
            // cy.get('#email').type('@invalidUser.email')
            // cy.get('#password').type('123456')
            cy.get('[type=submit]').click();
   
        //Verify error messages are displayed on invalid login credentials
        // cy.get('[class="toast toast-error"]').should('be.visible')
        cy.get('.toast-message')
            .should('be.visible')
            .and('contain.text', 'Please check the form below for errors.')
        
        cy.get('.help-block')
            .should('contain.text', 'Your email and/or password were invalid.')
        })   
    })

       it('Login as Trainer user',() =>{

        cy.get('@loginData').then(json=>{
            cy.get('#email').clear().type(json[1].email);
            cy.get('#password').type(json[1].password)
            cy.get('[type="submit"]').click()
        
        cy.contains('Welcome to the admin dashboard').should('be.visible');

        // Verify Trainer Tool sub-menu
        cy.contains('Trainer Tool').click();
        cy.contains("Assigned Clients").should('exist')
        cy.contains("Assigned Clients Beta").should('exist')
        // cy.get('[class="nav-label"]').contains('Trainer Tool').click()
        })

    })

    it('Login as Trainer Manager',() =>{

        cy.get('@loginData').then(json=>{
            cy.get('#email').clear().type(json[2].email);
            cy.get('#password').type(json[2].password)
            cy.get('[type="submit"]').click()
        
        cy.contains('Welcome to the admin dashboard').should('be.visible');

        // Verify Trainer Tool sub-menu
        cy.contains('Trainer Tool').click();
        cy.contains('Unassigned Plans').should('exist');
        cy.contains("Assigned Clients").should('exist')
        cy.contains("Assigned Clients Beta").should('exist')
        // cy.get('[class="nav-label"]').contains('Trainer Tool').click()
        
        // Verify Trainers sub-menu
        cy.contains('Trainers').click()
        cy.contains('Active Trainers').should('exist')
        cy.contains('Suspended Trainers').should('exist')
        // cy.get('[class="nav-label"]').contains('Trainers').click()    
    
        })

    })
 
    it.only('can Logout successfully',()=>{

        cy.get('@loginData').then(json=>{
            cy.get('#email').clear().type(json[2].email);
            cy.get('#password').type(json[2].password)
            cy.get('[type="submit"]').click()
        
        cy.contains('Welcome to the admin dashboard').should('be.visible');

        //Logout
        cy.get('.border-bottom li:nth-child(2)').contains('Logout').click();
    })
})
    
})