import { expect, Page } from '@playwright/test';

/**
 * Navigates to a specified URL and verifies the navigation
 * @param page - The Playwright Page object
 * @param url - The URL to navigate to
 * @returns Promise that resolves when navigation is complete and verified
 */
export const goToPage = async (page: Page, url: string): Promise<void> => {
  await page.goto(url);
  await page.waitForURL(url);
  expect(page.url()).toBe(url);
};

/**
 * Mocks an API JSON response for a specific route
 * @param page - The Playwright Page object
 * @param path - The API path/route to mock
 * @param status - The HTTP status code to return
 * @param data - The response data to return (object or array)
 * @returns Promise that resolves when the mock is set up
 */
export const mockJSONResponse = async (page: Page, path: string, status: number, data: any | any[]): Promise<void> =>
  await page.route(path, async route =>
    route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) })
  );

/**
 * Enum representing common HTTP API status codes
 */
export enum ApiStatus {
  SUCCESS = 200
}
