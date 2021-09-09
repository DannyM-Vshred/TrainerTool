/// <reference types="cypress" />

import { debug } from "console"

describe('Create Users', function()
{
    before(()=>{
         cy.visit('/')
        //importing the json file and saving to an alias name
         cy.fixture('users/newBetaTrainerUsers.json').as('betaTrainer') 
         cy.fixture('users/newCyTrainerUsers.json').as('cyTrainer') 
    })

    beforeEach(()=>{
        cy.loginTrainerManager()
    })

    it('can create Beta Trainer users', function(){
        //Using the alias name to this keyword, So we can use globally  
        const nUsers = this.betaTrainer
    
        //should loop through .json data with a new variable
        cy.get(nUsers).each((userList) => {
            cy.contains('Users').click()
            cy.url().should('include', '/admin/users')

            cy.get('button[title="Create user"]').click()

            //create Trainer users
            cy.get('#user-name').clear().type(userList.name)
            cy.get('#user-email').clear().type(userList.email)
            cy.get('#user-password').clear().type(userList.password)
            cy.get('#user-confirm').clear().type(userList.confirmPass)
            cy.get('#user-status').select(userList.role)
            cy.get('#gender .custom-select').select(userList.gender)
            // cy.get('button').contains('Save').click()
            cy.get('button').contains('Cancel').click()
            // cy.get('.ibox-content > h2').should('contain.text',userList.name)        
        })
    })

    it.only('can create cyTest Trainer users', function(){
        const nUsers = this.cyTrainer
    
        //should loop through .json data with a new variable
        cy.get(nUsers).each((userList) => {
            cy.contains('Users').click()
            cy.url().should('include', '/admin/users')

            cy.get('button[title="Create user"]').click()

            //create Trainer users
            cy.get('#user-name').clear().type(userList.name)
            cy.get('#user-email').clear().type(userList.email)
            cy.get('#user-password').clear().type(userList.password)
            cy.get('#user-confirm').clear().type(userList.confirmPass)
            cy.get('#user-status').select(userList.role)
            cy.get('#gender .custom-select').select(userList.gender)
            cy.get('button').contains('Save').click()
            // cy.get('button').contains('Cancel').click()
            cy.get('.ibox-content > h2').should('contain.text',userList.name)     
        })
    })

})