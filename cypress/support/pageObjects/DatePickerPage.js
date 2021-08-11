class DatePickerPage{

    getDatePicker(){
        return cy.get('.btn-default').contains('Select date')

    }

    getCaldendar(){
        return cy.get('div.vdp-datepicker')
    }

    getNavigateBack(){
        cy.get('span.prev')

    }
    getNavigateForward(){
        cy.get('span.next')
    }
    getMonth(){
        cy.get('span.day__month_btn').click()
        cy.get('.cell month')
    }
    getYear(){
        cy.get('span.month__year_btn')

    }

}