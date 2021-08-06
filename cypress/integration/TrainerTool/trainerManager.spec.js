/// <reference types="cypress" />
import { mapLimit } from 'async';
import 'cypress-iframe';
import { waitForDebugger } from 'inspector';

describe('Trainer Manager Tasks', () => {
    beforeEach(() => {
        cy.fixture('loginData').as('loginData');
        cy.visit('https://testing-2.vshred.com/login?ref=home')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    const cEmail = '0803@example.net'
    const searchMail = '0803@example.net'
    const assignTrainer = 'cyTrainer OTP'

    it('can Assign Trainer to Client', () => {
        //Login as Trainer Manager
        cy.loginTrainerManager()

        //check record in Unassigned Plans page
        cy.contains('Trainer Tool').click();
        cy.contains('Unassigned Plans').click();

        cy.get('#__BVID__21', { timeout: 3000 })
            .type(cEmail + '{enter}');
            cy.wait(2000)
        
        cy.contains('.vuetable-body td', cEmail)        //search within the record row
            .should('exist')
            .parent()
            .within($tr => {
                cy.get('.vuetable-slot .multiselect__placeholder')
                    .click()
                    .get('.multiselect__input')
                    .type(assignTrainer + '{enter}')        //assign trainer selected
            })
        cy.get('p.toast-text')                              //confirmation message
            .should('contain.text', 'Successfully assigned trainer to client')

        //record under test is in Assigne Clients page
        cy.verifyAssignedClient(
            {
                email: cEmail,
                trainer: assignTrainer
            })
    })

    it.only('can UnAssign Trainer to Client', () => {
        //Login as Trainer Manager
        cy.loginTrainerManager()

        //check assignment
        cy.contains('Trainer Tool').click();
        cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
        cy.wait(2000);

        cy.get('#__BVID__16')
            .type(cEmail + '{enter}');
            cy.wait(5000)

        cy.contains('.vuetable-body td', cEmail)
            .should('exist')
            .parent()
            .within($tr => {
                cy.get('td.vuetable-td-trainer_name')
                    .should('have.text', assignTrainer)  
                cy.get('td.vuetable-td-status')
                    .should('have.text', 'active')
                //unassign
                cy.get('td.vuetable-slot')
                    .contains('Unassign')
                    .click()
                cy.wait(1000)

            })
        cy.contains("Remove trainer's access to this customer?")
            .should('exist')    //confirmation message
        cy.get('.btn-danger')
            .click()
        cy.get('p.toast-text')
            .should('contain.text', 'Successfully removed trainer access to client')  //successfully unassigned

        //Record should revert in Unassigned Plans
        cy.contains('Trainer Tool').click();
        cy.contains('Unassigned Plans').click();
        cy.get('#__BVID__21', { timeout: 3000 }).type(cEmail + '{enter}');
        cy.contains('.vuetable-body td', cEmail).should('exist')
    })

    it('can Assign Multiple Clients to a Trainer', () => {
        //Login as Trainer Manager
        cy.loginTrainerManager()
        cy.contains('Trainer Tool').click();
        cy.contains('Unassigned Plans').click();

        //search records by email
        cy.get('#__BVID__21', { timeout: 3000 })
            .type(searchMail + '{enter}');
            cy.wait(2000)

        cy.get('.vuetable-body')
            .contains('No Data Available')
            .should('not.exist')

        //select all checkbox
        cy.get('th.vuetable-th-component-checkbox')
            .click()

        //assign multiple clients
        cy.get('th:nth-child(2) div.multiselect__tags')
            .type(assignTrainer+'{enter}')
            cy.get('button').contains('Assign').click()

        //trainer assignment confirmation message    
        cy.get('p.toast-text')
            .should('contain.text', 'Successfully assigned trainer to client')

        //check assignment
        cy.verifyAssignedClient(
            {
                email: cEmail,
                trainer: assignTrainer
            })

    })
})

