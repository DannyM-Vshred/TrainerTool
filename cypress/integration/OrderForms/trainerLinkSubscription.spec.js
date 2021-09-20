///<reference types = "Cypress"/>
import 'cypress-iframe';

describe('Trainer Link Purchaes', () => {
    before(() => {
        
        // const testEnv = cy.envUnderTest(""+Cypress.env('STAGING-TT_URL')+"")  
        // const testEnv = cy.envUnderTest(""+Cypress.env('STAGING_URL')+"")  
    })

    beforeEach(() => {
        const testEnv = cy.envUnderTest(""+Cypress.env('STAGING-TT_URL')+"")  
        cy.fixture('trainerLink').as('trainerLink')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    const trainerName = 'cyTrainerLink'
    const trainerId = '2387' //'64598'
    const trainerLink = "/sp/custom-diet-plan/reup/?utm_source=facebook&utm_medium=trainers&utm_campaign=groups&utm_content=" + trainerName + "&utm_term=" + trainerId
    // const trainerLink = testEnv+"/sp/custom-diet-plan/reup/?utm_source=trainers&utm_medium=zendesk&utm_campaign=referral&utm_content=" +  trainerName + "&utm_term=" + trainerId
    
    const nonTrainer = 'cyTestNonTrainer'
    const nonTrainerID = '114119'
    const nonTrainerLink = "/sp/custom-diet-plan/reup/?utm_source=facebook&utm_medium=trainers&utm_campaign=groups&utm_content=" + nonTrainer + "&utm_term=" + nonTrainerID
    
    const myCtr = '50';
    const dateS = '0920';

    const assignTrainer = 'cyTrainer TrainerLink'
    const clName = 'cyTest'
    const testEnv = 'STAGING-TT_URL'  //STAGING-TT_URL , STAGING_URL, TESTING2_URL


    it('can purchase Silver Plus Monthly CDTP through Trainer Link', () => {
        // cy.visit(trainerLink)
        cy.envUnderTest(""+Cypress.env(testEnv)+trainerLink+"")

        cy.url().should('include', 'utm_content=' + trainerName + '&utm_term=' + trainerId)
        cy.get('.column-title').contains('DIET & TRAINING PLANS')
            .should('be.visible')
            .parent()
            .within(($plans)=>{
                cy.wrap($plans).get('.col-md-6 .product-class.silver').then(($title)=>{
                    cy.wrap($title)
                        .parent()
                        .within(($str) => {
                        cy.wrap($str).contains('MONTHLY CUSTOM DIET & TRAINING PLAN').should('be.visible')
                        cy.wrap($str).get('a').contains('Subscribe Now!').click()
                        })
            })
        })

        //order Form page
        cy.url().should('include', '/four-week-diet-training-plan-monthly')
        cy.get('@trainerLink').then(json => {
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[0].offer)

            const fName = clName + myCtr
            const lName = json[0].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                .should('contain.text', json[0].purchaseNote)
            cy.get('#order-summary').contains(json[0].orderItem1).should('exist')

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
            cy.loginTrainerManager()

            //verify record is not in Unassigned Plans page
            cy.verifyRecordNotInUnassignedPlansPage(
                {
                email: cEmail
                })

            //record under test is automatically assigned to a Trainer and in Assigned Clients page

            cy.verifyAssignedClientSubs(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })

            //Upload PDF Plan
            // cy.uploadPlan(
            //     {
            //         email: cEmail
            //     })
        })
    })

    it.only('can purchase Silver Monthly CDP through Trainer Link', () => {
        // cy.visit(trainerLink)
        cy.envUnderTest(""+Cypress.env(testEnv)+trainerLink+"")
        cy.url().should('include', 'utm_content=' + trainerName + '&utm_term=' + trainerId)
        cy.get('.column-title').contains('DIET ONLY PLANS')
            .should('be.visible')
            .parent()
            .within(($plans)=>{
                cy.wrap($plans).get('.col-md-6 .product-class.silver').then(($title)=>{
                    cy.wrap($title)
                        .parent()
                        .within(($str) => {
                        cy.wrap($str).contains('MONTHLY CUSTOM DIET PLAN').should('be.visible')
                        cy.wrap($str).get('a').contains('Subscribe Now!').click()
                        })
            })
        })

        //order Form page
        cy.url().should('include', '/custom-diet-plan-monthly-reup')
        cy.get('@trainerLink').then(json => {
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[1].offer)

            const fName = clName + myCtr
            const lName = json[1].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                .should('contain.text', json[1].purchaseNote)
            cy.get('#order-summary').contains(json[1].orderItem1).should('exist')
            
            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            cy.wait(8000)
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
            cy.loginTrainerManager()

            //verify record is not in Unassigned Plans page
            cy.verifyRecordNotInUnassignedPlansPage(
                {
                email: cEmail
                })

            //record under test is automatically assigned to a Trainer and in Assigned Clients page

            cy.verifyAssignedClientSubs(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })

            //Upload PDF Plan
            // cy.uploadPlan(
            //     {
            //         email: cEmail
            //     })
        })
    })

    it('can purchase Gold Plus Monthly CDTP through Trainer Link', () => {
        // cy.visit(trainerLink)
        cy.envUnderTest(""+Cypress.env(testEnv)+trainerLink+"")
        cy.url().should('include', 'utm_content=' + trainerName + '&utm_term=' + trainerId)
        cy.get('.column-title').contains('DIET & TRAINING PLANS')
            .should('be.visible')
            .parent()
            .within(($plans)=>{
                cy.wrap($plans).get('.col-md-6 .product-class.gold').then(($title)=>{
                    cy.wrap($title)
                        .parent()
                        .within(($str) => {
                        cy.wrap($str).contains('MONTHLY CUSTOM DIET & TRAINING PLAN').should('be.visible')
                        cy.wrap($str).get('a').contains('Subscribe Now!').click()
                        })
            })
        })
        
        //order Form page
        cy.url().should('include','gold-training-package-monthly')
        cy.get('@trainerLink').then(json => {
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[2].offer)

            const fName = clName + myCtr
            const lName = json[2].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeGoldUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('#order-summary').contains(json[2].orderItem1).should('exist')

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[2].confirmOrder1);

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            cy.filloutGoldQuestionnaire();

            //complete profile

            cy.get('#profile-gender').select(json[2].gender)

            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.loginTrainerManager()

            //verify record is not in Unassigned Plans page
            cy.verifyRecordNotInUnassignedPlansPage(
                {
                    email: cEmail
                })
            
            //record under test is automatically assigned to a Trainer and in Assigned Clients page
            cy.verifyAssignedClientSubs(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })

            //Upload PDF Plan
            // cy.uploadPlan(
            //     {
            //         email: cEmail
            //     })
        })
    })

    it('can purchase Gold Monthly CDP through Trainer Link', () => {
        // cy.visit(trainerLink)
        cy.envUnderTest(""+Cypress.env(testEnv)+trainerLink+"")
        cy.url().should('include', 'utm_content=' + trainerName + '&utm_term=' + trainerId)
        cy.get('.column-title').contains('DIET ONLY PLANS')
            .should('be.visible')
            .parent()
            .within(($plans)=>{
                cy.wrap($plans).get('.col-md-6 .product-class.gold').then(($title)=>{
                    cy.wrap($title)
                        .parent()
                        .within(($str) => {
                        cy.wrap($str).contains('MONTHLY CUSTOM DIET PLAN').should('be.visible')
                        cy.wrap($str).get('a').contains('Subscribe Now!').click()
                        })
            })
        })
        
        //order Form page
        cy.url().should('include','gold-diet-plan-monthly')
        cy.get('@trainerLink').then(json => {
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[3].offer)

            const fName = clName + myCtr
            const lName = json[3].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeGoldUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('#order-summary').contains(json[3].orderItem1).should('exist')

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()

            //Verify Order confirmation page is displayed
            cy.wait(10000);
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)
            cy.get('.h5').should('contain.text', json[3].confirmOrder1);

            //fillout questionnaire
            cy.get('#questionnaire', { timeout: 5000 }).click()
            cy.contains(cEmail).should('be.visible')
            // cy.filloutGoldQuestionnaire();
            cy.filloutQuestionnaire();

            //complete profile
            cy.get('#profile-gender').select(json[3].gender,{force:true})
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.loginTrainerManager()

            //verify record is not in Unassigned Plans page
            cy.verifyRecordNotInUnassignedPlansPage(
                {
                email: cEmail
                })

            //record under test is automatically assigned to a Trainer and in Assigned Clients page
            cy.verifyAssignedClientSubs(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })

            //Upload PDF Plan
            cy.uploadPlan(
                {
                    email: cEmail
                })
        })
    })

    it('can purchase Silver Monthly CDP through Trainer Link - non TrainerUser', () => {
        // cy.visit(nonTrainerLink)
        cy.envUnderTest(""+Cypress.env(testEnv)+nonTrainerLink+"")
        cy.url().should('include', 'utm_content=' + nonTrainer + '&utm_term=' + nonTrainerID)

        cy.get('.column-title').contains('DIET ONLY PLANS')
            .should('be.visible')
            .parent()
            .within(($plans)=>{
                cy.wrap($plans).get('.col-md-6 .product-class.silver').then(($title)=>{
                    cy.wrap($title)
                        .parent()
                        .within(($str) => {
                        cy.wrap($str).contains('MONTHLY CUSTOM DIET PLAN').should('be.visible')
                        cy.wrap($str).get('a').contains('Subscribe Now!').click()
                        })
            })
        })

        //order Form page
        cy.url().should('include', '/custom-diet-plan-monthly-reup')
        cy.get('@trainerLink').then(json => {
            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', json[4].offer)

            const fName = clName + myCtr
            const lName = json[4].lname + dateS
            const cEmail = fName + lName + '@example.com'

            cy.typeUserInfo(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })
            cy.typePaymentInfo()

            //Verify Order details
            cy.get('.ifNotTAKEN.checkout-confirmation > :nth-child(1) > :nth-child(1)')
                .should('contain.text', json[4].purchaseNote)
            cy.get('#order-summary').contains(json[1].orderItem1).should('exist')

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
            cy.get('#profile-gender').select(json[4].gender)
            cy.completeWebProfile()

            //Login as Trainer Manager to check order is in Trainer Tool
            cy.loginTrainerManager()

            //record under test is NOT automatically assigned to a Trainer and in Assigned Clients page
            cy.verifyRecordNotInAssignedClientPage(
                {
                    email: cEmail,
                    trainer: assignTrainer
                })
            
            //purchase through trainer link with invalid Trainer name/ID are sent to Unassigned Plans
            cy.verifySubInUnassignedPlansPage(
                {
                    email: cEmail
                })

        })
    })
})