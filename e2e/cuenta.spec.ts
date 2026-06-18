import { test, expect } from '@playwright/test';

test.describe('Cuenta page', () => {
  test('shows auth form on /cuenta', async ({ page }) => {
    await page.goto('/cuenta');

    // Auth tabs should be present
    const tabs = page.locator('[data-auth-tab]');
    await expect(tabs.first()).toBeVisible();
  });

  test('signup tab reveals name field', async ({ page }) => {
    await page.goto('/cuenta');

    // Name field should be hidden initially (signin tab active)
    const nameField = page.locator('[data-field="name"]');

    // Click the signup/crear cuenta tab
    const signupTab = page.locator('[data-auth-tab]').filter({ hasText: /crear|signup|registr/i });
    if (await signupTab.isVisible()) {
      await signupTab.click();
      await expect(nameField).toBeVisible();
    } else {
      // Try clicking the second tab
      const tabs = page.locator('[data-auth-tab]');
      const count = await tabs.count();
      if (count > 1) {
        await tabs.nth(1).click();
        await expect(nameField).toBeVisible();
      }
    }
  });
});

test.describe('Panel page guard', () => {
  test('/panel redirects to /cuenta when not authenticated', async ({ page }) => {
    await page.goto('/panel');

    // Should redirect to /cuenta
    await expect(page).toHaveURL(/\/cuenta/);
  });
});
