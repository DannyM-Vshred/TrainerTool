/// <reference types="cypress" />

import loginData from '../../fixtures/invalidLogin.json'
describe('Login Tests using Fixture imports', () =>{
// accessing the fixture file through import
    before(()=>{
        // cy.visit('https://staging-tt.vshred.com')
        // cy.get('.btn__text').contains('Login').click()
        // cy.visit('https://staging-tt.vshred.com/login')
        cy.visit('/');
    
    })

       it.only('Invalid Login', ()=> {      
        cy.get('#email').clear().type(loginData.email)
        cy.get('#password').type(loginData.password)
        // cy.get('#email').type('@invalidUser.email')
        // cy.get('#password').type('123456')
        cy.get('[type=submit]').click()

        //Verify error messages are displayed on invalid login credentials
        // cy.get('[class="toast toast-error"]').should('be.visible')
        cy.get('.toast-message')
            .should('be.visible')
            .and('contain.text', 'Please check the form below for errors.')
            
        cy.get('[class="help-block"]')
            .should('contain.text', 'Your email and/or password were invalid.')

    })

    it('Login as Trainer Manager',() =>{
        // cy.visit('https://staging-tt.vshred.com')
        cy.visit('https://staging-tt.vshred.com/login')
        cy.get('[id="email"]').type('trainer-one@example.com')
        cy.get('[id=password]').type('123456')
        cy.get('[type="submit"]').click()


        // Verify Trainer Tool sub-menu
        cy.get('[class="nav-label"]').contains('Trainer Tool').click()
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/unassigned"]').contains('Unassigned Plans').should('exist')
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/clients"]').contains("Assigned Clients").should('exist')
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/clients-beta"]').contains("Assigned Clients Beta").should('exist')
        cy.get('[class="nav-label"]').contains('Trainer Tool').click()

        
        // Verify Trainers sub-menu
        cy.get('[class="nav-label"]').contains('Trainers').click()
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/team"]').contains('Active Trainers').should('exist')
        cy.get('[class="nav-item mm-active"]> ul > li >[href="https://staging-tt.vshred.com/admin/trainers/suspended"]').contains('Suspended Trainers').should('exist')
        cy.get('[class="nav-label"]').contains('Trainers').click()

        //Logout
        cy.get('[class="nav-item"] > [href="https://staging-tt.vshred.com/logout"]').click()
    })

    it('Login as Trainer User',() =>{
        cy.visit('https://staging-tt.vshred.com')
        cy.get('[class="btn__text"]').click()
        cy.get('[id="email"]').type('trainer-two@example.com')
        cy.get('[id=password]').type('123456')
        cy.get('[type="submit"]').click()

        // Verify Trainer Tool sub-menu
        cy.get('[class="nav-label"]').contains('Trainer Tool').click()
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/unassigned"]').should('not.exist')
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/clients"]').contains("Assigned Clients").should('exist')
        cy.get('[class="nav-item mm-active"]> ul > li > [href="https://staging-tt.vshred.com/admin/trainers/clients-beta"]').contains("Assigned Clients Beta").should('exist')
        cy.get('[class="nav-label"]').contains('Trainer Tool').click()

        
        // Verify Trainers sub-menu is not exist
        cy.get('[class="nav-label"]').contains('Trainers').should('not.exist')
        
        //Logout
        cy.get('[class="nav-item"] > [href="https://staging-tt.vshred.com/logout"]').click()
    })
})