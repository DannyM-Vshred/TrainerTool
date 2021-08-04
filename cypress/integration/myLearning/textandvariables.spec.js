/// <reference types="cypress" />
describe('My Exercises', () => {
    it.only('Element Exercises', () => {
        const userName = 'Alex Mercia'
        const email = 'foo@example.com'
        const address = 'current address it is'
        const permanentAddress = 'this is for permanency'

        cy.visit('https://demoqa.com/text-box')
        cy.get('#userName').type(userName)
        
        cy.get('#userEmail').type(email)
        cy.get('#currentAddress').type(address)
        cy.get('#permanentAddress').type(permanentAddress)

        cy.get('#submit').click()

        // see that we see the username on the confirm page
        cy.contains(userName).should('be.visible')
        // see that we see the email on the confirm page
        cy.contains(email).should('be.visible')
        // and so on and so forth
        cy.contains(address).should('be.visible')
        cy.contains(permanentAddress).should('be.visible')
    })
})