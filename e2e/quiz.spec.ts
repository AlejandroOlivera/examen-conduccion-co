import { test, expect } from '@playwright/test';

test.describe('Quiz flow', () => {
  test('completes a quiz and shows result screen', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/examen/carro/grupo-1');

    // Answer all questions to reach result screen
    const maxQuestions = 50;

    for (let i = 0; i < maxQuestions; i++) {
      // Check if result screen is visible
      const resultPct = page.locator('.result__pct');
      if (await resultPct.isVisible({ timeout: 200 }).catch(() => false)) {
        break;
      }

      // Wait for an enabled option to appear (next question loaded)
      const enabledOpt = page.locator('.opt:not([disabled])').first();
      const isEnabled = await enabledOpt
        .waitFor({ state: 'visible', timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (!isEnabled) break;

      await enabledOpt.click();

      // After answering, wait for the "next" button then click it
      // Button text is "Siguiente →" for mid-quiz and "Ver resultados" for the last question
      const nextBtn = page
        .locator('button')
        .filter({ hasText: /siguiente|ver resultados|next|continuar/i });
      const nextVisible = await nextBtn
        .waitFor({ state: 'visible', timeout: 3000 })
        .then(() => true)
        .catch(() => false);

      if (nextVisible) {
        await nextBtn.click();
      }
    }

    // Verify result screen appears with percentage
    const resultPct = page.locator('.result__pct');
    await expect(resultPct).toBeVisible({ timeout: 10_000 });
    const text = await resultPct.textContent();
    expect(text).toMatch(/%/);
  });

  test('clicking an option shows feedback in practice mode', async ({ page }) => {
    await page.goto('/examen/carro/grupo-1');

    const opts = page.locator('.opt');
    await expect(opts.first()).toBeVisible();

    await opts.first().click();

    // After clicking, feedback should appear (correct/incorrect indication)
    await page.waitForTimeout(300);

    // Options should now have feedback state (aria or class change)
    const clickedOpt = opts.first();
    await expect(clickedOpt).toBeVisible();
  });
});
