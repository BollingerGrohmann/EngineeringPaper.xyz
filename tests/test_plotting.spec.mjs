import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

import { compareImages, screenshotDir, loadPyodide, newSheet } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('Test plotting', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // make sure first empty cell has Invalid Syntax error
  await page.waitForSelector('button:has-text("This field must contain an assignment (e.g., x=y*z) or a query (e.g., x=). To delete an unwanted math cell, click the trash can on the right.")');

  // test plot without units
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', 'Plot with 2 curves and no units');
  await page.setLatex(0, String.raw`y=x^{2}`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'z=-x');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'y(-1<=x<=1)=');
  await page.locator('#plot-expression-3-0 textarea').press('Enter');
  await page.type(':nth-match(textarea, 4)', 'z(-1<x<1)=');

  // add plot with 1 curve and units
  await page.click('#add-documentation-cell');
  await page.type(':nth-match(p, 2)', 'Plot with 1 curve and units');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(-1\left[inch\right]\le x\le 1\left[inch\right]\right)=\left[inch^{2}\right]`);

  // add expressions with errors to plot cells to test error reporting
  await page.locator('#plot-expression-5-0 textarea').press('Enter');
  await page.locator('#plot-expression-5-1 textarea').type('y(-1<=s<=1)=');
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to finite and real numeric values")');
  for (let i = 0; i < 12; i++) {
    await page.locator('#plot-expression-5-1 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 textarea').type('y(-1<=x<=1)=');
  await page.pause();
  await page.waitForSelector('button:has-text("All x-axis units must be compatible")');
  for (let i = 0; i < 12; i++) {
    await page.locator('#plot-expression-5-1 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 textarea').type('y=');
  await page.waitForSelector('button:has-text("This field must contain a function query with an input parameter range such as y(-10≤x≤10)=")');
  for (let i = 0; i < 2; i++) {
    await page.locator('#plot-expression-5-1 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 textarea').type('y(-s<x<s)=');
  await page.waitForSelector('button:has-text("X-axis limits of plot do not evaluate to a number")');
  for (let i = 0; i < 10; i++) {
    await page.locator('#plot-expression-5-1 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 textarea').type('y(1[inch]<x<1[sec])=');
  await page.waitForSelector('button:has-text("Units of the x-axis upper and lower limits do not match")');
  for (let i = 0; i < 20; i++) {
    await page.locator('#plot-expression-5-1 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 textarea').type('y(-1[inch]<x<1[inch])=[sec]');
  await page.waitForSelector('button:has-text("Units Mismatch")');
  for (let i = 0; i < 29; i++) {
    await page.locator('#plot-expression-5-1 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-5-1 textarea').type('y(-1<x<1, -1<s<1)=');
  await page.waitForSelector('button:has-text("Only one range may be specified for plotting")');
  await page.locator('#delete-row-5-1').click();

  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`s=u\cdot \sec\left(v\right)`);

  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`s\left(v=\frac{pi}{2},0<u<20\right)=`);
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to finite and real numeric values")');
  for (let i = 0; i < 18; i++) {
    await page.locator('#plot-expression-7-0 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-7-0 textarea').type('s(v=p,0<u<20)=');
  await page.waitForSelector('button:has-text("Results of expression does not evaluate to finite and real numeric values")');
  for (let i = 0; i < 14; i++) {
    await page.locator('#plot-expression-7-0 textarea').press('Backspace');
  }

  await page.locator('#plot-expression-7-0 textarea').type('s(v=pi/4');
  await page.locator('#plot-expression-7-0 textarea').press('ArrowRight');
  await page.locator('#plot-expression-7-0 textarea').type(',0<u<20)=');
});


// #72
test('Test plot dims with 0 start of range', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, String.raw`y=1\left[m\right]\cdot x`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y\left(0\le x\le 10\right)=\left[m\right]`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(() => page.locator('button:has-text("Units Mismatch")').waitFor({timeout: 1000 }))
    .rejects.toThrow('Timeout');

});


// #73
test('Test plot two curves with compatible x-range units', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, String.raw`y=x`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y\left(0\left[in\right]\le x\le 10\left[m\right]\right)=\left[m\right]`);
  await page.locator('#add-row-1').click();
  await page.locator('textarea').nth(2).type('y(0[m]<=x<=10[m])=[m]');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await expect(() => page.locator('button:has-text("Units Mismatch")').waitFor({timeout: 1000 }))
                         .rejects.toThrow('Timeout');

});


test('Test plot number of points', async ({ browserName }) => {

  // Change title
  await page.click('text=New Sheet', { clickCount: 3 });
  await page.type('text=New Sheet', 'Title for testing purposes only, will be deleted from database automatically');

  // test plot without units
  await page.setLatex(0, 'y=x');
  await page.click('#add-math-cell');
  await page.setLatex(1, 'z=s^2');
  await page.click('#add-math-cell');
  await page.locator('textarea').nth(2).type('y(0<=x<=1)=');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  let [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const linearImageFile = `${browserName}_screenshot_plot_linear.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, linearImageFile));

  for (let i = 0; i < 40; i++) {
    await page.locator('textarea').nth(2).press('Backspace');
  }
  await page.locator('textarea').nth(2).type('z(0<=s<=1) with 1 points =');
  page.locator('button:has-text("Number of range points must be 2 or greater.")').waitFor({timeout: 1000 })

  for (let i = 0; i < 40; i++) {
    await page.locator('textarea').nth(2).press('Backspace');
  }
  await page.locator('textarea').nth(2).type('z(s=1) with 10 points =');
  page.locator('button:has-text("Invalid syntax, cannot specify number of points for function without range parameter.")').waitFor({timeout: 1000 })

  for (let i = 0; i < 40; i++) {
    await page.locator('textarea').nth(2).press('Backspace');
  }
  await page.locator('textarea').nth(2).type('y(x=z(0<=s<=1)with 10 points)=');
  page.locator('button:has-text("Range may only be specified at top level function.")').waitFor({timeout: 1000 })

  // change first equation to a curve
  await page.setLatex(0, 'y=x^2');

  for (let i = 0; i < 40; i++) {
    await page.locator('textarea').nth(2).press('Backspace');
  }
  await page.locator('textarea').nth(2).type('y(0<=x<=1)=');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const curveImageFile = `${browserName}_screenshot_plot_curve.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, curveImageFile));

  for (let i = 0; i < 40; i++) {
    await page.locator('textarea').nth(2).press('Backspace');
  }
  await page.locator('textarea').nth(2).type('y(0<=x<=1) with 2 points =');

  await page.waitForSelector('.status-footer', { state: 'detached' });
  [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.modebar-btn').first().click()
  ]);
  const twoPointCurveImageFile = `${browserName}_screenshot_plot_2point_curve.png`;
  fs.copyFileSync(await download.path(), path.join(screenshotDir, twoPointCurveImageFile));

  expect(compareImages(linearImageFile, curveImageFile)).toBeGreaterThan(100);
  expect(compareImages(linearImageFile, twoPointCurveImageFile)).toEqual(0);
});


test('Test plot with undefined endpoint', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=\frac{1}{x}`);

  await page.locator('#add-plot-cell').click();
  await page.setLatex(1, String.raw`y\left(0\left[inch\right]\le x\le 10\left[inch\right]\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Results of expression does not evaluate to finite and real numeric values').waitFor({state: 'attached', timeout: 1000});  

  // change lower limit to be open, which should eliminate the error
  await page.setLatex(1, String.raw`y\left(0\left[inch\right]<x\le 10\left[inch\right]\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('svg.error').waitFor({state: "detached", timeout: 1000});

});


test('Test handling of units in exponent with plots and x-axis dimension error', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=x^{1\left[m\right]}`);

  await page.locator('#add-plot-cell').click();
  await page.setLatex(1, String.raw`y\left(0<x\le 10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=Y-axis dimension error: Exponent Not Dimensionless').waitFor({state: 'attached', timeout: 1000});  

  // test x-axis units in exponent error handling
  await page.setLatex(0, String.raw`y=x`);
  await page.setLatex(1, String.raw`y\left(1^{1\left[foot\right]}<x\le 10^{1\left[foot\right]}\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('#plot-expression-1-0 >> text=X-axis upper and/or lower limit dimension error: Exponent Not Dimensionless').waitFor({state: 'attached', timeout: 1000});


  // test x-axis units in exponent error handling
  await page.setLatex(1, String.raw`y\left(1\left[min\right]+1\left[mile\right]<x\le 10\left[min\right]+3\left[mile\right]\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('#plot-expression-1-0 >> text=X-axis upper and/or lower limit dimension error').waitFor({state: 'attached', timeout: 1000});  

});


test('Test error message when trying to plot more than 4 different y-axis units', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y0=x`);

  await page.keyboard.press('Enter');
  await page.setLatex(1, String.raw`y1=x^{2}`);

  await page.keyboard.press('Enter');
  await page.setLatex(2, String.raw`y2=x^{3}`);

  await page.keyboard.press('Enter');
  await page.setLatex(3, String.raw`y3=x^{4}`);

  await page.keyboard.press('Enter');
  await page.setLatex(4, String.raw`y4=x^{5}`);

  await page.locator('#add-plot-cell').click();
  await page.setLatex(5, String.raw`y0\left(-10\left[cm\right]\le x\le 10\left[cm\right]\right)=`, 0);
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y1\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 1);
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y2\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 2);
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y3\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 3);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  // should be no errors at this point
  await page.locator('svg.error').waitFor({state: 'detached', timeout: 1000});  

  // add fifth set of units to trigger error
  await page.keyboard.press('Enter');
  await page.setLatex(5, String.raw`y4\left(-10\left[mm\right]\le x\le 10\left[mm\right]\right)=`, 4);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  await page.locator('#plot-expression-5-4 >> text=Cannot have more than 4 different y-axis units').waitFor({state: 'attached', timeout: 1000});

});


test('Test reversed x-axis limits', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=x`);

  await page.locator('#add-plot-cell').click();
  await page.setLatex(1, String.raw`y\left(10\le x\le -10\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('#plot-expression-1-0 >> text=X-axis upper and lower limits are reversed').waitFor({state: 'attached', timeout: 1000});  

});


test('Test lower limit unit cancellation issue', async ({ browserName }) => {

  await page.setLatex(0, String.raw`y=\left(1-x\right)\cdot 1\left[m\right]`);

  await page.locator('#add-plot-cell').click();
  await page.setLatex(1, String.raw`y\left(1\le x\le 20\right)=`, 0);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('text=y [m]').waitFor({state: 'attached', timeout: 1000});  

});


test('Test copy plot data', async ({ browserName }) => {
  test.skip(browserName !== "firefox", "Copy-paste test is only working with firefox");

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.setLatex(0, 'y1=x');
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`y2=1\left[\frac{1}{inch}\right]\cdot x`);

  await page.locator('#add-plot-cell').click();
  await page.locator('#plot-expression-2-0 textarea').type('y1(-10[inch]<=x<=10[inch])with 2 points=');
  await page.locator('#add-row-2').click();
  await page.locator('#plot-expression-2-1 textarea').type('y2(10[inch]<=x<=20[inch])with 2 points=');

  await page.waitForSelector('.status-footer', { state: 'detached' });

  await page.locator('text=Copy Data').click();
  await page.locator('text=Copied!').waitFor({state: "attached", timeout: 1000});

  await page.click('text=New Sheet', { clickCount: 3 });
  await page.locator('h1').press(modifierKey+'+v');

  let clipboardContents = await page.locator('h1').textContent();

  clipboardContents = clipboardContents.replace(/\s+/g, ''); // remove whitespace

  expect(clipboardContents).toBe('xy1xy2[inch][m][inch][]-10-0.2541010100.2542020');

});


test('Make sure second curve is plotted if first plot has error', async ({ browserName }) => {
  test.skip(browserName !== "firefox", "Clipboard only works in firefox when headless");

  await page.setLatex(0, String.raw`y=\frac{1}{x}`);

  await page.locator('#add-plot-cell').click();
  await page.setLatex(1, String.raw`y\left(0\le x\le 10\right)=`, 0);


  await page.waitForSelector('.status-footer', { state: 'detached' });

  // should be no data since only curve has error (divide by zero)
  await page.locator('text=Copy Data').click();
  await page.locator('text=No data to copy').waitFor({state: "attached", timeout: 1000});

  // make sure temp text cleared before proceeding
  await page.locator('text=No data to copy').waitFor({state: "detached", timeout: 5000})

  // make a valid second curve
  await page.locator('#add-row-1').click();
  await page.setLatex(1, String.raw`y\left(1\le x\le 10\right)=`, 1);

  await page.waitForSelector('.status-footer', { state: 'detached'});

  //await page.pause();

  // should now be data to copy
  await page.locator('text=Copy Data').click();
  await page.locator('text=Copied!').waitFor({state: "attached", timeout: 1000});

});