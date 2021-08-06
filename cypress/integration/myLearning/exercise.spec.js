/// <reference types="cypress" />
describe('My Exercises', () => {

    // beforeEach(() => {

    //     cy.visit('https://demoqa.com')
    // })

    it('Element Exercises', () => {
        cy.visit('https://demoqa.com/text-box')
        cy.get('#userName').type('Alex Mercia')
            .invoke('attr', 'type')
            .then((name) => {
                const clientName = name
                console.log(clientName)
            })

        const emailToType = 'alex.mercia@example.com' // store this as a variable to use later
        let foundEmail = 'x' // set a variable outside of the scope of the cy.get()

        cy.get('#userEmail')
            .type(emailToType)
            .invoke('val')
            .as('emailAlias')
            .then((email) => {
                foundEmail = email
                console.log(foundEmail)
            })

        console.log(foundEmail) // works
        console.log(foundEmail === emailToType) // will log 'true' if both values are the same

        cy.window().then((win) => {
            console.log(win.document.querySelector("#userEmail").textContent);  // the result is the context of the element
        });

        cy.get('#currentAddress').type('current address it is')
            .invoke('val').as('address')
            .then((address) => {
                const curAdd = address
                // console.log(curAdd)
            })

        cy.get('#permanentAddress').type('this is for permanency')
        cy.get('#submit').click()


    })

    it.only('can Assign Client to Trainer',()=>{

        cy.visit('https://testing-2.vshred.com/login?ref=home')
        cy.loginTrainerManager()

        cy.contains('Trainer Tool').click();
        cy.contains('Unassigned Plans').click();
        cy.wait(5000);

        cy.get('#__BVID__21').type('0805@example.net' + '{enter}');

        //assign trainer
        // cy.contains('.vuetable-body td','cytest41otp6PackShred0805@example.net')
        cy.contains('.vuetable-body td', 'cytest13otpToned90Days0805@example.net')
            .parent()
            .within($tr=>{
                cy.get('.vuetable-slot .multiselect__placeholder')
                .click()
                .get('.multiselect__input')
                .type('Trainer two {enter}')
            })
        cy.get('p.toast-text').should('contain.text','Successfully assigned trainer to client')

        //check assignment
        cy.contains('Trainer Tool').click();
        cy.contains('Assigned Clients Beta').click();
        cy.wait(5000);

        cy.get('#__BVID__16').type('cytest41otp6PackShred0805@example.net' + '{enter}');
        cy.contains('.vuetable-body', 'cytest41otp6PackShred0805@example.net')
           .parent()
           .within($tr=>{
             cy.get('td.vuetable-td-trainer_name').should('have.text','cyTrainer  OTP')
           })
           
        // cy.get('.vuetable-body .vuetable-td-email').contains('cytest41otp6PackShred0805@example.net').click()
        
    })

})