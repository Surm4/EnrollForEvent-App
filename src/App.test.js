import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import puppeteer from 'puppeteer';

let page;
let browser;

beforeAll( async () => {
  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should load page', async () => {
  await page.goto('localhost:3000');
});

it('should have proper title', async () => {
  await page.waitFor('.title');
  const text = await page.evaluate(() => {
    return document.querySelector(".title").textContent;
  });
  expect(text).toBe("Recruitment Process App");
});

it('elements loaded properly', async () => {
  await page.waitFor(".firstname");
  await page.waitFor(".lastname");
  await page.waitFor(".email");
  await page.waitFor(".date");
  await page.waitFor("button");
});

it('should send data sucessfully', async () => {
  await page.type(".firstname", "Jan");
  await page.type(".lastname", "Kowalski");
  await page.type(".email", "jan.kowalski@domena.pl");
  await page.type(".date", "2019-09-09");
  await page.click("button");
  await page.waitFor(".response-msg");
  const text = await page.evaluate(() => {
    return document.querySelector(".response-msg").textContent;
  });
  expect(text).toBe("User enrolled successfully.");
});

it('should get user error', async () => {
  await page.type(".firstname", "Jan");
  await page.type(".lastname", "Kowalski");
  await page.type(".email", "jan.kowalski@nieukonczonyadres");
  await page.type(".date", "2019-09-09");
  await page.click("button");
  await page.waitFor(".response-msg");
  const text = await page.evaluate(() => {
    return document.querySelector(".response-msg").textContent;
  });
  expect(text).toBe("Validation fail! Provide correct data.");
});
