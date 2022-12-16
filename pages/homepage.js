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
  async getStarterQuantity() {
    const starterQuantity = await this.#driver.findElement(By.name("quantity"));
    starterQuantity.click();
    const starterQuantityValue = await this.#driver.findElement(
      By.xpath(
        `/html/body/div[2]/div[4]/div[2]/div/div[2]/form/p[3]/select/option[6]`
      )
    );
    await starterQuantityValue.click();
    const starterBtn = await this.#driver.findElement(
      By.xpath(`/html/body/div[2]/div[4]/div[2]/div/div[2]/form/p[4]/input`)
    );
    starterBtn.click();
  }
  async getStarterOrderQuantity() {
    await this.#driver.wait(until.elementLocated(By.name("checkout")));
    const starterOrderQuantity = this.#driver.findElement(
      By.xpath(`/html/body/div[2]/div[2]/table/tbody/tr[1]/td[2]`)
    );
    return starterOrderQuantity.getText();
  }
  async getCheckout() {
    const checkout = this.#driver.findElement(By.name("checkout"));
    checkout.click();
  }
};
