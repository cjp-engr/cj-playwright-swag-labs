import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    readonly buttonCheckOut: Locator;


    constructor (page: Page){
        this.page = page;
        this.buttonCheckOut = page.locator('#checkout');
    }

    async checkOutItems() {
        await this.buttonCheckOut.click();
    }

}