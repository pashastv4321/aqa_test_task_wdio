import { $ } from '@wdio/globals'


class OverviewPage {
    get itemTotalPrice () {
        return $('.summary_subtotal_label')
    }

    get btnFinish () {
        return $('#finish')
    }

    get successMessageContainer () {
        return $('.complete-header')
    }

    get btnBackToProducts () {
        return $('#back-to-products')
    }

    async getTotalPrice () {
        const totalPrice = await this.itemTotalPrice.getText()

        return totalPrice.replace('Item total: ', '').trim()
    }

    async finishOverview () {
        await this.btnFinish.click()
    }
}


export default new OverviewPage()