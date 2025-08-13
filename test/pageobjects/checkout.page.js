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

    async fillFirstName (fakeFirstName) {
        return await this.inputFirstName.setValue(fakeFirstName)
    }

    async fillLastName (fakeLastName) {
        return await this.inputLastName.setValue(fakeLastName)
    } 

    async fillZipCode (fakeZipCode) {
        return await this.inputZipCode.setValue(fakeZipCode)
    }

    async clickContinueBtn () {
        return await this.btnContinue.click()
    }

}

export default new CheckoutPage()