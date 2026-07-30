# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Playwright/TypeScript UI automation suite testing the [Sauce Demo](https://www.saucedemo.com/) e-commerce app — a full order flow from login through checkout completion.

## Commands

```bash
# One-time setup
npm install
npx playwright install chromium

# Run all tests (dev environment)
ENV=dev npx playwright test --project=chromium

# Run a single test by name
ENV=dev npx playwright test --project=chromium -g "<test name>"

# Run by tag
ENV=dev npx playwright test --project=chromium --grep @ui_order_flow

# View HTML report after a run
npx playwright show-report
```

## Environment configuration

`env/.env.<name>` at the repo root is selected by `ENV=<name>` before running. The only environment currently configured is `dev` (`env/.env.dev`). Variables used:

- `URL` — base URL (e.g. `https://www.saucedemo.com/`)
- `USER_NAME` / `PASSWORD` — credentials for form login

## Architecture

### Test fixtures (`test-fixtures/base-fixture.ts`)

All spec files import `test` and `expect` from `test-fixtures/base-fixture.ts`, **not** from `@playwright/test` directly. The fixture auto-wires every page object and handles setup side-effects:

- `landingPage` fixture navigates to `process.env.URL` before the test body runs.
- `loginPage` fixture fills and submits credentials from `USER_NAME`/`PASSWORD` before the test body runs.

Spec files declare which fixtures they need in their argument list; the fixture layer handles ordering and initialization automatically.

### Page Objects (`pages/*.ts`)

One class per app screen. Locators are defined as `readonly` properties in the constructor and reused across methods. Pages use a mix of `getByRole`/`getByPlaceholder`/`getByLabel` and `data-test` attribute selectors; avoid bare CSS class or XPath selectors.

| File | Screen |
|---|---|
| `landingPage.ts` | Entry point — navigates to URL |
| `loginPage.ts` | Login form |
| `productsListPage.ts` | Inventory list; random item selection, add-to-cart, cart badge |
| `productPage.ts` | Single product detail page |
| `cartPage.ts` | Shopping cart |
| `checkoutStepOnePage.ts` | Checkout info form (first name, last name, zip) |
| `checkoutStepTwoPage.ts` | Order summary; price calculation assertion |
| `checkoutCompletePage.ts` | Order confirmation |

### Utilities (`utility/random-data.ts`)

`productNames` — static array of all six Sauce Demo products, used by `ProductsListPage` and `ProductPage` to pick a random item by index.

### Tests (`tests/e2e_test/ui_tests/ui-order-flow.spec.ts`)

Three tagged tests covering the order flow:

| Tag | What it tests |
|---|---|
| `@ui_shopping_cart_badge` | Cart badge count matches items added |
| `@ui_checkout_total_amount` | Checkout total = subtotal + tax |
| `@ui_order_successful` | Full flow ends on "Thank you for your order!" |

All tests call `test.setTimeout(0)` to disable Playwright's default timeout. `api_tests/` is an empty placeholder directory.
