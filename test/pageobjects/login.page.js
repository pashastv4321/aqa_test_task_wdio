import { $ } from '@wdio/globals'
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

    async login (username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnSubmit.click()
    }

    open () {
        return super.open()
    }
}

export default new LoginPage()
