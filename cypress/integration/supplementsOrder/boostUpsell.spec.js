/// <reference types="cypress" />
import 'cypress-iframe';

describe('upSell Boost Test Max Supplement', () => {
    // before(() => {
    //     cy.fixture('loginData').as('loginData');
    //     cy.fixture('supplements/boostUpsell').as('upBoost')
    // })
    beforeEach(()=>{
        cy.fixture('loginData').as('loginData');
        cy.fixture('supplements/boostUpsell').as('upBoost')
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    const myCtr = '19';
    const dateS = '0720';
    const clName = 'test'

    it('can complete upsell purchase with 1 bottle each', function () {
        // const supplement = this.upSell

        cy.get('@upBoost').then((upSellSupp) => {
            cy.visit('/' + upSellSupp[0].url)

            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', upSellSupp[0].offer)

            const fName = clName + myCtr
            const lName = upSellSupp[0].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            cy.filloutSupplementShippinginfo(
                {
                    name: fName + " " + lName,
                })

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', upSellSupp[0].orderItem1)
                .next().should('contain.text', upSellSupp[0].orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.contains('YES! UPGRADE MY ORDER').click()        //upgrade add additional 6bottles $144
            cy.wait(1000)

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/hgh-us?trx')
            cy.get('h3').contains('ONE BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({ force: true })
                    cy.wrap($bottle).contains('ADD TO CART').click()        //add 1 bottle of HGH Boost
                })

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/burn-pm-cs-bt-f4')
            cy.get('h3').contains('ONE BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({ force: true })
                    cy.wrap($bottle).contains('ADD TO ORDER').click()       //add 1 bottle of Burn PM
                })

            cy.wait(4000)
            //Verify Order confirmation page is displayed
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)

            cy.get('.boxed.boxed--border.cart-total').then((cart) => {
                cy.wrap(cart).get('.h5').contains(upSellSupp[0].confirmOrder1).should('exist')
                    .parent().next().contains(upSellSupp[0].price1).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[0].confirmOrder2).should('exist')
                    .parent().next().contains(upSellSupp[0].price2).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[0].confirmOrder3).should('exist')
                    .parent().next().contains(upSellSupp[0].price3).should('exist')
                cy.wrap(cart).get(':nth-child(3) :nth-child(6) :nth-child(1) > span').contains(upSellSupp[0].confirmOrder4).should('exist')
                    .parent().next().contains(upSellSupp[0].price4).should('exist')
            })
        })

    })

    it('can complete upsell purchase with 3 bottles each', function () {
        // const supplement = this.upSell

        // cy.get(supplement).then((upSellSupp) => {
        cy.get('@upBoost').then((upSellSupp) => {
            cy.visit('/' + upSellSupp[1].url)

            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', upSellSupp[1].offer)

            const fName = clName + myCtr
            const lName = upSellSupp[1].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            cy.filloutSupplementShippinginfo(
                {
                    name: fName + " " + lName,
                })

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', upSellSupp[1].orderItem1)
                .next().should('contain.text', upSellSupp[1].orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.contains('No thanks').click()    //no thanks to 6more bottles
            cy.wait(1000)

            cy.skipPromoVideos()
            cy.contains('No thanks').click()    //no thanks to 3more bottles
            cy.wait(1000)


            cy.skipPromoVideos()
            cy.url().should('include', '/survey/hgh-us?trx')
            cy.get('h3').contains('THREE BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({force:true})
                    // cy.get('p.auto-refill').should('not.be.visible')
                    cy.wrap($bottle).contains('ADD TO CART').click()    //add 3 bottles of HGH Boost
                })

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/burn-pm-cs-bt-f4')
            cy.get('h3').contains('THREE BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({force:true})
                    cy.wrap($bottle).contains('ADD TO ORDER').click()   //add 3 bottle of Burn PM
                })

            cy.wait(4000)
            //Verify Order confirmation page is displayed
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)

            cy.get('.boxed.boxed--border.cart-total').then((cart) => {
                cy.wrap(cart).get('.h5').contains(upSellSupp[1].confirmOrder1).should('exist')
                    .parent().next().contains(upSellSupp[1].price1).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[1].confirmOrder2).should('exist')
                    .parent().next().contains(upSellSupp[1].price2).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[1].confirmOrder3).should('exist')
                    .parent().next().contains(upSellSupp[1].price3).should('exist')
            })
        })
    })

    it('can complete upsell purchase with 6 bottles each', function () {
        // const supplement = this.upSell

        // cy.get(supplement).then((upSellSupp) => {
        cy.get('@upBoost').then((upSellSupp) => {
            cy.visit('/' + upSellSupp[2].url)

            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', upSellSupp[2].offer)

            const fName = clName + myCtr
            const lName = upSellSupp[2].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            cy.filloutSupplementShippinginfo(
                {
                    name: fName + " " + lName,
                })

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', upSellSupp[2].orderItem1)
                .next().should('contain.text', upSellSupp[2].orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.contains('No thanks').click()    //no thanks to 6more bottles
            cy.wait(1000)

            cy.skipPromoVideos()
            cy.contains('No thanks').click()    //no thanks to 3more bottles
            cy.wait(1000)


            cy.skipPromoVideos()
            cy.url().should('include', '/survey/hgh-us?trx')
            cy.get('h3').contains('SIX BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({force:true})
                    // cy.get('p.auto-refill').should('not.be.visible')
                    cy.wrap($bottle).contains('ADD TO CART').click()    //add 6 bottles of HGH Boost
                })

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/burn-pm-cs-bt-f4')
            cy.get('h3').contains('SIX BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({force:true})
                    cy.wrap($bottle).contains('ADD TO ORDER').click()   //add 6 bottle of Burn PM
                })

            cy.wait(4000)
            //Verify Order confirmation page is displayed
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)

            cy.get('.boxed.boxed--border.cart-total').then((cart) => {
                cy.wrap(cart).get('.h5').contains(upSellSupp[2].confirmOrder1).should('exist')
                    .parent().next().contains(upSellSupp[2].price1).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[2].confirmOrder2).should('exist')
                    .parent().next().contains(upSellSupp[2].price2).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[2].confirmOrder3).should('exist')
                    .parent().next().contains(upSellSupp[2].price3).should('exist')
            })
        })
    })

    it     ('can purchase testboost subs and upsell 3bottles HGH and Burn PM', function () {
        // const supplement = this.upSell

        // cy.get(supplement).then((upSellSupp) => {
        cy.get('@upBoost').then((upSellSupp) => {
            cy.visit('/' + upSellSupp[3].url)

            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', upSellSupp[3].offer)

            const fName = clName + myCtr
            const lName = upSellSupp[3].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            cy.filloutSupplementShippinginfo(
                {
                    name: fName + " " + lName,
                })

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', upSellSupp[3].orderItem1)
                .next().should('contain.text', upSellSupp[3].orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/hgh-us?trx')
            cy.get('h3').contains('THREE BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({ force: true })
                    cy.wrap($bottle).contains('ADD TO CART').click()        //add 3 bottle of HGH Boost
                })

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/burn-pm-cs-bt-f4')
            cy.get('h3').contains('THREE BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({ force: true })
                    cy.wrap($bottle).contains('ADD TO ORDER').click()       //add 3 bottle of Burn PM
                })

            cy.wait(4000)
            //Verify Order confirmation page is displayed
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)

            cy.get('.boxed.boxed--border.cart-total').then((cart) => {
                cy.wrap(cart).get('.h5').contains(upSellSupp[3].confirmOrder1).should('exist')
                    .parent().next().contains(upSellSupp[3].price1).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[3].confirmOrder2).should('exist')
                    .parent().next().contains(upSellSupp[3].price2).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[3].confirmOrder3).should('exist')
                    .parent().next().contains(upSellSupp[3].price3).should('exist')
            })
        })

    })

    it('can purchase testboost subs and upsell 6bottles HGH and Burn PM', function () {
        // const supplement = this.upSell

        // cy.get(supplement).then((upSellSupp) => {
        cy.get('@upBoost').then((upSellSupp) => {
            cy.visit('/' + upSellSupp[4].url)

            cy.get('.product-details-content p', { timeout: 2000 })
                .should('contain.text', upSellSupp[4].offer)

            const fName = clName + myCtr
            const lName = upSellSupp[4].lname + dateS
            const cEmail = fName + lName + '@example.net'

            cy.log(cEmail)
            cy.typeUserInfoSupp(
                {
                    name: fName + " " + lName,
                    email: cEmail
                })

            cy.filloutSupplementShippinginfo(
                {
                    name: fName + " " + lName,
                })

            cy.typePaymentInfoSupplement()

            //Verify Order details
            cy.get('td.py-1').should('contain.text', upSellSupp[4].orderItem1)
                .next().should('contain.text', upSellSupp[4].orderQty)

            //Submit Order
            cy.get('#submit-order', { timeout: 2000 }).click()
            cy.wait(10000)

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/hgh-us?trx')
            cy.get('h3').contains('SIX BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({ force: true })
                    cy.wrap($bottle).contains('ADD TO CART').click()        //add 6 bottle of HGH Boost
                })

            cy.skipPromoVideos()
            cy.url().should('include', '/survey/burn-pm-cs-bt-f4')
            cy.get('h3').contains('SIX BOTTLE')
                .should('be.visible')
                .parent()
                .within(($bottle) => {
                    // cy.wrap($bottle).get('.checkboxes input[name=starter][value=one-time]').click({ force: true })
                    cy.wrap($bottle).contains('ADD TO ORDER').click()       //add 6 bottle of Burn PM
                })

            cy.wait(4000)
            //Verify Order confirmation page is displayed
            cy.contains('Thank you', { timeout: 8000 })
            cy.get('[test-id="email"]').should('contain.text', cEmail)

            cy.get('.boxed.boxed--border.cart-total').then((cart) => {
                cy.wrap(cart).get('.h5').contains(upSellSupp[4].confirmOrder1).should('exist')
                    .parent().next().contains(upSellSupp[4].price1).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[4].confirmOrder2).should('exist')
                    .parent().next().contains(upSellSupp[4].price2).should('exist')
                cy.wrap(cart).get('.h5').contains(upSellSupp[4].confirmOrder3).should('exist')
                    .parent().next().contains(upSellSupp[4].price3).should('exist')
            })
        })

    })


})