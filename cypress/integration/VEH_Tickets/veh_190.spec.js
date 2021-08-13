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

            const userEmail = '3887toy43@example.com';
            const newName = 'UpdatedName cyTestCdpHim'

            cy.contains('Users').click();
            cy.get('#__BVID__16').type(userEmail + '{enter}');

            cy.contains('.vuetable-body td', userEmail)
                .parent()
                .within($tr => {
                    cy.get('td.vuetable-slot button[title=Impersonate]').click()
                })

            //in member webpage    
            cy.url().then(($url) => {
                if ($url.includes('member/profile?next=home')) {
                    cy.get('h2').contains('Please Complete Your Profile').should('exist')
                    cy.get('div:nth-child(1) > div > div.modal-close.modal-close-cross').click({ multiple: true })
                    cy.get('#name').clear().type(newName)
                    cy.get('#profile-gender').select('Male')

                    cy.get('#account-profile > form > div').then(($body) => {
                        if ($body.text().includes('Height')) {
                            //found it
                            cy.get('#profile-birthday').type('1995-01-05')
                            cy.get('#height_1').clear({ force: true }).type('5', { force: true, waitForAnimations: false })
                            cy.get('#height_2').clear({ force: true }).type('10', { force: true, waitForAnimations: false })
                            cy.get('#profile-weight').clear().type('245')
                            cy.get('input[name=activity][id=light]').click({ waitForAnimations: false, force: true })
                            cy.get('input[name=condition_goal][id=fat-loss]').click({ waitForAnimations: false, force: true })
                        }
                        // nope not here
                        cy.contains('Save Profile').click()
                        cy.get('.toast-message')                              //confirmation message
                            .should('contain.text', 'Profile updated')
                        cy.get('h3').should('have.text', newName)

                    })

                } else {
                    cy.contains('Edit Profile').click()
                    cy.get('#name').clear().type(newName)
                    cy.get('#profile-gender').select('Male')
                    cy.contains('Save Profile').click()

                    cy.get('.toast-message')                              //confirmation message
                        .should('contain.text', 'Profile updated')
                    cy.get('#name').should('have.value', newName)

                }
            })
            cy.get('#menu1').contains('Admin')
                .click()
            cy.get('.dropdown--active .menu-vertical').contains('Stop impersonating').click()        //Stop impersonating

            //back in Admin dashboard
            cy.url().should('include', 'admin/users')
            cy.contains(newName).should('exist')

            //check updates are displayed in Assigned Clients Beta
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