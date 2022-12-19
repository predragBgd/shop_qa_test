"use strict";

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const { assert, expect } = require("chai");
const Homepage = require("../pages/homepage");
const Register = require("../pages/register");
const Login = require("../pages/login");
const Chartpage = require("../pages/chart");
const Checkoutpage = require("../pages/checkout");
const Historypage = require("../pages/history");

describe("Shop.qa.rs test", () => {
  let driver;
  let shopQaHomepage;
  let shopQaRegisterpage;
  let shopQaLoginPage;
  let shopQaChartpage;
  let shopQaCheckoutPage;
  let shopQaHistoryPage;

  const user = "Milan";
  const packageToAdd = "starter";
  const packageQuantity = "5";

  before(() => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
    shopQaHomepage = new Homepage(driver);
    shopQaRegisterpage = new Register(driver);
    shopQaLoginPage = new Login(driver);
    shopQaChartpage = new Chartpage(driver);
    shopQaCheckoutPage = new Checkoutpage(driver);
    shopQaHistoryPage = new Historypage(driver);
  });
  after(async () => {
    // await driver.sleep(3000);
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
    await shopQaRegisterpage.getFirstName().sendKeys(user);
    await shopQaRegisterpage.getLastName().sendKeys("Pilic");
    await shopQaRegisterpage.getEmail().sendKeys("milan@loc.local");
    await shopQaRegisterpage.getUserName().sendKeys("Milance");
    await shopQaRegisterpage.getPassword().sendKeys("Milan123");
    await shopQaRegisterpage.getConfirmPassword().sendKeys("Milan123");
    await shopQaRegisterpage.getRegisterBtn();
    expect(await shopQaHomepage.getLoginMesage()).to.contain("Uspeh!");
  });
  it("Login user", async () => {
    await shopQaLoginPage.goToLoginPage();
    expect(await shopQaLoginPage.getH2()).to.equal("Prijava");
    await shopQaLoginPage.getUserName().sendKeys("Milance");
    await shopQaLoginPage.getPassword().sendKeys("Milan123");
    await shopQaLoginPage.getLoginBtn();
    expect(await shopQaHomepage.getWelcomeMesage()).to.contain("Welcome back,");
  });
  it("Add item to cart", async () => {
    const packageDiv = await shopQaHomepage.getPackageDiv(packageToAdd);
    const quantity = await shopQaHomepage.getQuantityDropdown(packageDiv);
    const options = await shopQaHomepage.getQuantityOptions(quantity);

    await Promise.all(
      options.map(async (option) => {
        const text = await option.getText();
        if (text === packageQuantity) {
          await option.click();

          const selectedValue = await quantity.getAttribute("value");
          expect(selectedValue).to.contain(packageQuantity);

          const buttonOrder = await shopQaHomepage.getOrderBtn(packageDiv);
          await buttonOrder.click();

          expect(await driver.getCurrentUrl()).to.contain(
            "http://shop.qa.rs/order"
          );
        }
      })
    );
  });
  it(`Open shoping chart`, async () => {
    await shopQaChartpage.goToChartPage();
    expect(await shopQaChartpage.getH1()).to.contain("Order");
  });
  it("Verifies items are in chart", async () => {
    expect(await shopQaChartpage.getItemQuantity()).to.contain(packageQuantity);
    expect(await shopQaChartpage.getOrderName()).to.contain(
      packageToAdd.toUpperCase()
    );
  });
  it("Verifies total price is correct", async () => {
    const orderQuantity = await shopQaChartpage.getItemQuantity();
    const itemPrice = Number(
      (await shopQaChartpage.getItemPrice()).replace(/\D/g, "")
    );
    const totalItemPrice = Number(
      (await shopQaChartpage.getTotalItemPrice()).replace(/\D/g, "")
    );
    const total = orderQuantity * itemPrice;
    expect(total === totalItemPrice);
  });
  it("Verifies total checkout price is correct", async () => {
    const totalItemPrice = Number(
      (await shopQaChartpage.getTotalItemPrice()).replace("$", "")
    );
    const totalCheckoutPrice = Number(
      (await shopQaChartpage.getTotalCheckoutPrice()).replace(/\D/g, "")
    );
    expect(totalItemPrice).of.be.eq(totalCheckoutPrice);
  });
  it("Checkout", async () => {
    await shopQaChartpage.getCheckout();
    expect(await shopQaCheckoutPage.getH2()).to.contain("Order #");
  });
  it("Verifies checkout success", async () => {
    const orderNo = await shopQaCheckoutPage.getCheckoutOrderNumber();
    await shopQaCheckoutPage.goToHistoryPage();
    expect(await shopQaHistoryPage.getH1()).to.contain("Order History");
    const historyRow = await shopQaHistoryPage.getHistoryRow(orderNo);
    const historyStatus = await shopQaHistoryPage
      .getHistoryStatus(historyRow)
      .getText();
    expect(historyStatus).to.be.equal("Ordered");
  });
  it("Logout", async () => {
    await shopQaHomepage.goToHomePage();
    await shopQaHomepage.logoutBtn(user);
    assert.equal(await shopQaHomepage.getH1(), "Quality Assurance (QA) Shop");
  });
});
