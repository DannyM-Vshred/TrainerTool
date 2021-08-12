/// <reference types="cypress" />
/// <reference types="cypress-iframe"/>

import 'cypress-iframe';
describe('My Exercises', () => {
before(()=>{
    cy.visit('https://demoqa.com')
})

    it.only('iFrame Exercises', () => {
        // cy.visit('https://demoqa.com/frames')
        cy.visit('https://demoqa.com/nestedframes')

        //check if iframes were loaded 
        cy.frameLoaded('#frame1')
        // cy.frameLoaded('#frame2')

        cy.iframe('#frame1').should('contain.text','Parent frame')
        cy.iframe('#frame1')
            // .find('iframe').should('have.value', 'Child Iframe')
            .iframe('iframe').should('contain.text', 'Child Iframe')
        // cy.iframe('#frame2').find('h1').should('contain.text','This is a sample page')
        //cy.iframe().find('h1').should('be.visible').click()

    })
})