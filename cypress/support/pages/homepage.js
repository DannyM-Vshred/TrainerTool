
import 'cypress-iframe';
import '@testing-library/cypress/add-commands';


Cypress.Commands.add('SelectGender',(gender)=>{
    if(gender == "male"){
        cy.get('.gender-selector__ctas').contains('Male').click()

    }else{
        cy.get('.gender-selector__ctas').contains('Male').click()
    }
})