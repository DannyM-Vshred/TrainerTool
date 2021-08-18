/// <reference types= "cypress"/>


describe('web element locator', () => {
    before(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('can access checkboxes', () => {


        cy.get('#checkBoxOption1').click()
            .should('be.checked')
            .and('have.value', 'option1')

        cy.get('#checkBoxOption1').uncheck()
            .should('not.be.checked')

        cy.get('input[type=checkbox]').check(['option2', 'option3'])     //array of [] lookign for value attribute

    })


    it('can access radio butons', () => {
        cy.get('input[value=radio2]').click()
            .should('be.checked')
            .and('have.value', 'radio2')

        cy.get('input[value=radio3]').check()
            .should('be.checked')
            .and('have.value', 'radio3')

    })

    it('can access static dropdowns', () => {
        //select are predefined

        cy.get('#dropdown-class-example').select('Option2')             //looking at "value" attribute and text of the element
            .should('have.value', 'option2')
    })

    it('can access dynamic dropdowns', () => {
        //select reference by text input
        cy.get('#autocomplete').type('uni')                             //get the dropdown handle, type a text value
        cy.get('.ui-menu-item div').each(($e1, index, $list) => {         //get the parent element and use the .each() function capture the child elements arrat to iterate
            if ($e1.text() == "United States (USA)") {                  //if defined text is found, click()
                cy.wrap($e1).click()                                //directly using .click() over a variable is now depricated so a need for cy.wrap($variable) 
            }
        })

    })

    it('can handle visible and invisible elements',()=>{

        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

    })

    it('can handle pop ups',()=>{
        //cypress by default handles alert and confirm popups to True
        //to check for pop up alert text, youll need to listen for browser events using "cy.on('window:alert')"

        // alert
        cy.get('#alertbtn').click()
        cy.on('window:alert',(str)=>{                   //cy.on('window:alert, (str)=> {})      gets access to the alert method
            expect(str).to.contain('Hello , share this practice')
            expect(str).to.eq('Hello , share this practice page and share your knowledge')
        })
        

        //confirm with yes or no
        cy.get('#confirmbtn').click()
        cy.on('window:confirm',(str)=>{
            expect(str).to.eq('Hello , Are you sure you want to confirm?')
            return false                            //returns Cancel confirmation
        })
    })

    it('can handle child tabs on the same browser',()=>{
        //by default cypress do not handle child browser tabs 
        //Note if the element has a 'target' attribute. The target attribute defines where to open the href url. if 'target' element is not present, it will open on the same window
        // <a id="opentab"class="btn-style class1 class2" href="https://www.rahulshettyacademy.com/" target="_blank">Open Tab</a>==$0
        
        //the workaround is to force open on the href url on the same page by using invoke() and jquery function 'removeAttr'
        cy.get('#opentab')                              
            .invoke('removeAttr','target')          // using the invoke() command, we can pass a jquery function and the element to remove
            .click()
        cy.url().should('include','www.rahulshettyacademy.com')

        cy.go('back')       //should go back to previous page                   //cy.go() enables you to move betwen pages
        cy.url().should('include','AutomationPractice')     
        cy.go('forward')
        cy.url().should('include','www.rahulshettyacademy.com')

    })

    it.only('can access web tables',()=>{
        // cy.get('#product td').contains('Python')
        //next() moves the locator to the next row element
        cy.get('#product td').contains('Python')
            .next()
            .should('contain.text','25')

        //long method using an array list
        cy.get('#product td').each(($e1, index,$list)=>{
            const text = $e1.text()
            if(text.includes('Python')){
                cy.get('#product tbody tr td').eq(index).next().then(function(price){
                    const priceText = price.text()
                    expect(priceText).to.eq('25')

                })
            }            
        })

    })


})


