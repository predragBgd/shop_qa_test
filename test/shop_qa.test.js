"use strict";

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const { assert, expect } = require("chai");
const Homepage = require("../pages/homepage");
const Register = require("../pages/register");
const Login = require("../pages/login");

describe("Shop.qa.rs test", () => {
  let driver;
  let shopQaHomepage;
  let shopQaRegisterpage;
  let shopQaLoginPage;
  before(() => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
    shopQaHomepage = new Homepage(driver);
    shopQaRegisterpage = new Register(driver);
    shopQaLoginPage = new Login(driver);
  });
  after(async () => {
    await driver.sleep(2000);
    await driver.quit();
  });
  it("Open Shop.qa.rs", async () => {
    await shopQaHomepage.goToHomePage();
    assert.equal(await shopQaHomepage.getH1(), "Quality Assurance (QA) Shop");
  });
  it("Go to register page", async () => {
    await shopQaRegisterpage.goToRegisterPage();
    expect(await shopQaRegisterpage.getRegistrationForm()).to.be.true;
  });
  it("Register user", async () => {
    await shopQaRegisterpage.getFirstName().sendKeys("Milan");
    await shopQaRegisterpage.getLastName().sendKeys("Pilic");
    await shopQaRegisterpage.getEmail().sendKeys("milan@loc.local");
    await shopQaRegisterpage.getUserName().sendKeys("Milance");
    await shopQaRegisterpage.getPassword().sendKeys("milan123");
    await shopQaRegisterpage.getConfirmPassword().sendKeys("milan123");
    await shopQaRegisterpage.getRegisterBtn();
    expect(await shopQaHomepage.getLoginMesage()).to.contain("Uspeh!");
  });
  it("Login user", async () => {
    await shopQaLoginPage.goToLoginPage();
    expect(await shopQaLoginPage.getH2()).to.equal("Prijava");
    await shopQaLoginPage.getUserName().sendKeys("Milan");
    await shopQaLoginPage.getPassword().sendKeys("Milan123");
    await shopQaLoginPage.getLoginBtn();
    expect(await shopQaHomepage.getWelcomeMesage()).to.contain("Welcome back,");
  });
});
