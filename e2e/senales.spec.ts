import { test, expect } from '@playwright/test';

test.describe('Senales de transito (grupo-3)', () => {
  test('quiz images appear in grupo-3', async ({ page }) => {
    await page.goto('/examen/carro/grupo-3');

    // Look for a quiz image -- may need to advance through some questions
    let imageFound = false;
    const maxAttempts = 20;

    for (let i = 0; i < maxAttempts; i++) {
      const img = page.locator('img.quiz__image');
      if (await img.isVisible({ timeout: 500 }).catch(() => false)) {
        imageFound = true;
        break;
      }

      // Try to answer and advance using an enabled option
      const enabledOpt = page.locator('.opt:not([disabled])').first();
      if (await enabledOpt.isVisible({ timeout: 500 }).catch(() => false)) {
        await enabledOpt.click();
        await page.waitForTimeout(300);

        const nextBtn = page.locator('button').filter({ hasText: /siguiente|next|continuar/i });
        if (await nextBtn.isVisible({ timeout: 500 }).catch(() => false)) {
          await nextBtn.click();
          await page.waitForTimeout(300);
        }
      }
    }

    expect(imageFound).toBe(true);
  });
});
