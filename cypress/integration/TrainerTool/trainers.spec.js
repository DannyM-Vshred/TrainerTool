/// <reference types = "Cypress" />

describe('Test Suite for Trainers page', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.loginTrainerManager()
    })

    // beforeEach(() => {
    //     cy.get('#side-menu').contains('Trainers')
    //         .should('exist')
    //         .click()
    //     cy.contains('Active Trainers').should('exist')
    //     cy.contains('Suspended Trainers').should('exist')
    // })

    const suspendTrainer = 'ForSuspension'
    const suspendClient = 'forTrainerSuspension@example.net'

    it('can Suspend a Trainer', () => {

        // view clients assigned to a trainer to be suspended
        cy.get('#side-menu').contains('Trainer Tool').click()
        cy.contains('Assigned Clients Beta', { timeout: 2000 }).click()
        cy.wait(500)
        cy.get('input[placeholder="Select trainer"]')
            .type(suspendTrainer + '{enter}', { force: true })

        cy.wait(2000)

        //verify all rows are assigned to the trainer to be suspended
        cy.get('.vuetable-body tr')
            .should('have.length.at.least', 2)
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-trainer_name')
                    .each(($e1, index, $list) => {
                        const clientEmail = $e1.text()
                        expect(clientEmail).to.include(suspendTrainer)
                        // cy.log(clientEmail)
                    })
            })
            //verify test clients are selected
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-email')
                    .each(($e1, index, $list) => {
                        const clientEmail = $e1.text()
                        expect(clientEmail).to.include(suspendClient)
                        // cy.log(clientEmail)
                    })
            })

        // Trainers > Active Trainers
        cy.contains('Trainers').click()
        cy.contains('Active Trainers').click()
        cy.get('#__BVID__12').clear().type(suspendTrainer + '{enter}')
        cy.wait(3000)

        cy.get('.vuetable-body tr')
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-name')
                    .each(($e1, index, $list) => {
                        const trainerName = $e1.text()
                        expect(trainerName).to.include(suspendTrainer)
                        // cy.log(clientEmail)
                    })
            })

        //suspend Trainer
        cy.contains('.vuetable-body td', suspendTrainer)
            .should('exist')
            .parent()
            .within($tr => {
                //suspend Trainer
                cy.get('td.vuetable-slot')
                    .contains('Suspend')
                    .should('be.enabled')
                    .click()
                cy.wait(1000)

            })

        cy.contains('Confirm Trainer Suspension').should('exist')    //confirmation message
        cy.contains('Are you sure you want to suspend Trainer ForSuspension?').should('exist')
        cy.get('#suspend-trainer___BV_modal_footer_ > .btn-danger').contains('Suspend')
            .click({ force: true })
        // cy.get('p.toast-text')
        //         .should('contain.text', 'Successfully removed trainer access to client')  //successfully unassigned

        // Verify Suspended Trainer is in Trainers > Suspended Trainers page
        cy.contains('Trainers').click()
        cy.contains('Suspended Trainers').click()
        cy.get('#__BVID__12').clear().type(suspendTrainer + '{enter}')
        cy.wait(3000)

        cy.get('.vuetable-body tr')
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-name')
                    .each(($e1, index, $list) => {
                        const trainerName = $e1.text()
                        expect(trainerName).to.include(suspendTrainer)
                        // cy.log(clientEmail)
                    })
            })

        //verify clients assigned to a Suspended Trainer reverts to Unassigned Plans page
        cy.get('#side-menu').contains('Trainer Tool').click()
        cy.contains('Unassigned Plans', { timeout: 2000 }).click()
        cy.wait(500)

        cy.get('#__BVID__21')
            .type(suspendClient + '{enter}', { force: true })
        cy.wait(2000)

        cy.get('.vuetable-body tr')
            .should('have.length.at.least', 2)
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-email')
                    .each(($e1, index, $list) => {
                        const clientEmail = $e1.text()
                        expect(clientEmail).to.include(suspendClient)
                        // cy.log(clientEmail)
                    })
            })
    })

    it('can re-instate a Trainer', () => {
        // Trainers > Suspended Trainers
        cy.contains('Trainers').click()
        cy.contains('Suspended Trainers').click()
        cy.get('#__BVID__12').clear().type(suspendTrainer + '{enter}')
        cy.wait(3000)

        cy.get('.vuetable-body tr')
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-name')
                    .each(($e1, index, $list) => {
                        const trainerName = $e1.text()
                        expect(trainerName).to.include(suspendTrainer)
                        // cy.log(clientEmail)
                    })
            })

        //Reinstate Trainer
        cy.contains('.vuetable-body td', suspendTrainer)
            .should('exist')
            .parent()
            .within($tr => {
                //reinstate Trainer
                cy.get('td.vuetable-slot')
                    .contains('Reinstate')
                    .should('be.enabled')
                    .click()
                cy.wait(1000)

            })

        cy.contains('Confirm Trainer Reinstatement').should('exist')    //confirmation message
        cy.contains('Are you sure you want to reinstate').should('exist')
        cy.get('#reinstate-trainer___BV_modal_footer_ > .btn-primary').contains('Reinstate')
            .click({ force: true })
        cy.wait(2000)

        //verify Trainer is in Active Trainer
        cy.contains('Trainers').click()
        cy.contains('Active Trainers').click()
        cy.get('#__BVID__12').clear().type(suspendTrainer + '{enter}')
        cy.wait(3000)

        cy.get('.vuetable-body tr')
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-name')
                    .each(($e1, index, $list) => {
                        const trainerName = $e1.text()
                        expect(trainerName).to.include(suspendTrainer)
                        // cy.log(clientEmail)
                    })
            })

        //verify reinstate trainers are avaible for client assignment in Unassigned Plans page
        cy.get('#side-menu').contains('Trainer Tool').click()
        cy.contains('Unassigned Plans', { timeout: 2000 }).click()
        cy.wait(500)

        cy.get('#__BVID__21')
            .type(suspendClient + '{enter}', { force: true })
        cy.wait(2000)

        cy.get('.vuetable-body tr')
            .then(($row) => {
                cy.wrap($row).get('td.vuetable-td-email')
                    .each(($e1, index, $list) => {
                        const clientEmail = $e1.text()
                    cy.log(clientEmail)
                    cy.wait(500)
                    if(clientEmail.includes(suspendClient)){
                        cy.wrap($e1).parent()
                        .within($tr => {
                            cy.get('input[type=checkbox]').click()
                        })
                    }
            })
        })
        //assign multiple client to a reinstated trainer
        cy.get('th:nth-child(2) div.multiselect__tags')
            .type(suspendTrainer+'{enter}')
            .should('include.text',suspendTrainer)
        cy.get('button').contains('Assign').click()

        //trainer assignment confirmation message    
        cy.get('p.toast-text')
            .should('contain.text', 'Successfully assigned trainer to client')
    })
})
