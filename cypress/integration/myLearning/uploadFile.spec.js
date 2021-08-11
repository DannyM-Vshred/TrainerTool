/// <reference types="cypress" />

describe('upload file',()=>{

    before(()=>{
        cy.visit('https://the-internet.herokuapp.com/upload')
    })

    it('can upload file',()=>{
        const filePath = '/uploadFile/Funny_Test_FIle.pdf'
        cy.get('input[type=file]').attachFile(filePath)
        cy.get('#file-submit').click()
        cy.get('#uploaded-files').contains('Funny').should('exist')

      



    })

})