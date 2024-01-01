import { test, expect } from '@playwright/test';

test('should navigate to caller game and test for title', async ({ page }) => {
    await page.goto('http://localhost:3000/call');
    const altText = await page.getAttribute('h1 img', 'alt');
    expect(altText).toBe('Climb Assist');
});

// TODO: Add a unit testing frameowrk to this project :(

/*test('should display the call "L" when left hand clicked', async ({ page }) => {
    await page.goto('http://localhost:3000/call');
    await page.click('button:text("L")');
    let callText = await page.textContent('.call'); 
    expect(callText).toContain('L');
});*/

  