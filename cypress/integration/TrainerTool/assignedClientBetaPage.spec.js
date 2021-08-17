/// <reference types="cypress" />
import { mapLimit } from 'async';
import 'cypress-iframe';
import { waitForDebugger } from 'inspector';

describe('Assigned Clients Beta Page Regression Tests', () => {
    before(() => {
        cy.fixture('loginData').as('loginData');
        cy.visit('/')
        
    })

    beforeEach(() => {
        // cy.reload()
        cy.loginTrainerManager()
        cy.viewport(1920, 1080)
        cy.contains('Trainer Tool').click();
        cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
        cy.wait(5000);
    })

    afterEach(()=>{
        cy.get('#__BVID__15').clear()
        cy.wait(2000)
        cy.get('#__BVID__16').clear()
        cy.wait(2000)
        cy.get('#__BVID__17').select('All')
        cy.get('#__BVID__18').select('All')
        cy.get('#__BVID__19').select('All')
        // cy.get('#__BVID__20').select('All')
        cy.get('.navbar.navbar-static-top').contains('Logout').click()
        
        cy.window().then(win => {
            // window.gc is enabled with --js-flags=--expose-gc chrome flag
            if (typeof win.gc === 'function') {
                // run gc multiple times in an attempt to force a major GC between tests
                win.gc();
                win.gc();
                win.gc();
                win.gc();
                win.gc();
            }
        });
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    const cEmail = '578meda.welch@example.net'
    const searchMail = '0803@example.net'
    const assignTrainer = 'Trainer Two'

    it('loads the Assigned Clients Beta page', () => {
        // //Login as Trainer Manager
        // cy.loginTrainerManager()

        // //check assignment
        // cy.contains('Trainer Tool').click();
        // cy.contains('Assigned Clients Beta').click();       //assigned clients beta page
        // cy.wait(2000);

        cy.get('.vuetable-body tr').should('have.length', 25)
        cy.get('#__BVID__15').should('be.enabled')
        cy.get('#__BVID__16').should('be.enabled')

        cy.get('#__BVID__17')
            .select('Subscriptions').should('exist')
            .select('One-Time Plans').should('exist')
            .select('All').should('exist')

        cy.get('#__BVID__18')
            .select('All').should('exist')
            .select('Refunded').should('exist')
            .select('Active').should('exist')

        cy.get('#__BVID__19')
            .select('All').should('exist')
            .select('Sent').should('exist')
            .select('Not Sent').should('exist')

        cy.get('#__BVID__20')
            .select('True').should('exist')
            .select('False').should('exist')
            .select('All').should('exist')

    })

    it('can filter by Email address', () => {
        cy.reload()
        cy.get('#__BVID__16')
            .type(cEmail + '{enter}');
        cy.wait(2000)
        cy.get('.vuetable-body tr').should('have.length', 1)

        cy.contains('.vuetable-body td', cEmail)
            .should('exist')
            .should('have.length', 1)
            .parent()
            .within($tr => {
                cy.get('td.vuetable-td-trainer_name')
                    .should('not.be.empty')
                cy.get('td.vuetable-td-status')
                    .should('have.text', 'active')
                //unassign
                cy.get('td.vuetable-slot')
                    .contains('Unassign')
                    .should('be.enabled')
            })
    })

    it('can filter by Questionnaire Submission dates', () => {
        //Questionnaire Submission Date
        cy.get('th:nth-child(8) .btn-default').contains('Select date').click()
        cy.get('span.day').contains('1').click()
        cy.get('span.day').contains('15').click()
        cy.get('.date-picker-footer').contains('Select').click()
        cy.wait(2000)
        cy.get('th:nth-child(8) .btn-default').click()
        cy.get('.date-picker-footer').contains('Reset').click()
        cy.wait(2000)


    })
    
    it('can filter by File Upload dates', () => {
        // Upload Date
        cy.get('th:nth-child(7) .btn-default').contains('Select date').click()
        cy.get('span.day').contains('9').click()
        cy.get('.date-picker-footer').contains('Select').click()
        cy.wait(2000)
        cy.get('th:nth-child(7) .btn-default').click()
        cy.get('.date-picker-footer').contains('Reset').click()
        cy.wait(2000)

    })
    
    it('can filter by Plan Name - OTP', () => {
        // Plan Name
        cy.get('#__BVID__17').select('One-Time Plans')      //filter as Order
        cy.wait(2000)
        cy.get('#__BVID__17').should('contain.text', 'One-Time')
    })
    it('can filter by Plan Name - Subscription', () => {
        // Plan Name
        cy.get('#__BVID__17').select('Subscriptions')      //filter as Order
        cy.wait(2000)
        cy.get('#__BVID__17').should('contain.text', 'Subscriptions')

    })

    it('can upload files', () => {
        const filepath = 'uploadFile/sample-pdf-file.pdf'
        cy.get('#__BVID__16')
            .type(cEmail + '{enter}');
        cy.wait(2000)

        cy.contains('.vuetable-body td', cEmail)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('button.btn').contains('Upload').click()
            // cy.get('.modal-content .modal-header').should('contain.text', 'Upload PDF')
            // cy.get('div.modal-content .modal-body button').contains('Select files').click()
                
        })
        cy.get('input[type="file"]').attachFile(filepath)
        cy.get('div.drop-zone__inner').should('contain','sample-pdf-file.pdf')
        cy.get('button').contains('Upload & Send').click()
        cy.wait(2000)
    
        cy.get('p.toast-text')
            .should('contain.text', 'Uploaded custom plan and notified client')
        cy.get('p.toast-text').contains('Uploaded and sent plan PDF')
        .should('be.visible')

        cy.get('#__BVID__19').select('Sent')
        cy.wait(2000)
        cy.contains('.vuetable-body td', cEmail)
        .should('exist')
        .parent()
        .within($tr => {
            cy.get('i.fas.fa-check.checkmark').should('be.visible')
        })

        cy.get('#__BVID__19').select('Not Sent')
        cy.wait(2000)
        cy.contains('.vuetable-body td', cEmail)
        .should('not.exist')

    })

    it.only('can filter by Trainer', () => {

        cy.get('input[placeholder="Select trainer"]')
            .type(assignTrainer+'{enter}',{force:true})
        cy.wait(2000)

        cy.get('.vuetable-body tr')
            .should('have.length.at.least', 5)
            .then(($row)=>{
                cy.wrap($row).get('td.vuetable-td-trainer_name')
                    .each(($e1,index,$list)=>{
                       const clientEmail = $e1.text()
                       expect(clientEmail).to.include(assignTrainer)
                       // cy.log(clientEmail)
                })
            })
    })

    it('can filter by Trainer2', () => {
        cy.get('span.multiselect__placeholder')
            .type('Trainer Two' + '{enter}')
        cy.wait(2000)

        cy.get('.vuetable-body tr').eq(2).find('td.vuetable-td-trainer_name')
        
        cy.get('.vuetable-body tr')
            .each(($td,index,$list)=>{
                $td.find('td.vuetable-td-trainer_name')
                    .should('have.text','Trainer Two')
            })
    })

    it('can Unassign a trainer', () => {
        cy.get('#__BVID__16')
        .type(cEmail + '{enter}');
        cy.wait(2000)

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

})



