import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'
import footerPage from '../pageobjects/footer.page.js'



describe('Inventory Page', () => {
    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    afterEach(async () => {
        await inventoryPage.logout()
    })

    it('saving the cart after logout', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        const itemIndex = 0 
        const expectedItemName = inventoryPage.getItemDescription(itemIndex)

        const beforeAddingCount = await inventoryPage.getCartCount()
        await inventoryPage.addFirstItemToCart()
        const afterAddingCount = await inventoryPage.getCartCount()
        
        await expect(afterAddingCount).toEqual(beforeAddingCount + 1)

        await inventoryPage.clickBurgerBtn()
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4)
        await expect(inventoryPage.btnLogout).toBeClickable()
        await inventoryPage.clickLogout()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')


        await loginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        const inventoryItems = await inventoryPage.itemsInventory
        await expect(inventoryItems.length).toBeGreaterThan(0)

        await expect(inventoryPage.shoppingCartBadge).toBeDisplayed()

        await inventoryPage.openCartPage()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        const actualItemName = cartPage.getFirstItemName()
        await expect(actualItemName).toEqual(expectedItemName)

    })

    it('footer links', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        //twitter
        const initialHandle = await browser.getWindowHandle()
        await footerPage.clickTwitter()

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
        await footerPage.clickFacebook()

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
        await footerPage.clickLinkedIn()

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