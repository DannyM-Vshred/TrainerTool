/// <reference types = "Cypress"/>
import SelectGender from '../../support/pages/SelectGender';


describe('homepage survey', ()=>{


    it('can go survey',()=>{
        cy.visit('testing-2.vshred.com')

        cy.SelectGender('Female')


    })
})