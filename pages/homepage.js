"use strict";

const { By, until } = require("selenium-webdriver");

module.exports = class Homepage {
  #driver;
  constructor(webdriver) {
    this.#driver = webdriver;
  }
  goToHomePage() {
    this.#driver.get("http://shop.qa.rs");
  }
  getH1() {
    return this.#driver.findElement(By.css("h1")).getText();
  }
  getLoginMesage() {
    return this.#driver.findElement(By.xpath(`/html/body/div[2]`)).getText();
  }
  async getWelcomeMesage() {
    await this.#driver.wait(until.elementLocated(By.xpath(`//h2`)));
    return this.#driver.findElement(By.xpath(`//h2`)).getText();
  }
  getPackageDiv(title) {
    const packageXpath = `//h3[contains(text(), "${title}")]/ancestor::div[contains(@class, "panel")]
    `;
    return this.#driver.findElement(By.xpath(packageXpath));
  }
  getQuantityDropdown(packageDiv) {
    return packageDiv.findElement(By.name("quantity"));
  }

  getQuantityOptions(quantityDropdown) {
    return quantityDropdown.findElements(By.css("option"));
  }
  getOrderBtn(packageDiv) {
    return packageDiv.findElement(By.className("btn btn-primary"));
  }
  async getCheckout() {
    const checkout = this.#driver.findElement(By.name("checkout"));
    checkout.click();
  }
};
