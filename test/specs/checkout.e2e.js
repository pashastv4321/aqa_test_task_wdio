import { faker } from '@faker-js/faker'

import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'
import overviewPage from '../pageobjects/overview.page.js'


describe('Checkout', () => {
    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')

        await browser.execute(() => {
            window.localStorage.clear()
        })
        await browser.refresh()
    })

    it('valid checkout', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        const itemIndex = 0 
        const expectedItemName = await inventoryPage.getItemDescription(itemIndex)
        const expectedItemPrice =  await inventoryPage.getItemPrice(itemIndex)

        const beforeAddingCount = await inventoryPage.getCartCount()
        await inventoryPage.addFirstItemToCart()
        const afterAddingCount = await inventoryPage.getCartCount()
        
        await expect(afterAddingCount).toEqual(beforeAddingCount + 1)

        await inventoryPage.openCartPage()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        const actualItemName = await cartPage.getFirstItemName()
        await expect(actualItemName).toEqual(expectedItemName)
        
        await cartPage.openCheckout()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')

        const fakeFirstName = faker.person.firstName()
        const fakeLastName = faker.person.lastName()
        const fakeZipCode = faker.location.zipCode()

        await checkoutPage.fillFirstName(fakeFirstName)
        await expect(checkoutPage.inputFirstName).toHaveValue(fakeFirstName)

        await checkoutPage.fillLastName(fakeLastName)
        await expect(checkoutPage.inputLastName).toHaveValue(fakeLastName)

        await checkoutPage.fillZipCode(fakeZipCode)
        await expect(checkoutPage.inputZipCode).toHaveValue(fakeZipCode)

        await checkoutPage.clickContinueBtn()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
        const overviewItemName = await cartPage.getFirstItemName()
        await expect(overviewItemName).toEqual(expectedItemName)
        const overviewTotalPrice = await overviewPage.getTotalPrice()
        await expect(overviewTotalPrice).toEqual(expectedItemPrice)
        
        await overviewPage.finishOverview()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')
        await expect(overviewPage.successMessageContainer).toHaveText('Thank you for your order!')

        await overviewPage.clickBackBtn()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    })

    // This test fails, real behavior is not as expected in test cases 
    it('checkout without products', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        await inventoryPage.openCartPage()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        await expect(cartPage.cartItems).toBeElementsArrayOfSize(0)
        await cartPage.openCheckout()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        await expect(cartPage.cartEmptyMessage).toBeDisplayed()        
    })
})