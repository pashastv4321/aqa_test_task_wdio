import { $ } from '@wdio/globals'

class FooterPage {
    get twitterLocator() {
        return $('a[data-test="social-twitter"]')
    }

    get facebookLocator() {
        return $('a[data-test="social-facebook"]')
    }

    get linkedInLocator() {
        return $('a[data-test="social-linkedin"]')
    }
}


export default new FooterPage()