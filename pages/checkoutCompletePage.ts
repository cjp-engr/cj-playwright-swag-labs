import { expect, Locator, Page } from '@playwright/test';
export class CheckoutCompletePage {
    readonly page: Page;
    readonly labelThankYouHeader: Locator;

    constructor (page: Page){
        this.page = page;
        this.labelThankYouHeader = page.locator('[data-test="complete-header"]', { hasText: 'Thank you for your order!' });
    }

    async verifySuccessCheckoutOrder() {
        expect(await this.labelThankYouHeader.isVisible());
        await expect(this.labelThankYouHeader).toHaveText('Thank you for your order!');
        console.log('Able to order successfully');
    }

}