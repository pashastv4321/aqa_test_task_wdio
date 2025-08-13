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

    async clickTwitter () {
        return await this.twitterLocator.click()
    }

    async clickFacebook () {
        return await this.facebookLocator.click()
    }

    async clickLinkedIn () {
        return await this.linkedInLocator.click()
    }

}


export default new FooterPage()