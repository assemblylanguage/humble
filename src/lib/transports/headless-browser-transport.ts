/**
 * This file contains the source code for fetching resources using a headless
 * browser.
 */

import { Browser, Page, HTTPResponse } from 'puppeteer-core';
import { ResourceResponse } from '../resource';

export async function fetchHeadlessBrowserResource(
  browser: Browser,
  absoluteUrl: string,
) : Promise<ResourceResponse> {
  const page: Page = await browser.newPage();
  const response: HTTPResponse = await page.goto(absoluteUrl, {
    waitUntil: 'networkidle0',
  });

  const bytes: Buffer = await response.buffer();
  const statusCode: number = await response.status();
  const status: boolean = statusCode >= 200 && statusCode < 300;

  return {
    bytes,
    status,
    statusCode,
  };
}
