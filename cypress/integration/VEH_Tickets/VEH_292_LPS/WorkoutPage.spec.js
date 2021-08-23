/// <reference types = "cypress"/>

describe('LPS Workout Page', () => {
    before(() => {
        cy.visit('https://testing-vehikl-74.vshred.com/')
        cy.get('#menu1').contains('Login', { matchCase: false }).click()

        cy.get('.login-form #email').clear().type('testDataAnalyst@example.com')
        cy.get('.login-form #password').clear().type('Vshred99')
        cy.get('button').contains('Login', { matchCase: false }).click()

        //work around to current landing page issue
        cy.get('#menu1').contains('Admin', { matchCase: false }).click()
        cy.contains('Admin Dashboard').click()
        cy.contains('Welcome to the admin dashboard').should('exist')

        cy.get('#side-menu').contains('Workout')
            .should('exist')
            .click()
        cy.url().should('include', '/workouts')
        cy.get('h3').contains('Workouts').should('exist')
        cy.get('#__BVID__13').clear('{enter}')
        cy.get('#__BVID__14').clear('{enter}')
        cy.get('#__BVID__15').clear('{enter}')
        cy.get('#__BVID__16').clear('{enter}')

    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')

    })

    afterEach(() => {
        cy.get('#__BVID__13').clear('{enter}')
        cy.get('#__BVID__14').clear('{enter}')
        cy.get('#__BVID__15').clear('{enter}')
        cy.get('#__BVID__16').clear('{enter}')
        cy.get('#_created_at').click()
    })

    const searchID = 48
    const searchWorkout = 'Shoulders, Legs & Abs'
    const weekNumber = 7
    const dayNumber = 6

    context('Workout Page View Tests Cases', () => {
        it('can navigate to Workout Page', () => {
            //verify table headers
            cy.contains('ID').should('exist')
            cy.contains('Name').should('exist')
            cy.contains('Day').should('exist')
            cy.contains('Week').should('exist')
            cy.contains('Created At').should('exist')
            cy.contains('Actions').should('exist')

            //verify Action buttons
            cy.get('.vuetable-body tr')
                .should('have.length', 25)
                .each(($row, index, $list) => {
                    cy.wrap($row).get('tr:nth-child(' + (index + 1) + ') td.vuetable-slot')
                        .within(($buttons) => {
                            cy.wrap($buttons).get('button').contains('View').should('be.enabled')
                            cy.wrap($buttons).get('button').contains('Edit').should('be.enabled')
                            cy.wrap($buttons).get('button').contains('Clone').should('be.enabled')
                        })
                })
        })

        it('can filter by Exercise ID', () => {
            //verify filter by ID
            cy.get('#__BVID__13').clear().type(searchID + '{enter}')
                .then(($e1) => {
                    cy.wrap($e1).get('#__BVID__14').clear().type('{enter}')
                    cy.wait(2000)
                    cy.get('#_id').click()
                })
            // cy.get('#_id').click()

            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-id').contains(searchID)
                .should('exist')
                .next()
                .should('contain.text', searchWorkout)
        })

        it('can filter by Workout Name', () => {
            cy.get('#__BVID__13').clear().type('{enter}')
                .then(($e1) => {
                    cy.wrap($e1).get('#__BVID__14').clear().type(searchWorkout + '{enter}')
                })
            cy.wait(3000)
            cy.get('.vuetable-body td', { timeout: 2000 }).contains(searchWorkout)
                .should('exist')
                .prev()
                .should('contain.text', searchID)
        })

        it('can filter by Week', () => {
            cy.get('#__BVID__13').clear().type('{enter}')
            cy.get('#__BVID__14').clear().type('{enter}')
            cy.get('#__BVID__15').clear().type('{enter}')
                .then(($e1) => {
                    cy.wrap($e1).get('#__BVID__16').clear().type(weekNumber + '{enter}')
                })
            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-week', { timeout: 2000 }).contains(weekNumber)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-td-day')
                        .should('have.text',dayNumber)      
                    cy.wrap($tr).get('td.vuetable-td-name')
                        .should('have.text',searchWorkout)            
                    cy.wrap($tr).get('td.vuetable-td-id')
                        .should('have.text',searchID)         
                })              
        })


        it('can sort table columns', () => {
            //verify table column sorting 
            cy.get('thead tr:nth-child(1) th')
                .each(($label, index, $list) => {
                    const labelIdx = index
                    const columnTitle = "Column Title: " + $label.text()
                    if (labelIdx <= 3) {
                        cy.log(columnTitle)
                        cy.wrap($label).click()
                        cy.get('i.fa-chevron-up').should('be.visible')
                        cy.wrap($label).click()
                        cy.get('i.fa-chevron-down').should('be.visible')

                        labelIdx + 1
                    }
                })
        })
    })
})