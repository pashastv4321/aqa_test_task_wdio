class CartPage {

    get cartItems () {
        return $$('.cart_item')
    }

    get checkoutBtn () {
        return  $('.checkout_button ')
    }

    get cartEmptyMessage () {
        return $('//*[@data-test="error"]')
    }

    async getFirstItemName () {
        const firstItem = await this.cartItems[0]
        const itemName = await firstItem.$('.inventory_item_name ').getText()

        return itemName
    }

    async getFirstItemPrice () {
        const firstItem = await this.cartItems[0]
        const itemPrice = await firstItem.$('.inventory_item_price').getText('')

        return itemPrice
    }

    async openCheckout () {
        await this.checkoutBtn.click()
    }

    async isCartEmpty() {
        const items = await this.cartItems
        return items.length === 0 
    }

}


export default new CartPage()