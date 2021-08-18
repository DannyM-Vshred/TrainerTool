/// <reference types="cypress" />
import { mapLimit } from 'async';
import 'cypress-iframe';
import { waitForDebugger } from 'inspector';

describe('OTP Custom Diet and Training Web Purchases', () => {
    beforeEach(() => {
        // cy.fixture('newClientRecord').as('clientData');
        cy.fixture('loginData').as('loginData');
        cy.fixture('orderForms').as('orderForms')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    const myCtr = '01';
    const dateS = '0812';
    const assignTrainer = 'cyTrainer OTP'

    it.only('can purchase Custom CDP 8-Weeks for Him OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[0].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[0].offer)

            const fName = 'cytest' + myCtr
            const lName = json[0].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                .should('contain.text', json[0].orderItem1)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[0].confirmOrder1);

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[0].gender)
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })

                //VEH-4
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it.only('can purchase Custom CDP 8-Weeks for Her OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[1].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[1].offer)

            const fName = 'cytest' + myCtr
            const lName = json[1].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                .should('contain.text', json[1].orderItem1)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[1].confirmOrder1);

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[1].gender)
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')
            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it.only('can purchase Extreme Fat Loss for Him OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[2].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[2].offer)

            const fName = 'cytest' + myCtr
            const lName = json[2].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP
            cy.get('.checkbox-area > label').click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[2].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[2].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            cy.wait(10000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(20000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click({ force: true })
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(20000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart
            //fillout shipping details        
            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'Hawaii',
                    phone: '8153211010'
                })

            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(15000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[2].confirmOrder1).should('exist')
            cy.contains(json[2].confirmOrder2).should('exist')
            cy.contains(json[2].confirmOrder3).should('exist')
            cy.contains(json[2].confirmOrder4).should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[2].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it('can purchase Extreme Fat Loss for Her OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[3].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[3].offer)

            const fName = 'cytest' + myCtr
            const lName = json[3].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP
            cy.get('.checkbox-area > label').click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[3].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[3].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            cy.wait(10000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(20000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click({ force: true })
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(20000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart

            //fillout shipping details 
            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'Colorado',
                    phone: '5126523256'
                })


            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(15000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[3].confirmOrder1).should('exist')
            cy.contains(json[3].confirmOrder2).should('exist')
            cy.contains(json[3].confirmOrder3).should('exist')
            cy.contains(json[3].confirmOrder4).should('exist')

            // cy.contains('Fat Loss Extreme for Her').should('exist')
            // cy.contains('Custom Diet Plan').should('exist')
            // cy.contains('VSU - Monthly - 9.95 (30 Days Free)').should('exist')
            // cy.contains('Greens').should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[3].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')
            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it('can purchase Ripped in 90 Days OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[4].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[4].offer)

            const fName = 'cytest' + myCtr
            const lName = json[4].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            cy.wait(5000)
            //add CDP
            cy.get('.checkbox-area > label').click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[4].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[4].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            cy.wait(15000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(20000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click()
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(10000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart
            //fillout shipping details        

            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'Florida',
                    phone: '7052151250'
                })

            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(15000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[4].confirmOrder1).should('exist')
            cy.contains(json[4].confirmOrder2).should('exist')
            cy.contains(json[4].confirmOrder3).should('exist')
            cy.contains(json[4].confirmOrder4).should('exist')

            // cy.contains('Ripped In 90 Days').should('exist')
            // cy.contains('Custom Diet Plan').should('exist')
            // cy.contains('VSU - Monthly - 9.95 (30 Days Free)').should('exist')
            // cy.contains('Greens').should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[4].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it('can purchase Clean Bulk Bundles OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[5].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[5].offer)

            const fName = 'cytest' + myCtr
            const lName = json[5].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP
            cy.get('.checkbox-area > label').click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[5].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[5].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 5000 }).click()

            cy.wait(15000)
            cy.get('.paused-overlay__text', { timeout: 8000 }).click()

            cy.wait(15000)                              //add vsu
            cy.get('label', { timeout: 5000 }).click()
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(10000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart
            //fillout shipping details        

            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'Vermont',
                    phone: '9562121000'
                })

            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(15000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[5].confirmOrder1).should('exist')
            cy.contains(json[5].confirmOrder2).should('exist')
            cy.contains(json[5].confirmOrder3).should('exist')
            cy.contains(json[5].confirmOrder4).should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[5].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it('can purchase Toned in 90 Days OTP from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[6].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[6].offer)

            const fName = 'cytest' + myCtr
            const lName = json[6].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP
            cy.get('.checkbox-area > label', { timeout: 6000 }).click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[6].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[6].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 5000 }).click()

            cy.wait(10000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(15000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click()
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(8000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart
            //fillout shipping details        

            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'Washington',
                    phone: '8185204545'
                })

            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 15000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[6].confirmOrder1).should('exist')
            cy.contains(json[6].confirmOrder2).should('exist')
            cy.contains(json[6].confirmOrder3).should('exist')
            cy.contains(json[6].confirmOrder4).should('exist')

            // cy.contains('Toned In 90 Days').should('exist')
            // cy.contains('Custom Diet Plan').should('exist')
            // cy.contains('VSU - Monthly - 9.95 (30 Days Free)').should('exist')
            // cy.contains('Greens').should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[6].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it('can purchase Six-Pack Shred from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[7].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[7].offer)

            const fName = 'cytest' + myCtr
            const lName = json[7].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP
            cy.get('.checkbox-area > label', { timeout: 6000 }).click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[7].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[7].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 5000 }).click()

            cy.wait(10000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(15000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click()
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(8000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart
            //fillout shipping details        

            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'South Dakota',
                    phone: '8153211010'
                })

            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 15000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[7].confirmOrder1).should('exist')
            cy.contains(json[7].confirmOrder2).should('exist')
            cy.contains(json[7].confirmOrder3).should('exist')
            cy.contains(json[7].confirmOrder4).should('exist')

            // cy.contains('Six-Pack Shred').should('exist')
            // cy.contains('Custom Diet Plan').should('exist')
            // cy.contains('VSU - Monthly - 9.95 (30 Days Free)').should('exist')
            // cy.contains('Greens').should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[7].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it('can purchase Big Arms from web', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[8].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[8].offer)

            const fName = 'cytest' + myCtr
            const lName = json[8].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP
            cy.get('.checkbox-area > label', { timeout: 6000 }).click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[8].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[8].orderItem2)

            //Submit Order
            cy.get('#submit-order', { timeout: 5000 }).click()

            cy.wait(10000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(20000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click()
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(8000)
            cy.get('#addToCartBtnTop').click()          //Greens add to cart
            //fillout shipping details        

            cy.filloutShippingDetails(
                {
                    name: fName + " " + lName,
                    state: 'Nevada',
                    phone: '9153251012'
                })

            // cy.contains('No thanks,').click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 15000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[8].confirmOrder1).should('exist')
            cy.contains(json[8].confirmOrder2).should('exist')
            cy.contains(json[8].confirmOrder3).should('exist')
            cy.contains(json[8].confirmOrder4).should('exist')

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[8].gender)
            cy.completeWebProfile()

            //Login to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');

            cy.get('.vuetable-td-email').contains(cEmail).should('exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('exist')
                .parent()
                .within($tr => {
                    cy.get('.vuetable-td-purchase_type')
                        .should('contain.text', 'Single')         //single
                    cy.get('.vuetable-slot .multiselect__placeholder')
                        .click()
                        .get('.multiselect__input')
                        .type(assignTrainer + '{enter}')
                })
            cy.get('p.toast-text').should('contain.text', 'Successfully assigned trainer to client')

            //check assignment
            cy.verifyAssignedClientOTP(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            // cy.get('circle[fill=none]').click({ force: true })
        })
    })

    it.only('can UNSELECT CDP SP from order form - Toned', () => {
        cy.get('@orderForms').then(json => {
            cy.visit('/' + json[11].url)
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[11].offer)

            const fName = 'cytest' + myCtr
            const lName = json[11].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //add CDP initially
            cy.get('.checkbox-area > label', { timeout: 6000 }).click()

            //Verify Order details
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[11].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('contain.text', json[11].orderItem2)

            //vs-2871 - unselect a previously selected cdp    
            cy.wait(4000)
            cy.get('.checkbox-area > label', { timeout: 6000 }).click() //unselect the checkbox
            
            //verify cdp is no longer displayed
            cy.get('#order-summary tr:nth-child(1) > td:nth-child(1)')
                .should('contain.text', json[11].orderItem1)
            cy.get('#order-summary tr:nth-child(2) > td:nth-child(1)')
                .should('not.be.visible')


            //Submit Order
            cy.get('#submit-order', { timeout: 5000 }).click()

            cy.wait(15000)
            cy.get('.paused-overlay__text', { timeout: 5000 }).click()

            cy.wait(20000)                              //add vsu
            cy.get('label', { timeout: 10000 }).click()
            cy.get('button[type=submit]').should('be.enabled')
                .click()

            cy.wait(2000)
            cy.get('.paused-overlay__text', { timeout: 10000 }).click()

            cy.wait(25000)

            cy.get('a[test-id=decline-cdp-button]').contains('No thanks').click()

            cy.contains('No thanks, I’d rather take my chances with sub-optimal fat burning and immune defense support').click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 15000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.contains(json[11].confirmOrder1).should('exist')
            cy.contains(json[11].confirmOrder2).should('not.exist')  //for VS-2871
            cy.contains(json[11].confirmOrder3).should('exist')
            cy.contains(json[11].confirmOrder4).should('not.exist')   //Greens

             //verify no Questionnaire button   
            cy.contains('Questionnaire').should('not.exist')
            cy.contains('HERE').click()
            cy.get('div:nth-child(1) > div > div.modal-close.modal-close-cross').click({ multiple: true })

            //complete profile
            cy.get('#profile-gender').select(json[6].gender)
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.get('.btn__text').contains('Login').click()
            cy.loginTrainerManager()

            //check record is NOT in Unassigned Plans page
            cy.contains('Trainer Tool').click();
            cy.contains('Unassigned Plans').click();
            cy.wait(5000);

            cy.get('#__BVID__21').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('not.exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('not.exist')

            //check record is NOT in Assigned Clients page
            cy.contains('Trainer Tool').click();
            cy.contains('Assigned Clients Beta').click();
            cy.wait(5000);

            cy.get('#__BVID__16').type(cEmail + '{enter}');
            cy.get('.vuetable-td-email').contains(cEmail).should('not.exist')

            cy.contains('.vuetable-body td', cEmail)
                .should('not.exist')
                
        })
    })

})
