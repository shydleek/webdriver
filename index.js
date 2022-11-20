const {Builder, Browser, Capabilities, By, Key, until} = require('selenium-webdriver');
require("chromedriver");

const chai = require("chai");
const expect = chai.expect;

let chromeCapabilities = Capabilities.chrome();
const options = {
  args: [
    '--test-type', 
    '--incognito',
    '--start-maximized'
  ]
}
chromeCapabilities.set("goog:chromeOptions", options);

const TIMEOUT = 5000;
const TEST_TIMEOUT = 60000;
const TOTAL_PRICE = "7 075 UAH";
const TOTAL_ITEMS = 5;
const linkToTheSweatshirt = 'https://jolybell.com/product/115';
const addToCartXPath = `//button[@type='button' and @class='product-info-add-to-cart']`;
const addOneMoreItemXPath = `//button[@type='button' and @class='modal__cart-product-count-plus']`;
const totalPriceXPath = `//span[@class='modal__cart-total-cost-value']`;

describe("Add item test", () => {
  it("Should return correct total price", async function(){
    let driver = await new Builder().forBrowser(Browser.CHROME).withCapabilities(chromeCapabilities).build();

    await driver.get(linkToTheSweatshirt);
    await driver.sleep(TIMEOUT);

    await driver.findElement(By.xpath(addToCartXPath)).click();
    
    for (let i = 0; i < TOTAL_ITEMS; i++) {
      await driver.sleep(TIMEOUT);
      await driver.findElement(By.xpath(addOneMoreItemXPath)).click();
    }

    const totalPrice = await driver.findElement(By.xpath(totalPriceXPath)).getText();
    await driver.quit();
    
    expect(TOTAL_PRICE).to.equal(totalPrice);
  }).timeout(TEST_TIMEOUT);
});