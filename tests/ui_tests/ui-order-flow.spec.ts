import { test, expect } from '../../test-fixtures/base-fixture';
import { LoginPage } from '../../pages/loginPage';

test('Verify the displayed number of products in the shopping cart badge', 
  {tag:["@ui_shopping_cart_badge", "@ui_order_flow"]}, async ({ 
  landingPage, loginPage, productsListPage}, testInfo) => {
  test.setTimeout(0);
  await productsListPage.addToCartMultipleItems();
});

test('Verify checkout total amount', 
  {tag:["@ui_checkout_total_amount", "@ui_order_flow"]}, async ({ 
  landingPage, loginPage, productsListPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, }, testInfo) => {
  test.setTimeout(0);
  await productsListPage.navigateToItemPage();
  await productPage.addToCartItem();
  await productPage.backToProducts();
  await productPage.navigateToCartPage();
  await cartPage.checkOutItems();
  await checkoutStepOnePage.continueCheckout();
  await checkoutStepTwoPage.verifyTotalPrice();
});

test('Verify if order is successful after checkout',
    {tag:["@ui_order_successful", "@ui_order_flow"]}, async ({ 
    landingPage, loginPage, productsListPage, productPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }, testInfo) => {
    test.setTimeout(0);
    await productsListPage.navigateToItemPage();
    await productPage.addToCartItem();
    await productPage.backToProducts();
    await productPage.navigateToCartPage();
    await cartPage.checkOutItems();
    await checkoutStepOnePage.continueCheckout();
    await checkoutStepTwoPage.finishCheckout();
    await checkoutCompletePage.verifySuccessCheckoutOrder();
  });

test.describe('Unhappy path - login', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Verify error message when locked out user attempts to log in',
    {tag: ["@ui_locked_out_user", "@ui_login"]}, async ({ page }) => {
    test.setTimeout(0);
    await page.goto(process.env.URL!);
    const loginPage = new LoginPage(page);
    await loginPage.attemptLogin('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});