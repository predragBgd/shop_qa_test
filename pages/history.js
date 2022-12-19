"use strict";

const { By, until } = require("selenium-webdriver");

module.exports = class Historypage {
  #driver;
  constructor(webdriver) {
    this.#driver = webdriver;
  }
  getH1() {
    return this.#driver.findElement(By.css("h1")).getText();
  }
  getHistoryTable() {
    return this.#driver.findElement(By.css("table"));
  }
  getHistoryRow(orderNo) {
    const xpathHistoryRow = `//tr[contains(., "${orderNo}")]`;
    return this.getHistoryTable().findElement(By.xpath(xpathHistoryRow));
  }
  getHistoryStatus(historyRow) {
    return historyRow.findElement(By.className("status"));
  }
};
