import { browser, expect } from '@wdio/globals'
import { faker } from '@faker-js/faker'

import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'
import FooterPage from '../pageobjects/footer.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'
import OverviewPage from '../pageobjects/overview.page.js'


describe('Login', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })
    it('login with valid credentials', async () => {
        const typeAttribute = await LoginPage.inputPassword.getAttribute('type')
        await expect(typeAttribute).toEqual('password')

        await LoginPage.inputUsername.setValue('standard_user')
        await expect(LoginPage.inputUsername).toHaveValue('standard_user')

        await LoginPage.inputPassword.setValue('secret_sauce')
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce')

        await LoginPage.btnSubmit.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        const inventoryItems = await InventoryPage.itemsInventory
        await expect(inventoryItems.length).toBeGreaterThan(0)

        await expect(InventoryPage.shoppingCartBadge).toBeDisplayed()
    })

    it('login with invalid password', async () => {
        const typeAttribute = await LoginPage.inputPassword.getAttribute('type')
        await expect(typeAttribute).toEqual('password')

        await LoginPage.inputUsername.setValue('standard_user')
        await expect(LoginPage.inputUsername).toHaveValue('standard_user')

        await LoginPage.inputPassword.setValue('incorrect_password')
        await expect(LoginPage.inputPassword).toHaveValue('incorrect_password')

        await LoginPage.btnSubmit.click()
        await expect(LoginPage.inputUsername).toHaveElementClass('error')
        await expect(LoginPage.usernameX).toBeDisplayed()
        await expect(LoginPage.inputPassword).toHaveElementClass('error')
        await expect(LoginPage.passwordX).toBeDisplayed()
        await expect(LoginPage.errorMessageContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })

    it('login with invalid login', async () => {
        const typeAttribute = await LoginPage.inputPassword.getAttribute('type')
        await expect(typeAttribute).toEqual('password')

        await LoginPage.inputUsername.setValue('invalid_username')
        await expect(LoginPage.inputUsername).toHaveValue('invalid_username')

        await LoginPage.inputPassword.setValue('secret_sauce')
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce')

        await LoginPage.btnSubmit.click()
        await expect(LoginPage.inputUsername).toHaveElementClass('error')
        await expect(LoginPage.usernameX).toBeDisplayed()
        await expect(LoginPage.inputPassword).toHaveElementClass('error')
        await expect(LoginPage.passwordX).toBeDisplayed()
        await expect(LoginPage.errorMessageContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })

    it('logout', async () => {
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await InventoryPage.burgerBtn.click()
        await expect(InventoryPage.menuItems).toBeElementsArrayOfSize(4)
        await expect(InventoryPage.btnLogout).toBeClickable()
        await InventoryPage.btnLogout.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await expect(LoginPage.inputUsername).toHaveValue('')
        await expect(LoginPage.inputPassword).toHaveValue('')
    })
})


describe('Inventory Page', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    afterEach(async () => {
        await InventoryPage.logout()
    })

    it('saving the cart after logout', async () => {
        const itemIndex = 0 
        const expectedItemName = InventoryPage.getItemDescription(itemIndex)

        const beforeAddingCount = await InventoryPage.getCartCount()
        await InventoryPage.addFirstItemToCart()
        const afterAddingCount = await InventoryPage.getCartCount()
        
        await expect(afterAddingCount).toEqual(beforeAddingCount + 1)

        await InventoryPage.burgerBtn.click()
        await expect(InventoryPage.menuItems).toBeElementsArrayOfSize(4)
        await expect(InventoryPage.btnLogout).toBeClickable()
        await InventoryPage.btnLogout.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await expect(LoginPage.inputUsername).toHaveValue('')
        await expect(LoginPage.inputPassword).toHaveValue('')


        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        const inventoryItems = await InventoryPage.itemsInventory
        await expect(inventoryItems.length).toBeGreaterThan(0)

        await expect(InventoryPage.shoppingCartBadge).toBeDisplayed()

        await InventoryPage.openCartPage()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        const actualItemName = CartPage.getFirstItemName()
        await expect(actualItemName).toEqual(expectedItemName)

    })

    it('footer links', async () => {
        //twitter
        const initialHandle = await browser.getWindowHandle()
        const twitterLink = await FooterPage.twitterLocator
        await twitterLink.click()

        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
            timeoutMsg: 'No new window opened'
        })

        const twitterHandles = await browser.getWindowHandles()
        const twitterNewHandle = twitterHandles.find(handle => handle !== initialHandle)
        await browser.switchToWindow(twitterNewHandle)
        await expect(browser).toHaveUrl('https://x.com/saucelabs')
        await browser.closeWindow()
        await browser.switchToWindow(initialHandle)
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        //facebook
        const facebookLink = FooterPage.facebookLocator
        await facebookLink.click()

        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
            timeoutMsg: 'No new window opened'
        })

        const facebookHandles = await browser.getWindowHandles()
        const facebookNewHandle = facebookHandles.find(handle => handle !== initialHandle)
        await browser.switchToWindow(facebookNewHandle)
        await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs')
        await browser.closeWindow()
        await browser.switchToWindow(initialHandle)
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        //linkedIN
        const linkedInLink = FooterPage.linkedInLocator
        await linkedInLink.click()

        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
            timeoutMsg: 'No new window opened'
        })

        const linkedInHandles = await browser.getWindowHandles()
        const linkedInNewHandle = linkedInHandles.find(handle => handle !== initialHandle)
        await browser.switchToWindow(linkedInNewHandle)
        await expect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/')
        await browser.closeWindow()
        await browser.switchToWindow(initialHandle)
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

    })

})

function isSortedAscending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}

function isSortedDescending(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false
        }
    }
    return true
}

describe('Sorting', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    it('should sort products by Name (A to Z)', async () => {
        const sortOption = 'Name (A to Z)'
        await InventoryPage.selectSortOption(sortOption)
        const itemNames = await InventoryPage.getAllItemNames()

        await expect(isSortedAscending(itemNames)).toBe(true)
    })

    it('should sort products by Name (Z to A)', async () => {
        const sortOption = 'Name (Z to A)'
        await InventoryPage.selectSortOption(sortOption)
        const itemNames = await InventoryPage.getAllItemNames()
        
        await expect(isSortedDescending(itemNames)).toBe(true)
    });

    it('should sort products by Price (low to high)', async () => {
        const sortOption = 'Price (low to high)'
        await InventoryPage.selectSortOption(sortOption)
        const itemPrices = await InventoryPage.getAllItemPrices()
        
        await expect(isSortedAscending(itemPrices)).toBe(true)
    });

    it('should sort products by Price (high to low)', async () => {
        const sortOption = 'Price (high to low)'
        await InventoryPage.selectSortOption(sortOption);
        const itemPrices = await InventoryPage.getAllItemPrices()
        
        await expect(isSortedDescending(itemPrices)).toBe(true)
    })
})


describe('Checkout', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await browser.execute(() => {
            window.localStorage.clear()
        })
        await browser.refresh()
    })

    it('valid checkout', async () => {
        const itemIndex = 0 
        const expectedItemName = await InventoryPage.getItemDescription(itemIndex)
        const expectedItemPrice =  await InventoryPage.getItemPrice(itemIndex)

        const beforeAddingCount = await InventoryPage.getCartCount()
        await InventoryPage.addFirstItemToCart()
        const afterAddingCount = await InventoryPage.getCartCount()
        
        await expect(afterAddingCount).toEqual(beforeAddingCount + 1)

        await InventoryPage.openCartPage()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        const actualItemName = await CartPage.getFirstItemName()
        await expect(actualItemName).toEqual(expectedItemName)
        
        await CartPage.openCheckout()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')

        const fakeFirstName = faker.person.firstName()
        const fakeLastName = faker.person.lastName()
        const fakeZipCode = faker.location.zipCode()

        await CheckoutPage.inputFirstName.setValue(fakeFirstName)
        await expect(CheckoutPage.inputFirstName).toHaveValue(fakeFirstName)

        await CheckoutPage.inputLastName.setValue(fakeLastName)
        await expect(CheckoutPage.inputLastName).toHaveValue(fakeLastName)

        await CheckoutPage.inputZipCode.setValue(fakeZipCode)
        await expect(CheckoutPage.inputZipCode).toHaveValue(fakeZipCode)

        await CheckoutPage.btnContinue.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
        const overviewItemName = await CartPage.getFirstItemName()
        await expect(overviewItemName).toEqual(expectedItemName)
        const overviewTotalPrice = await OverviewPage.getTotalPrice()
        await expect(overviewTotalPrice).toEqual(expectedItemPrice)
        
        await OverviewPage.finishOverview()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')
        await expect(OverviewPage.successMessageContainer).toHaveText('Thank you for your order!')

        await OverviewPage.btnBackToProducts.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    // This test fails, real behavior is not as expected in test cases 
    it('checkout without products', async () => {
        await InventoryPage.openCartPage()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        await expect(CartPage.cartItems).toBeElementsArrayOfSize(0)
        await CartPage.openCheckout()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        await expect(CartPage.cartEmptyMessage).toBeDisplayed()        
    })
})


