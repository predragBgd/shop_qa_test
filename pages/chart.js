"use strict";

const { By, until } = require("selenium-webdriver");

module.exports = class Chartpage {
  #driver;
  constructor(webdriver) {
    this.#driver = webdriver;
  }
  goToChartPage() {
    this.#driver.get("http://shop.qa.rs/cart");
  }
  getH1() {
    return this.#driver.findElement(By.css("h1")).getText();
  }
  getOrderName() {
    const orderItem = this.#driver.findElement(By.xpath(`//tr[1]/td[1]`));
    return orderItem.getText();
  }
  getItemQuantity() {
    const orderQuantity = this.#driver.findElement(By.xpath(`//tr[1]/td[2]`));
    return orderQuantity.getText();
  }
  getItemPrice() {
    const itemPrice = this.#driver.findElement(By.xpath(`//tr[1]/td[3]`));
    return itemPrice.getText();
  }
  getTotalItemPrice() {
    const totalItemPrice = this.#driver.findElement(By.xpath(`//tr[1]/td[4]`));
    return totalItemPrice.getText();
  }
  getTotalCheckoutPrice() {
    const totalCheckoutPrice = this.#driver.findElement(By.xpath(`//tr[3]/td`));
    return totalCheckoutPrice.getText();
  }
  async getCheckout() {
    const checkoutBtn = await this.#driver.findElement(By.name("checkout"));
    await checkoutBtn.click();
  }
};
