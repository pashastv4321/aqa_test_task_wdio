import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'


describe('Login', () => {
    beforeEach(async () => {
        await loginPage.open()
    })
    it('login with valid credentials', async () => {
        
        const typeAttribute = await loginPage.getPasswordInputType()
        await expect(typeAttribute).toEqual('password')

        await loginPage.fillUsername('standard_user')
        await expect(loginPage.inputUsername).toHaveValue('standard_user')

        await loginPage.fillPassword('secret_sauce')
        await expect(loginPage.inputPassword).toHaveValue('secret_sauce')

        await loginPage.clickSubmit()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        const inventoryItems = await inventoryPage.itemsInventory
        await expect(inventoryItems.length).toBeGreaterThan(0)

        await expect(inventoryPage.shoppingCartBadge).toBeDisplayed()
    })

    it('login with invalid password', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        const typeAttribute = await loginPage.inputPassword.getAttribute('type')
        await expect(typeAttribute).toEqual('password')

        await loginPage.fillUsername('standard_user')
        await expect(loginPage.inputUsername).toHaveValue('standard_user')

        await loginPage.fillPassword('incorrect_password')
        await expect(loginPage.inputPassword).toHaveValue('incorrect_password')

        await loginPage.clickSubmit()
        await expect(loginPage.inputUsername).toHaveElementClass('error')
        await expect(loginPage.usernameX).toBeDisplayed()
        await expect(loginPage.inputPassword).toHaveElementClass('error')
        await expect(loginPage.passwordX).toBeDisplayed()
        await expect(loginPage.errorMessageContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })

    it('login with invalid login', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        const typeAttribute = await loginPage.inputPassword.getAttribute('type')
        await expect(typeAttribute).toEqual('password')

        await loginPage.fillUsername('invalid_username')
        await expect(loginPage.inputUsername).toHaveValue('invalid_username')

        await loginPage.fillPassword('secret_sauce')
        await expect(loginPage.inputPassword).toHaveValue('secret_sauce')

        await loginPage.clickSubmit()
        await expect(loginPage.inputUsername).toHaveElementClass('error')
        await expect(loginPage.usernameX).toBeDisplayed()
        await expect(loginPage.inputPassword).toHaveElementClass('error')
        await expect(loginPage.passwordX).toBeDisplayed()
        await expect(loginPage.errorMessageContainer).toHaveText('Epic sadface: Username and password do not match any user in this service')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })

    it('logout', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

        await inventoryPage.clickBurgerBtn()
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4)
        await expect(inventoryPage.btnLogout).toBeClickable()
        await inventoryPage.clickLogout()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')
    })
})
