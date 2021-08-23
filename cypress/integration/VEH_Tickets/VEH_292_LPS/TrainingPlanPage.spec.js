/// <reference types = "cypress"/>

describe('LPS Training Plan Page', () => {
    before(() => {
        cy.visit('https://testing-vehikl-74.vshred.com/')
        cy.get('#menu1').contains('Login', { matchCase: false }).click()

        cy.get('.login-form #email').clear().type('testDataAnalyst@example.com')
        cy.get('.login-form #password').clear().type('Vshred99')
        cy.get('button').contains('Login', { matchCase: false }).click()

        //work around to current landing page issue
        cy.get('#menu1').contains('Admin', { matchCase: false }).click()
        cy.contains('Admin Dashboard').click()
        cy.contains('Welcome to the admin dashboard').should('exist')

        cy.get('#side-menu').contains('Training Plans')
            .should('exist')
            .click()
        cy.url().should('include', '/training-plans')
        cy.get('h3').contains('Training Plans').should('exist')
        cy.get('#__BVID__13').clear('{enter}')
        cy.get('#__BVID__14').clear('{enter}')
        cy.get('#__BVID__15').clear('{enter}')
        cy.get('#__BVID__16').clear('{enter}')
        cy.get('#__BVID__17').clear('{enter}')

    })

    const searchID = 2
    const searchPlanName = 'Big Arms Program'
    const slug = 'big-arms-program'
    const abilityName = 'big-arms-program'
    const data = " ";

    context('Training Plans Page View Tests Cases', () => {
        beforeEach(() => {
            Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    
        })
    
        afterEach(() => {
            cy.get('#__BVID__13').clear('{enter}')
            cy.get('#__BVID__14').clear('{enter}')
            cy.get('#__BVID__15').clear('{enter}')
            cy.get('#__BVID__16').clear('{enter}')
            cy.get('#__BVID__17').clear('{enter}')
            cy.get('#_created_at').click()
        })
    
        it('can navigate to Training Plans Page', () => {
            //verify table headers
            cy.contains('ID').should('exist')
            cy.contains('Name').should('exist')
            cy.contains('Slug').should('exist')
            cy.contains('Is Trial').should('exist')
            cy.contains('Ability Name').should('exist')
            cy.contains('Created At').should('exist')
            cy.contains('Actions').should('exist')

            //verify Action buttons
            cy.get('.vuetable-body tr')
                .should('have.length', 25)
                .each(($row, index, $list) => {
                    cy.wrap($row).get('tr:nth-child(' + (index + 1) + ') td.vuetable-slot')
                        .within(($buttons) => {
                            cy.wrap($buttons).get('button').contains('View').should('be.enabled')
                            cy.wrap($buttons).get('button').contains('Edit').should('be.enabled')
                            cy.wrap($buttons).get('button').contains('Clone').should('be.enabled')
                        })
                })
        })

        it('can filter by Training Plans ID', () => {
            //verify filter by ID
            cy.get('#__BVID__13').clear().type(searchID + '{enter}')
            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-id').contains(searchID)
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-td-name')
                        .should('have.text',searchPlanName)      
                    cy.wrap($tr).get('td.vuetable-td-slug')
                        .should('have.text',slug)            
                    cy.wrap($tr).get('td.vuetable-td-ability_name')
                        .should('have.text',abilityName)         
                })              

        })

        it('can filter by Training Plans Name', () => {
            //verify filter by name
            cy.get('#__BVID__14').clear().type(searchPlanName + '{enter}')
            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-name').contains(new RegExp("^"+searchPlanName+"$"))   //exact Text .contains(new RegExp("^"+varName+$"))
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-td-id')
                        .should('have.text',searchID)      
                    cy.wrap($tr).get('td.vuetable-td-slug')
                        .should('have.text',slug)            
                    cy.wrap($tr).get('td.vuetable-td-ability_name')
                        .should('have.text',abilityName)         
            })              
        })

        it('can filter by slug', () => {
            //verify filter by name
            cy.get('#__BVID__15').clear().type(slug + '{enter}')
            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-slug').contains(new RegExp("^"+slug+"$"))              //exact Text .contains(new RegExp("^"+varName+$"))
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-td-id')
                        .should('have.text',searchID)      
                    cy.wrap($tr).get('td.vuetable-td-name')
                        .should('have.text',searchPlanName)            
                    cy.wrap($tr).get('td.vuetable-td-ability_name')
                        .should('have.text',abilityName)         
            })              
        })

        it('can filter by Ability Name', () => {
            //verify filter by name
            cy.get('#__BVID__17').clear().type(abilityName + '{enter}')
            cy.wait(3000)
            // cy.get('.vuetable-body td.vuetable-td-ability_name').contains('/^'+abilityName+'$/')
            cy.get('.vuetable-body td.vuetable-td-ability_name').contains(new RegExp("^"+abilityName+"$"))      //exact Text .contains(new RegExp("^"+varName+$"))
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-td-id')
                        .should('have.text',searchID)      
                    cy.wrap($tr).get('td.vuetable-td-name')
                        .should('have.text',searchPlanName)            
                    cy.wrap($tr).get('td.vuetable-td-slug')
                        .should('have.text',slug)         
            })              
        })

        it('can sort table columns', () => {
            //verify table column sorting 
            cy.get('thead tr:nth-child(1) th')
                .each(($label, index, $list) => {
                    const labelIdx = index
                    const columnTitle = "Column Title: " + $label.text()
                    if (labelIdx <= 3) {
                        cy.log(columnTitle)
                        cy.wrap($label).click()
                        cy.get('i.fa-chevron-up').should('be.visible')
                        cy.wrap($label).click()
                        cy.get('i.fa-chevron-down').should('be.visible')

                        labelIdx + 1
                    }
                })
        })
    })

    context('Training Plans Actions',() => {
        beforeEach(() => {
            Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    
        })
        afterEach(() => {
            
        })

        it('can View Training Plans',() => {
            cy.get('#__BVID__14').clear().type(searchPlanName + '{enter}')
            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-name').contains(new RegExp("^"+searchPlanName+"$"))   //exact Text .contains(new RegExp("^"+varName+$"))
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-slot button').contains('View').click()
            })
            cy.url().should('include','/training-plans/'+searchID+'/view')
            //page card section
            cy.get('.card-body h2').should('contain.text','Training Plans')
            cy.contains(new RegExp("^"+searchID+"$")).should('be.visible')
            cy.contains(new RegExp("^"+searchPlanName+"$")).should('be.visible')
            cy.contains(new RegExp("^"+abilityName+"$")).should('be.visible')

            cy.get('button').contains('Delete').should('be.enabled')
            cy.get('button').contains('Edit').should('be.enabled')

            //workout page section
            cy.get('.workouts div.week.card')
                .should('have.length.at.least', 4)
                .then(($weekcard)=>{
                    cy.wrap($weekcard).each(($card,index, $list)=>{
                        cy.wrap($card).within(($tr1)=>{
                           cy.get('h2').then(($h1)=>{
                                cy.log($h1.text())
                                })
                           cy.get('ul').then(($li)=>{
                                cy.log($li.text())   
                                })
                            .should('contain.text','Day 1')
                        })        
                    })
                })
                // .each(($weekCard,index,$list)=>{
                //     cy.wrap($weekCard).get('.workouts>div:nth-child('+(index+1)+') .week.card h2')
                //         .then(($header)=>{
                //             cy.log($header.text())  
                //         })
                //         .should('contain.text','Week: ')
                //     cy.wrap($weekCard).get('.workouts>div:nth-child('+(index+1)+') ul')
                //         .then(($workouts)=>{
                //             cy.log($workouts.text())
                //         })
                //         .should('length.at.least', 1)                        
                // })
        })

        it.only('can duplicate a Workout Week',()=>{
            cy.get('#__BVID__14').clear().type(searchPlanName + '{enter}')
            cy.wait(3000)
            cy.get('.vuetable-body td.vuetable-td-name').contains(new RegExp("^"+searchPlanName+"$"))   //exact Text .contains(new RegExp("^"+varName+$"))
                .parent()
                .within($tr => {
                    cy.wrap($tr).get('td.vuetable-slot button').contains('View').click()
            })
            cy.url().should('include','/training-plans/'+searchID+'/view')
            
            cy.get('.workouts div.week.card')
                .then(($weekcard)=>{
                    cy.wrap($weekcard).its('length').then(($ctr)=>{
                        const weekCount = $ctr
                        cy.log('Before Duplicate: ' + $ctr)

                    cy.wrap($weekcard).get('button').contains('Duplicate').click()    
                    cy.wait(1000)               
                    })
                    
                    



                })

        })
    })
})