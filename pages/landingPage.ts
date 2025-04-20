import {expect, Locator, Page } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly labelSignInToSwagLabs: Locator;
    constructor (page: Page){
        this.page = page;
        this.labelSignInToSwagLabs = page.getByText('Swag Labs');
    }

    async openURL(url: string){
        await this.page.goto(url);
    }

}