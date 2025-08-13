import Page from './page.js';


class LoginPage extends Page {

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }

    get errorMessageContainer () {
        return $('.error-message-container')
    }

    get usernameX () {
        return $('[data-test="username"] ~ .error_icon')
    }

    get passwordX () {
        return $('[data-test="password"] ~ .error_icon')
    }

    async fillUsername (username) {
        return await this.inputUsername.setValue(username)
    }

    async fillPassword (password) {
        return await this.inputPassword.setValue(password)
    }

    async clickSubmit () {
        return await this.btnSubmit.click()
    }

    async login (username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnSubmit.click()
    }

    async getPasswordInputType() {
        return  this.inputPassword.getAttribute('type')
    }

    open () {
        return super.open()
    }
}

export default new LoginPage()
