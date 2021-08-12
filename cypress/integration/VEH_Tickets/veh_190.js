/// <reference types="cypress" />


describe('VEh-190: Pre-prod Assigned Clients Beta reflects the User Profile updates', () => {
    // accessing the fixture file using alias
    before(() => {
        cy.fixture('loginData').as('loginData');
        cy.visit('/');
        cy.viewport(1280, 720);
        cy.wait(200);

    })

    it('Can Impersonate and Edit Profile', () => {
        cy.get('#menu1').contains('Login').click()
        cy.get('@loginData').then(json => {
            cy.get('#email').clear().type(json[2].email);
            cy.get('#password').type(json[2].password);
            cy.get('[type="submit"]').click();

            cy.contains('Welcome to the admin dashboard').should('be.visible');

            // Search Test Users

            const userEmail = 'cytest41otpCdpHim0805@example.net';
            const newName = 'UpdatedName cyTestCdpHim'

            cy.contains('Users').click();
            cy.get('#__BVID__16').type(userEmail + '{enter}');

            cy.contains('.vuetable-body td', userEmail)
                .parent()
                .within($tr => {
                    cy.get('td.vuetable-slot button[title=Impersonate]').click()
                })

            // cy.get('[item-index="0"] > .vuetable-td-id');               //userid
            // cy.get('.vuetable-slot > .no-wrap :nth-child(2)').click();   //impersonate button

            //already in impersonate page
            cy.contains('Edit Profile').click();
            cy.get('#email').should('contain.value', userEmail);
            cy.get('#name').clear().type(newName)
            cy.completeWebProfile()

            //verify updates are displayed in Admin 
            cy.get('#menu1').contains('Login', { matchCase: false }).click()
            cy.loginTrainerManager()

            cy.contains('Users').click();
            cy.get('#__BVID__16').type(userEmail + '{enter}');
            cy.contains('.vuetable-body td', userEmail)
                .parent()
                .within($tr => {
                    cy.get('td.vuetable-td-name').should('contain.text', newName)
                })

            //check record is NOT in Assigned Clients page
            cy.contains('Trainer Tool').click();
            cy.contains('Assigned Clients Beta').click();
            cy.wait(5000);

            cy.get('#__BVID__16').type(userEmail + '{enter}');
            cy.contains('.vuetable-body td', userEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-customer_name').should('contain.text', newName)
                })
        })
    })
})