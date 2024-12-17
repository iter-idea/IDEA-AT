import { expect, Locator, Page } from '@playwright/test';

/**
 * Gets an ion-input element by its test ID
 * @param page - The Playwright Page object
 * @param testId - The test ID value to search for
 * @param testIdAttribute - The attribute name used for test IDs (defaults to 'testId')
 * @returns Locator for the input element inside the ion-input
 */
export const getIonInputByTestId = (page: Page, testId: string, testIdAttribute = 'testId'): Locator =>
  page.locator(`ion-input[${testIdAttribute}="${testId}"] input`);

/**
 * Gets an ion-button element that contains an ion-icon with the specified icon name
 * @param page - The Playwright Page object
 * @param icon - The icon name to search for (matches either icon or name attribute)
 * @returns Locator for the ion-button element containing the specified icon
 */
export const getIonButtonByIcon = (page: Page, icon: string): Locator =>
  page.locator(`ion-button:has(ion-icon[icon="${icon}"], ion-icon[name="${icon}"])`);

/**
 * Gets the input element within an ion-searchbar component
 * @param page - The Playwright Page object
 * @returns Locator for the input element inside the ion-searchbar
 */
export const getIonSearchbarInput = (page: Page): Locator => page.locator(`ion-searchbar input`);

/**
 * Gets the count of ion-item elements within an ion-list
 * @param page - The Playwright Page object
 * @param timeout - Maximum time in ms to wait for items to appear (defaults to 10000)
 * @returns Promise that resolves to the number of ion-items found
 */
export const getItemCountInIonList = async (page: Page, timeout = 10000): Promise<number> => {
  await page.waitForSelector('ion-list ion-item', { timeout });
  return await page.$$eval('ion-list ion-item', items => items.length);
};

/**
 * Selects an ion-item element in an ion-list by matching its text content
 * @param page - The Playwright Page object
 * @param text - The text content to search for within the ion-item
 * @param timeout - Maximum time in ms to wait for items to appear (defaults to 10000)
 * @returns Promise that resolves when the item is clicked
 */
export const selectItemInListByText = async (page: Page, text: string, timeout = 10000): Promise<void> => {
  await page.waitForSelector('ion-list ion-item', { timeout });
  await page.click(`ion-list ion-item >> text=${text}`);
};

/**
 * Clicks on an ion-select element and selects an option by its text content
 * @param page - The Playwright Page object
 * @param input - Locator for the ion-select element to click
 * @param text - The text content of the option to select
 * @returns Promise that resolves when the option is selected
 */
export const clickOnIonSelectByText = async (page: Page, input: Locator, text: string): Promise<void> => {
  await input.click();
  await page.waitForSelector('ion-select-popover', { state: 'visible' });
  await page.click(`ion-select-popover ion-item >> text=${text}`);
};

/**
 * Clicks on a button within an ion-alert dialog by matching its text content
 * @param page - The Playwright Page object
 * @param text - The text content of the button to click
 * @returns Promise that resolves when the button is clicked
 */
export const clickOnIonAlertButtonByText = async (page: Page, text: string): Promise<void> => {
  const alertButton = page.locator('.alert-button-group').locator(`text=${text}`);
  await expect(alertButton).toBeVisible();
  await alertButton.click();
};

/**
 * Checks for the presence and subsequent hiding of a loading spinner element
 * @param page - The Playwright Page object
 * @param timeout - Maximum time in ms to wait for spinner to hide (defaults to 29000)
 * @returns Promise that resolves when spinner is hidden
 */
export const checkLoadingSpinner = async (page: Page, timeout = 29000): Promise<void> => {
  const loadingSpinner = page.locator('.loading-spinner');
  await expect(loadingSpinner).toBeVisible();
  await expect(loadingSpinner).toBeHidden({ timeout });
};

/**
 * Checks for the presence of a success toast message on the page
 * @param page - The Playwright Page object
 * @returns Promise that resolves when success toast is visible
 */
export const expectSuccessMessage = async (page: Page): Promise<void> => {
  const successToast = page.locator(`ion-toast[color="success"]`);
  await expect(successToast).toBeVisible();
};

/**
 * Checks that no error toast message is visible on the page
 * @param page - The Playwright Page object
 * @param timeout - Maximum time in ms to wait for error toast (defaults to 1000);
 * must be small, to avoid the message to disappear normally
 * @returns Promise that resolves if no error toast is found
 */
export const failIfErrorMessage = async (page: Page, timeout = 1000): Promise<void> => {
  const errorToast = page.locator(`ion-toast[color="danger"]`);
  await expect(errorToast).toBeHidden({ timeout });
};
