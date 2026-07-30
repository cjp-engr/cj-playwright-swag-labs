import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: `./env/.env.${process.env.ENV ?? 'dev'}` });

async function globalSetup(config: FullConfig) {
    fs.mkdirSync('auth', { recursive: true });

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(process.env.URL!);
    await page.getByPlaceholder('Username').fill(process.env.USER_NAME!);
    await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
    await page.locator('#login-button').click();
    await page.waitForURL('**/inventory.html');

    await page.context().storageState({ path: 'auth/user.json' });
    await browser.close();
}

export default globalSetup;
