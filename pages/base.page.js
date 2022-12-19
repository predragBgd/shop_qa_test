"use strict";

const { By, until } = require("selenium-webdriver");

module.exports = class Basepage {
  #driver;
  constructor(webdriver) {
    this.#driver = webdriver;
  }
  async goToHistoryPage() {
    const historyPage = await this.#driver.findElement(
      By.linkText("Order history")
    );
    await historyPage.click();
  }
  getHistoryRow(orderNo) {
    const historyRow = this.#driver.findElement(
      By.xpath(`//tr[contains(., "${orderNo}")]`)
    );
  }
};
