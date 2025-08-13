import { isSortedAscending, isSortedDescending } from '../../helpers/sorting.helpers.js'
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'



describe('Sorting', () => {

    beforeEach(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    })

    it('should sort products correctly by Name and Price', async () => {
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
        
        await inventoryPage.selectSortOption('Name (A to Z)')
        const namesAsc = await inventoryPage.getAllItemNames()
        await expect(isSortedAscending(namesAsc)).toBe(true)

        await inventoryPage.selectSortOption('Name (Z to A)')
        const namesDesc = await inventoryPage.getAllItemNames()
        await expect(isSortedDescending(namesDesc)).toBe(true)

        await inventoryPage.selectSortOption('Price (low to high)')
        const pricesAsc = await inventoryPage.getAllItemPrices()
        await expect(isSortedAscending(pricesAsc)).toBe(true)

        await inventoryPage.selectSortOption('Price (high to low)');
        const pricesDesc = await inventoryPage.getAllItemPrices()
        await expect(isSortedDescending(pricesDesc)).toBe(true)
    })
})