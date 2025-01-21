import { expect, Locator, Page } from '@playwright/test';

/**
 * Clicks on an IDEA select element and selects an option by text
 * @param page - The Playwright Page object
 * @param input - The input Locator to click on
 * @param text - The text of the option to select
 */
export const clickOnIDEASelectByText = async (page: Page, input: Locator, text: string): Promise<void> => {
  await input.click();
  await page.waitForSelector('idea-suggestions', { state: 'visible' });
  await page.click(`idea-suggestions ion-item >> text=${text}`);
};

/**
 * Clicks on an input element to open an IDEA action sheet, waits for it to be visible,
 * then selects an option by its text
 * @param page - The Playwright Page object
 * @param input - The input Locator to click on
 * @param text - The text of the option to select
 */
export const selectOptionOnIDEAActionSheet = async (page: Page, input: Locator, text: string): Promise<void> => {
  await input.click();
  await page.waitForSelector('idea-action-sheet', { state: 'visible' });
  await page.click(`idea-action-sheet ion-button >> text=${text}`);
};

/**
 * Clicks on an IDEA checker element, waits for the modal to be visible,
 * then toggles multiple checkboxes by their text labels and clicks the confirm button
 * @param page - The Playwright Page object
 * @param input - The input Locator to click on
 * @param checks - Array of checkbox text labels to toggle
 */
export const toggleChecksOnIDEACheckerByText = async (page: Page, input: Locator, checks: string[]): Promise<void> => {
  await input.click();
  await page.waitForSelector('ion-modal', { state: 'visible' });
  for (const check of checks) await page.click(`ion-modal ion-content ion-item >> text=${check}`);
  await page.click('ion-modal ion-header ion-buttons[slot="end"] > ion-button');
};

/**
 * Clicks on an IDEA inline checker element and selects multiple options by text
 * @param page - The Playwright Page object
 * @param input - The input Locator to click on
 * @param optionsByText - Array of option text strings to select
 */
export const clickOnInlineCheckerByText = async (
  page: Page,
  input: Locator,
  optionsByText: string[]
): Promise<void> => {
  await input.click();
  await page.waitForSelector('idea-inline-checker', { state: 'visible' });
  for (const text of optionsByText) await page.click(`ion-popover ion-item >> text=${text}`);
  const backdrop = page.locator('ion-backdrop');
  await expect(backdrop).toBeVisible();
  await backdrop.click();
};
