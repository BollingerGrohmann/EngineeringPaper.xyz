import { expect } from '@playwright/test';
import fetch from 'node-fetch';

const apiUrl = process.env.API_URL ? process.env.API_URL : "https://engineeringpaper.herokuapp.com";

const numBrowsers = 3;

export default async function cleanup() {
  // delete test sheets that have been placed into the database
  let responseObject;
  const response = await fetch(`${apiUrl}/delete_test_sheets`, { method: "PUT" });

  // if (response.ok) {
  //   responseObject = await response.json();
  // } else {
  //   throw new Error(`Unexpected response status ${response.status} when attempting to delete sheets`);
  // }

  // await expect(responseObject.numRowsDeleted).toBe(2 * numBrowsers);
}