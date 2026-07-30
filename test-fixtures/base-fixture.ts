import { test as base, expect } from '@playwright/test';

import { LandingPage } from '../pages/landingPage';
import { LoginPage } from '../pages/loginPage';
import { ProductsListPage } from '../pages/productsListPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutStepOnePage } from '../pages/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';
import { ProductPage } from '../pages/productPage';

type MyFixtures = {
    landingPage: LandingPage;
    loginPage: LoginPage;
    productsListPage: ProductsListPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    checkoutCompletePage: CheckoutCompletePage;
}

export const test = base.extend<MyFixtures>({
    landingPage : async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await landingPage.openURL(`${process.env.URL}inventory.html`);
        await use(landingPage);
    },
    loginPage : async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productsListPage : async ({ page }, use) => {
        const productsListPage = new ProductsListPage(page);
        await use(productsListPage);
    },
    productPage : async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    cartPage : async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkoutStepOnePage : async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await use(checkoutStepOnePage);
    },
    checkoutStepTwoPage : async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await use(checkoutStepTwoPage);
    },
    checkoutCompletePage : async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    },
});

export { expect } from '@playwright/test';