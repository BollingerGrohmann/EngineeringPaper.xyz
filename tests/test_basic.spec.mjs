import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test basic functionality', async () => {
  // Test basic dimensional analysis and unit conversion
  await page.type(':nth-match(textarea, 1)', 'x=3[inch]');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=4[inch]');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'length=\\sqrt x^2');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '+y^2');
  // test using enter key for adding math cell
  await page.press(':nth-match(textarea, 3)', 'Enter');

  await page.type(':nth-match(textarea, 4)', 'length=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(5, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('inch')

  // test removal of units for query statement to make sure updates happen
  for(let i = 0; i<6; i++) {
    await page.press(':nth-match(textarea, 4)', 'Backspace');
  }
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(0.127, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('m')

  // delete all cells and test moving cells
  for(let i=0; i<4; i++) {
    await page.forceDeleteCell(0);
  }

  for (let i=0; i<4; i++) {
    await page.click('#add-math-cell');
  }

  await page.type(':nth-match(textarea, 1)', '1[mm] = [m]' );
  await page.type(':nth-match(textarea, 2)', '2[mm] = [mm]' );
  await page.type(':nth-match(textarea, 3)', '3[mm] = [cm]' );
  await page.type(':nth-match(textarea, 4)', '4[mm] = [dm]' );
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-3');
  expect(content).toBe('dm');

  await page.click('#up-2');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.001, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-3')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.click('#down-0');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.001, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-3')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  // test deleting cells at middle, beginning, and end
  await page.forceDeleteCell(1);
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(0.3, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-2')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.forceDeleteCell(0);
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0')
  expect(parseFloat(content)).toBeCloseTo(2, precision)
  content = await page.textContent('#result-value-1')
  expect(parseFloat(content)).toBeCloseTo(0.04, precision)

  await page.forceDeleteCell(1);
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  await page.forceDeleteCell(0);

  // test exponents
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '2[mm]^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '+2[mm]^(1+3)^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 1)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(8.0e-6, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m^2')

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '2^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '+2^1+3^1/2');
  for (let i = 0; i<3; i++) {
    await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  }
  await page.press(':nth-match(textarea, 2)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(10.643994170967826, precision);

  await page.click("#add-math-cell");
  await page.type(':nth-match(textarea, 3)', '3^3^3');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(7625597484987, 13);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);


  // test order of operations
  await page.click("#add-math-cell");
  await page.type(':nth-match(textarea, 1)', '36^1/2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '/2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '*(1+2)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(9, precision);

  await page.forceDeleteCell(0);

  // test incompatible units
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[meter] + 2[sec]=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Dimension Error');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '/0.010[m]*2[mm]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '5[sec]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '+/(1[inches]/25.4');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', ')*12[mm]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '6[sec]');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(6e-6, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2*sec^-1');

  await page.type(':nth-match(textarea, 2)', '[mm^2');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '/sec');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', ']');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  await page.press(':nth-match(textarea, 2)', 'ArrowLeft');
  await page.press(':nth-match(textarea, 2)', 'ArrowLeft');
  for(let i=0; i<3; i++){
    await page.press(':nth-match(textarea, 2)', 'Backspace');
  }
  await page.type(':nth-match(textarea, 2)', 'gallon');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-1');
  expect(content).toBe('Units Mismatch');

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // duplicate assignment detection
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=1')
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=2');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('div.bx--inline-loading__text');
  expect(content).toBe('Error: Duplicate assignment of variable x');

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // circular reference detection
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=y')
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=z')
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'z=x')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('div.bx--inline-loading__text');
  expect(content).toBe('Error: Circular reference detected');

  for(let i=0; i<3; i++){
    await page.forceDeleteCell(0);
  }

  // test topological sorting 
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=/-b+\\sqrt b^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '-4*a*c');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '2*a');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=[m]');
  // output is tall so button may move if clicked before update is completed
  // this leads to occasional test failures
  await page.waitForSelector('text=Updating...', {state: 'detached'}); 
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'a=1');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'b=-5[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'c=6[m*m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(3, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m')

  for(let i=0; i<5; i++) {
    await page.forceDeleteCell(0);
  }

  // test pi and Euler's number
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'pi=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(3.14159265358979323846264338328, 14);

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'e=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(2.71828182845904523536028747135, 14);

  // The variable name E needs to be remapped internally since E is Euler's number in Sympy
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'E=10');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'E=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(10, precision);

  // make sure e, pi, and i cannot be reassigned (should result in syntax error)
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'e=20');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'pi=30');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 7)', 'i=30');
  expect(await page.$eval(':nth-match(.mq-editable-field, 5)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 6)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 7)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  
  for (let i=0; i<7; i++) {
    await page.forceDeleteCell(0);
  }
      
  // test logarithmic functions
  // first check that paranthesis are required for functions
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '\\ln 20=');
  expect(await page.$eval(':nth-match(.mq-editable-field, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();
  await page.forceDeleteCell(0);

  // now check natural logarithm
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '\\ln(e^2.1');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', ')=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(2.1, precision);

  // make sure that providing inits to input argument to ln results in dimension error
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '\\ln(5[inches])=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-1');
  expect(content).toBe('Dimension Error');

  // check base 10 log
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', '\\log(100)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  // check log with specified base
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', '\\log_2');
  await page.press(':nth-match(textarea, 4)', 'ArrowRight');
  await page.type(':nth-match(textarea, 4)', '(8)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  // make sure log base is unitless
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', '\\log_2[inches]');
  await page.press(':nth-match(textarea, 5)', 'ArrowRight');
  await page.type(':nth-match(textarea, 5)', '(8)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-4');
  expect(content).toBe('Dimension Error');

  // check log without slash
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'log(1000)=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  // stress test automatic back slash insertion
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`-1\cdot cos\left(arctan\left(1\right)\cdot 4\right)+\frac{ln\left(e^{log\left(100\right)}\right)^{log\left(100\right)}}{ln\left(e^{2}\right)}=`);
  await page.keyboard.press('Escape'); // force backslash insertion
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-6');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  for (let i=0; i<7; i++) {
    await page.forceDeleteCell(0);
  }

  // test scientific notation
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '10e-1[m]+1.E+16*x-1e17[m]=[mm]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=1.0e1[m]')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1000, precision);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // don't attempt unit conversion on result that is not finite
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[m]/0');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Units Mismatch');

  await page.forceDeleteCell(0);

  // test abs
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '|-12[inches]|=[feet]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  await page.forceDeleteCell(0);

  // test negative exponent for units
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[mm^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.type(':nth-match(textarea, 1)', ']=[inch^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(645.16, precision);

  await page.forceDeleteCell(0);

  // test units with 1 in the numerator
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[mm^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.type(':nth-match(textarea, 1)', ']=[inch^-2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(645.16, precision);

  await page.forceDeleteCell(0);

  // test inverse dimension
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[1/sec');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight')
  await page.type(':nth-match(textarea, 1)', ']=')
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-0');
  expect(content).toBe('Hz')

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', '1[1/sec');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', ']=[min^-1');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.press(':nth-match(textarea, 2)', ']');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(60, precision);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // test divide by zero with substitution (related to sympy issue #21076)
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1[meter]/0[foot]');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.press(':nth-match(textarea, 1)', '=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(content).toBe('\\tilde{\\infty}');

  await page.forceDeleteCell(0);

  // check numerical precision
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '.1+.2-.3=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(content).toBe('0');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=.1[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'y=.2[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'z=.3[m]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', 'x+y-z=[m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-4');
  expect(content).toBe('0');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 's=.1[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 7)', 't=.2[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 8)', 'u=.3[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 9)', 's+t-u=[inch]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-8');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-8');
  expect(content).toBe('inch');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 10)', 'xx=1[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 11)', 'yy=2[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 12)', 'zz=1e-200[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 13)', 'w-yy=[inch]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 14)', 'w=zz+2*xx');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-12');
  expect(content).toBe('1e-200');

  for(let i=0; i<14; i++){
    await page.forceDeleteCell(0);
  }

  // test unitless result bug when attempting user unit conversion
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'x=10[inches]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'y=2');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'x/y');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '=[inches]');
  await page.type(':nth-match(textarea, 2)', '[m]');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-units-2');
  expect(content).toBe('Units Mismatch')

  for(let i=0; i<3; i++){
    await page.forceDeleteCell(0);
  }

  // test units in exponents
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`10\left[inches\right]^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}=\left[inches^2\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`10\left[inches\right]^{\left(1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]\right)^{2\left[\frac{kelvin}{sec}\right]\cdot 1\left[\frac{sec}{kelvin}\right]}}=\left[inches^4\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`10^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}=`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`2^{3\left[sec\right]}=`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`2^{3^{1\left[m\right]}}=`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`10\left[miles\right]^{.2\left[\frac{cm}{mm}\right]}=\left[miles^2\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(6, String.raw`10\left[miles\right]^{.2\left[\frac{cm}{sec}\right]}=\left[miles^2\right]`);  
  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`x=10^{1\left[\frac{m}{sec}\right]\cdot 2\left[\frac{sec}{m}\right]}`);  
  await page.click('#add-math-cell');
  await page.setLatex(8, String.raw`x=`);
  await page.click('#add-math-cell');
  await page.setLatex(9, String.raw`y=2^{3^{1\left[m\right]}}`);  
  await page.click('#add-math-cell');
  await page.setLatex(10, String.raw`y=`);
  await page.click('#add-math-cell');
  await page.setLatex(11, String.raw`\left(2^{2\left[\frac{mm}{mm}\right]+2}\right)^{\frac{1\left[mm\right]}{4\left[mm\right]}+\frac{1}{4}}=`);
  await page.click('#add-math-cell');
  await page.setLatex(12, String.raw`4^{1\left[m\right]\cdot 2\left[m\right]^{-1}}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-units-0');
  expect(content).toBe('inches^2')
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-1');
  expect(content).toBe('inches^4')
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(10000, precision);

  content = await page.textContent('#result-units-2');
  expect(content).toBe('')
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-3');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-4');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-5');
  expect(content).toBe('miles^2');
  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-6');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-8');
  expect(content).toBe('')
  content = await page.textContent('#result-value-8');
  expect(parseFloat(content)).toBeCloseTo(100, precision);

  content = await page.textContent('#result-units-10');
  expect(content).toBe('Exponent Not Dimensionless');

  content = await page.textContent('#result-units-11');
  expect(content).toBe('')
  content = await page.textContent('#result-value-11');
  expect(parseFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#result-units-12');
  expect(content).toBe('')
  content = await page.textContent('#result-value-12');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  for (let i=0; i<13; i++) {
    await page.forceDeleteCell(0);
  }

  // make sure that SymPy reserved names get renamed
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', 'Expr=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'symbols=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe('Expr')
  content = await page.textContent('#result-value-1');
  expect(content).toBe('symbols')

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // test virtual keyboard
  await page.click('#add-math-cell');
  await page.click('#add-math-cell');
  await page.click('button:has-text("√x​")');
  await page.type(':nth-match(textarea,2)', 'x');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '=');
  await page.type(':nth-match(textarea, 1)', 'x=');
  await page.click('button:has-text("π​")'); // make sure keyboard has jumped to cell with focus
  await page.click('#add-math-cell');
  await page.click('button.tab:has-text("f(x)")');
  await page.click('button:has-text("cot")');
  await page.click('button.tab:has-text("Math")');
  await page.click('button:has-text("π​")');
  await page.type(':nth-match(textarea, 3)', '/4');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(sqrt(pi), precision);
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(1.0, precision);

  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);
  await page.forceDeleteCell(0);

  // test virtual keyboard with selected text
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea,1)', 'pi');
  await page.press(':nth-match(textarea,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(textarea,1)', 'Shift+ArrowLeft');
  await page.click('button.tab:has-text("f(x)")');
  await page.click('button:has-text("cos")');
  await page.press(':nth-match(textarea,1)', 'ArrowRight');
  await page.press(':nth-match(textarea,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(textarea,1)', 'Shift+ArrowLeft');
  await page.press(':nth-match(textarea,1)', 'Shift+ArrowLeft');
  await page.click('button.tab:has-text("Math")');

  await page.click('button:has-text("/")');
  await page.type(':nth-match(textarea,1)', '2');
  await page.press(':nth-match(textarea,1)', 'ArrowRight');
  await page.type(':nth-match(textarea,1)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(-0.5, precision);
});


test('Test exponents', async () => {

  await page.setLatex(0, String.raw`1\left[m^{\frac{1}{3}}\right]\cdot 1\left[m^{\frac{2}{3}}\right]=`);
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  await page.forceDeleteCell(0);

  // test single digit exponent followed by a digit
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 1)', '1^2');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '2=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  expect(await page.$eval(':nth-match(.mq-editable-field, 1)',
         el => el.classList.contains("parsing-error"))).toBeTruthy();

  await page.forceDeleteCell(0);

  // test negative exponent on number with assigned units
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`\frac{1300\left[N\right]\cdot 80\left[mm\right]\cdot 34\left[mm\right]\cdot \frac{1}{2}}{\frac{16\left[mm\right]\cdot 34\left[mm\right]^{3}}{12}}=\left[MPa\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo((1300*80*34*.5)*(12/(16*34**3)), precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('MPa');

  await page.forceDeleteCell(0);

  // test variable in exponent
  await page.click('#add-math-cell');
  await page.setLatex(0, String.raw`1^{x}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(1.0, precision);
});


test('Test function notation with exponents and units', async () => {

  await page.setLatex(0, String.raw`y\left(x=2\left[inches\right],\ t=3\left[\frac{m}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{m}{s}\right],k=1\left[\frac{s}{m}\right]\right)=\left[inches^{9}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`y=x^{\left(s\cdot t\right)^{j\cdot k}}`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`z=2\cdot y\left(x=2\left[inches\right],\ t=2\left[\frac{m}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{m}{s}\right],k=1\left[\frac{s}{m}\right]\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`z=\left[inches^{4}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`y\left(x=2\left[inches\right],\ t=3\left[\frac{m}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{1}{s}\right],k=1\left[\frac{s}{m}\right]\right)=\left[inches^{9}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`y\left(x=2\left[inches\right],\ t=3\left[\frac{1}{sec}\right],\ s=1\left[\frac{sec}{m}\right],\ j=2\left[\frac{m}{s}\right],k=1\left[\frac{s}{m}\right]\right)=\left[inches^{9}\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(512, precision-1);  
  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(32, precision);  
  content = await page.textContent('#result-units-4');
  expect(content).toBe('Exponent Not Dimensionless');
  content = await page.textContent('#result-units-5');
  expect(content).toBe('Exponent Not Dimensionless');

});


test('Test function notation with integrals', async () => {

  await page.setLatex(0, String.raw`Ixx=\int _{-\frac{b}{2}}^{\frac{b}{2}}\left(\int _{-\frac{h}{2}}^{\frac{h}{2}}\left(y^{2}\right)\mathrm{d}\left(y\right)\right)\mathrm{d}\left(x\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`Ixx=`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`Ixx\left(b=3\left[inch\right],\ h=2\left[inch\right]\right)=\left[inch^{4}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`doubleIxx\ =\ 2\cdot Ixx\left(b=6\left[mm\right],\ h=2\left[mm\right]\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`doubleIxx=\left[mm^{4}\right]`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(1/12, precision);
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(8, precision);

});


test('Test greek characters as variables', async () => {

  await page.type(':nth-match(textarea, 1)', 'alpha+beta+gamma+delta+epsilon+zeta+eta+theta+iota+kappa+lambda+' +
                  'mu+xi+rho+sigma+tau+upsilon+phi+chi+psi+omega+Gamma+Delta+Theta+Lambda+Xi+Pi+Sigma+Upsilon+Phi+Psi+Omega=');
  
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("α​")');
  await page.type(':nth-match(textarea, 2)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("β")');
  await page.type(':nth-match(textarea, 3)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("γ")');
  await page.type(':nth-match(textarea, 4)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("δ")');
  await page.type(':nth-match(textarea, 5)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ϵ")');
  await page.type(':nth-match(textarea, 6)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ζ")');
  await page.type(':nth-match(textarea, 7)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("η")');
  await page.type(':nth-match(textarea, 8)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("θ")');
  await page.type(':nth-match(textarea, 9)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ι")');
  await page.type(':nth-match(textarea, 10)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("κ")');
  await page.type(':nth-match(textarea, 11)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("λ")');
  await page.type(':nth-match(textarea, 12)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("μ")');
  await page.type(':nth-match(textarea, 13)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ξ")');
  await page.type(':nth-match(textarea, 14)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ρ")');
  await page.type(':nth-match(textarea, 15)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("σ")');
  await page.type(':nth-match(textarea, 16)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("τ")');
  await page.type(':nth-match(textarea, 17)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("υ")');
  await page.type(':nth-match(textarea, 18)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ϕ")');
  await page.type(':nth-match(textarea, 19)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("χ")');
  await page.type(':nth-match(textarea, 20)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ψ")');
  await page.type(':nth-match(textarea, 21)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ω")');
  await page.type(':nth-match(textarea, 22)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button.keyboard:has-text("Γ​"), 2)');
  await page.type(':nth-match(textarea, 23)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Δ"), 2)');
  await page.type(':nth-match(textarea, 24)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Θ"), 2)');
  await page.type(':nth-match(textarea, 25)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Λ"), 2)');
  await page.type(':nth-match(textarea, 26)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Ξ"), 2)');
  await page.type(':nth-match(textarea, 27)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Π​"), 2)');
  await page.type(':nth-match(textarea, 28)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Σ"), 2)');
  await page.type(':nth-match(textarea, 29)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("ϒ")');
  await page.type(':nth-match(textarea, 30)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button:has-text("Φ")');
  await page.type(':nth-match(textarea, 31)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Ψ"), 2)');
  await page.type(':nth-match(textarea, 32)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click("#add-math-cell");
  await page.click('button.tab:has-text("αβγ")');
  await page.click(':nth-match(button:has-text("Ω"), 2)');
  await page.type(':nth-match(textarea, 33)', '=1');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(32, precision);

});


test('Test variable names with subscripts', async () => {

  await page.type(':nth-match(textarea, 1)', 'v_initial');
  await page.press(':nth-match(textarea, 1)', 'ArrowRight');
  await page.type(':nth-match(textarea, 1)', '=10');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'real_root');
  await page.press(':nth-match(textarea, 2)', 'ArrowRight');
  await page.type(':nth-match(textarea, 2)', '=2');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 3)', 'b_1');
  await page.press(':nth-match(textarea, 3)', 'ArrowRight');
  await page.type(':nth-match(textarea, 3)', '=2');

  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 4)', 'real_root');
  await page.press(':nth-match(textarea, 4)', 'ArrowRight');
  await page.type(':nth-match(textarea, 4)', '*v_initial');
  await page.press(':nth-match(textarea, 4)', 'ArrowRight');
  await page.type(':nth-match(textarea, 4)', '*b_1');
  await page.press(':nth-match(textarea, 4)', 'ArrowRight');
  await page.type(':nth-match(textarea, 4)', '=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(40, precision);

  // check to ensure that invalid variables result in a syntax error
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 5)', '1a=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 6)', 'a_1b');
  await page.press(':nth-match(textarea, 6)', 'ArrowRight');
  await page.type(':nth-match(textarea, 6)', '=');
  await page.click('#add-math-cell');
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("α​")');
  await page.click('button.keyboard:has-text("β")');
  await page.type(':nth-match(textarea, 7)', '=1');
  // this one should not be an error (greek variable with valid subscript)
  await page.click('#add-math-cell');
  await page.click('button.tab:has-text("αβγ")');
  await page.click('button.keyboard:has-text("α​")');
  await page.type(':nth-match(textarea, 8)', '_10');
  await page.press(':nth-match(textarea, 8)', 'ArrowRight');
  await page.type(':nth-match(textarea, 8)', '=');
  // next 2 should be valid as well (letter followed by number for name or subscript)
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 9)', 'a1=');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 10)', 'a_b1');
  await page.press(':nth-match(textarea, 10)', 'ArrowRight');
  await page.type(':nth-match(textarea, 10)', '=');

  expect(await page.$eval(':nth-match(.mq-editable-field, 5)',
  el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 6)',
  el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 7)',
  el => el.classList.contains("parsing-error"))).toBeTruthy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 8)',
  el => el.classList.contains("parsing-error"))).toBeFalsy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 9)',
  el => el.classList.contains("parsing-error"))).toBeFalsy();
  expect(await page.$eval(':nth-match(.mq-editable-field, 10)',
  el => el.classList.contains("parsing-error"))).toBeFalsy();

});


test('Make sure results are updating after adding a documentation cell', async () => {

  await page.type(':nth-match(textarea, 1)', 'x=3');
  await page.click('#add-math-cell');
  await page.type(':nth-match(textarea, 2)', 'x=');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  await page.click('#add-documentation-cell');
  await page.type('div.editor div', `Sheet 1\nπ`);
  await page.press('div.editor div', 'Enter');
  await page.waitForSelector('text=Updating...', {state: 'detached'});
  let content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(3.0, precision);

});

test("Test complicated function evaluation", async () => {

  await page.setLatex(0, String.raw`volume\ =\ h\cdot area`);
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`area=l\cdot w`);
  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`y=-\frac{g\cdot \sec\left(theta\right)^{2}}{2\cdot InitialVelocity^{2}}\cdot x^{2}+x\cdot \tan\left(theta\right)`);
  await page.click('#add-math-cell');
  await page.setLatex(3, String.raw`g=9.81\left[\frac{m}{sec^{2}}\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(4, String.raw`y\left(theta=45\left[degrees\right],\ InitialVelocity=1200\left[\frac{ft}{sec}\right],\ x=100\left[yards\right]\right)=\left[feet\right]`);
  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`area=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo((-(9.81*(100/1.09361)**2)/(cos(45*pi/180)**2*2*(1200/3.28084)**2)+ (100/1.09361)*tan(45*(45*pi/180)))*3.28084, 2);
  content = await page.textContent('#result-value-5');
  expect(content).toBe('l w');

});


test('Test unit exponent rounding', async () => {

  await page.setLatex(0, String.raw`C=272\cdot \left(\frac{S_{2}}{1e6\left[Pa\right]}\right)^{-.0995}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`S_{1}=400\left[MPa\right]`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`S_{2}=0.5\cdot S_{1}`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`C\cdot \frac{S_{2}}{190\left[MPa\right]}=`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`C\cdot S_{2}=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  content = await page.textContent('#result-units-4');
  expect(content).toBe('Pa');

});


test('Test unit names that contain numbers', async () => {

  await page.setLatex(0, String.raw`1\left[cmH2O\right]=\left[mmH2O\right]`);
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`1\left[m2\right]=\left[m^{2}\right]`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('10');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('mmH2O');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('1');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m^2');

});


test('Test unit cancelling issues', async () => {

  // subtract one value unitless and the other without units
  await page.setLatex(0, String.raw`\left(1\left[\frac{m}{m}\right]-1\right)\cdot 1\left[m\right]=`);

  // subtract two values with units
  await page.click('#add-math-cell');
  await page.setLatex(1, String.raw`5\left[mm\right]-4\left[mm\right]=`);

  await page.waitForSelector('.status-footer', { state: 'detached' });

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('0');
  content = await page.textContent('#result-units-0');
  expect(content).toBe('m');

  content = await page.textContent('#result-value-1');
  expect(content).toBe('0.001');
  content = await page.textContent('#result-units-1');
  expect(content).toBe('m');

});


test('Test syntax error Show Error button', async ({ browserName }) => {

  // add many empty math cells with syntax errors
  for (let i = 0; i < 20; i++) {
    await page.locator('textarea').nth(i).press('Enter');
  }

  // click the show error button to jump to first syntax error
  await page.locator('text=Show Error').click();

  // first cell should now be visible
  await expect(page.locator('button.bx--tooltip__trigger').nth(0)).toBeFocused({timeout: 1000});

});


test('Test temperature conversions', async () => {

  // make sure negative temperatures are converted correctly
  await page.setLatex(0, '-40[degF]=[degC]');

  // test celsius delta
  await page.locator('#add-math-cell').click();
  await page.setLatex(1, '-29[degC] - -30[celsius]=[kelvin]');

  // test fahrenheit delta
  await page.locator('#add-math-cell').click();
  await page.setLatex(2, '50[fahrenheit] - 49[degF]=');

  // test absolute temperature conversion for celsius
  await page.locator('#add-math-cell').click();
  await page.setLatex(3, '10[degC]=');

  // test absolute temperature conversion for rankine
  await page.locator('#add-math-cell').click();
  await page.setLatex(4, '1[degF]=[degR]');

  // test absolute back to celsius
  await page.locator('#add-math-cell').click();
  await page.setLatex(5, '263.15[K]=[degC]');

  // test absolute back to fahreinheit
  await page.locator('#add-math-cell').click();
  await page.setLatex(6, '233.15[K]=[degF]');

  // make sure derived temp dims treated as deltas
  await page.locator('#add-math-cell').click();
  await page.setLatex(7, String.raw`2\left[\frac{1}{degC}\right]=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(8, String.raw`1\left[degF\cdot sec\right]=`);

  await page.waitForSelector('text=Loading Pyodide...', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});


  let content = await page.textContent('#result-value-0');
  expect(parseFloat(content)).toBeCloseTo(-40, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('degC');

  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(1, precision);
  content = await page.textContent('#result-units-1');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(5/9, precision);
  content = await page.textContent('#result-units-2');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-3');
  expect(parseFloat(content)).toBeCloseTo(283.15, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('kelvin');

  content = await page.textContent('#result-value-4');
  expect(parseFloat(content)).toBeCloseTo(460.67, precision-1);
  content = await page.textContent('#result-units-4');
  expect(content).toBe('degR');

  content = await page.textContent('#result-value-5');
  expect(parseFloat(content)).toBeCloseTo(-10, precision);
  content = await page.textContent('#result-units-5');
  expect(content).toBe('degC');

  content = await page.textContent('#result-value-6');
  expect(parseFloat(content)).toBeCloseTo(-40, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('degF');

  content = await page.textContent('#result-value-7');
  expect(parseFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('kelvin^-1');

  content = await page.textContent('#result-value-8');
  expect(parseFloat(content)).toBeCloseTo(5/9, precision);
  content = await page.textContent('#result-units-8');
  expect(content).toBe('sec^1*kelvin^1');

});