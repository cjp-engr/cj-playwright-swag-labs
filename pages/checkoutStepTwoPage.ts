import { expect, Locator, Page } from '@playwright/test';
export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly buttonFinish: Locator;
    readonly textSubTotal: Locator;
    readonly textTax: Locator;
    readonly textTotalPayment: Locator;

    constructor (page: Page){
        this.page = page;
        this.buttonFinish = page.locator('#finish');
        this.textSubTotal = page.locator('[data-test="subtotal-label"]');
        this.textTax = page.locator('[data-test="tax-label"]');
        this.textTotalPayment = page.locator('[data-test="total-label"]');
    }

    async finishCheckout() {
        await this.buttonFinish.click();
    }

    async verifyTotalPrice() {
        const subTotal = await this.textSubTotal.innerText();
        const tax = await this.textTax.innerText();
        const totalAmount = (Number(subTotal.split("$")[1]) + Number(tax.split("$")[1])).toFixed(2);
        await expect(this.textTotalPayment).toHaveText(`Total: \$${totalAmount}`);
        console.log(`The expected total amount is \$${totalAmount}`);
    }
}