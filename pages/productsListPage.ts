import { expect, Locator, Page } from '@playwright/test';
import { productNames } from '../utility/random-data';

export class ProductsListPage {
    readonly page: Page;

    readonly labelProductName: (productName: string) => Locator;
    readonly buttonAddToCart: Locator;
    readonly buttonBackToProducts: Locator;
    readonly buttonCartIcon: Locator;
    readonly cartBadge: Locator;

    constructor (page: Page){
        this.page = page;
        this.labelProductName = (productName: string) => page.locator('[data-test="inventory-item-name"]', { hasText: `${productName}` });
        this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart' });
        this.buttonBackToProducts = page.locator('#back-to-products');
        this.buttonCartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async navigateToItemPage(){
        const itemNumber = Math.floor(Math.random() * productNames.length);
        await this.labelProductName(productNames[itemNumber]).click();
        console.log(`${productNames[itemNumber]} was selected`);
    }

    async addToCartMultipleItems() {
        const itemNumber = Math.floor(Math.random() * 3);
        for (let index = 0; index < itemNumber; index++) {
            await this.buttonAddToCart.nth(index).click();
        }

        if(itemNumber == 0){
            await expect(this.cartBadge).toBeHidden();
            console.log('No products added to the cart hence the badge is not visible');
        }else{
            await expect(this.cartBadge).toHaveText(itemNumber.toString());
            console.log(`${itemNumber.toString()} product/s added to the cart`);
        }
    }

    async navigateToCartPage(){
        await this.buttonCartIcon.click();
    }
}