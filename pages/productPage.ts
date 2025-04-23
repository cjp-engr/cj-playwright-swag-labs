import { expect, Locator, Page } from '@playwright/test';
import { productNames } from '../utility/random-data';

export class ProductPage {
    readonly page: Page;

    readonly labelProductName: (productName: string) => Locator;
    readonly buttonAddToCart: Locator;
    readonly buttonBackToProducts: Locator;
    readonly buttonCartIcon: Locator;

    readonly productBackPack: Locator;

    constructor (page: Page){
        this.page = page;
        this.labelProductName = (productName: string) => page.locator('[data-test="inventory-item-name"]', { hasText: `${productName}` });
        this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart' });
        this.buttonBackToProducts = page.locator('#back-to-products');
        this.buttonCartIcon = page.locator('[data-test="shopping-cart-link"]');
    }

    async backToProducts(){
        expect(await this.buttonBackToProducts.isVisible());
        await this.buttonBackToProducts.click();
    }

    async addToCartItem() {
        await this.buttonAddToCart.click();
    }

    async navigateToCartPage(){
        await this.buttonCartIcon.click();
    }
}