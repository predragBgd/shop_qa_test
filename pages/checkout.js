"use strict";

const { By, until } = require("selenium-webdriver");
const Basepage = require("./base.page");

module.exports = class Checkoutpage extends Basepage {
  #driver;
  constructor(webdriver) {
    super(webdriver);
    this.#driver = webdriver;
  }
  goToCheckoutPage() {
    this.#driver.get("http://shop.qa.rs/checkout");
  }
  getH2() {
    return this.#driver.findElement(By.css("h2")).getText();
  }
  async getCheckoutOrderNumber() {
    return (await this.getH2()).replace(/\D/g, "");
  }
};
