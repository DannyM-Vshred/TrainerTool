/// <reference types="cypress" />
describe('My Exercises', () => {

    // beforeEach(() => {

    //     cy.visit('https://demoqa.com')
    // })

    it.only('Element Exercises', () => {
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
        cy.get('#submit')


    })

})