import { test, expect } from '@playwright/test';


test('API 1: Get All Books List', async ({ request }) => {
    const resp = await request.fetch('https://fakerestapi.azurewebsites.net/api/v1/Books', {
        method: 'GET',
    });
    console.log(resp.statusText());
    console.log(resp.status());
    expect(resp.status()).toBe(200);
    expect(resp.ok()).toBeTruthy();

})