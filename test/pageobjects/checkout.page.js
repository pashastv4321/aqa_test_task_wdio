import { $ } from '@wdio/globals'

class CheckoutPage {
    get inputFirstName () {
        return $('#first-name')
    }

    get inputLastName () {
        return $('#last-name') 
    }

    get inputZipCode () {
        return $('#postal-code') 
    }

    get btnContinue () {
        return $('#continue')
    }

}

export default new CheckoutPage()