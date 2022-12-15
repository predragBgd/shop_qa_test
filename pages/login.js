"use strict";

const { By } = require("selenium-webdriver");

module.exports = class Login {
  #driver;
  constructor(webdriver) {
    this.#driver = webdriver;
  }
  goToLoginPage() {
    this.#driver.get("http://shop.qa.rs/login");
  }
  getH2() {
    return this.#driver.findElement(By.css("h2")).getText();
  }
  getUserName() {
    return this.#driver.findElement(By.name("username"));
  }
  getPassword() {
    return this.#driver.findElement(By.name("password"));
  }
  //   getLoginBtn() {
  //     return this.#driver.findElement(By.name("login"));
  //   }
  async getLoginBtn() {
    const buttonLogin = await this.#driver.findElement(By.name("login"));
    await buttonLogin.click();
  }
};
