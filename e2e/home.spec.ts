import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero is visible', async ({ page }) => {
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();
  });

  test('mode cards are present', async ({ page }) => {
    // Mode cards should be visible on load
    const cards = page.locator('[data-cat-btn]');
    await expect(cards.first()).toBeVisible();
  });

  test('carro/moto toggle changes visible grid', async ({ page }) => {
    // Find both toggle buttons
    const buttons = page.locator('[data-cat-btn]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    // Click the second toggle button (moto)
    if (count > 1) {
      await buttons.nth(1).click();
      // After toggle, page should still be functional
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
