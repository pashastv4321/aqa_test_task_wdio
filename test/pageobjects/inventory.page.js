class InventoryPage {

    get burgerBtn () {
        return $('#react-burger-menu-btn')
    }

    get btnLogout () {
        return $('#logout_sidebar_link')
    }

    get addToCartBtns () {
        return $$('.btn_inventory ')
    }

    get shoppingCartBadge () {
        return $('a[data-test="shopping-cart-link"]')
    }

    get itemsInventory () {
        return $$('.inventory_item')
    }

    get itemNames () {
        return $$('.inventory_item_name')
    }

    get itemPrices () {
        return $$('.inventory_item_price')
    }

    get sortOptions () {
        return $('.product_sort_container')
    }

    get menuItems () {
        return $$('.bm-item')
    }

    async clickBurgerBtn () {
        return await this.burgerBtn.click()
    }

    async clickLogout () {
        return await this.btnLogout.click()
    }

    async logout () {
        await this.burgerBtn.click()
        await expect(this.btnLogout).toBeClickable()
        await this.btnLogout.click()
    }

    async getCartCount () {
        const cartBadge = await this.shoppingCartBadge
        const cartBadgeExists = await cartBadge.isExisting()

        if (cartBadgeExists) {
            const countItemsText = await cartBadge.getText()
            const parsedCount = parseInt(countItemsText, 10)
            
            if (Number.isNaN(parsedCount)) {
                return 0;
            }
            return parsedCount
        } else {
            return 0
        }
    }

    async addFirstItemToCart () {
        const firstAddToCartBtn = await this.addToCartBtns[0]
        await firstAddToCartBtn.click()
    }

    async openCartPage () {
        await this.shoppingCartBadge.click()
    }

    async getItemDescription (index) {
        const itemContainer = await this.itemsInventory[index]
        const itemName = await itemContainer.$('.inventory_item_name').getText()

        return itemName
    }

    async selectSortOption (sortText) {
        await this.sortOptions.selectByVisibleText(sortText)
    }

    async getAllItemNames () {
        return await this.itemNames.map(async element => await element.getText())
    }

    async getAllItemPrices() {
        const itemPricesElements = await this.itemPrices
        const priceStrings = await itemPricesElements.map(element => element.getText())
        
        return priceStrings.map(price => parseFloat(price.replace('$', '')))
    }

    async getItemPrice(index) {
        const itemContainer = await this.itemsInventory[index]
        const itemPrice = await itemContainer.$('.inventory_item_price').getText()

        return itemPrice
    }

}

export default new InventoryPage()