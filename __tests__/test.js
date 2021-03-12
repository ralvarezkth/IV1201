const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { By, Key, until } = webdriver;
const assert = require('assert');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const web_app_url = "http://localhost:3000";

async function testRegister() {
    const driver = await new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

    await driver.get(web_app_url);
    await driver.manage().window().setRect({ width: 1024, height: 768, x: 2416, y: 672});
    
    let navbarLinks = await driver.findElements(By.css(".Header ul li a"));
    let RegisterLink;
    for(let link of navbarLinks) {
        let endpoint = await (await link.getAttribute("href"));
        if(endpoint === web_app_url + "/register") {
            RegisterLink = link;
            continue;
        }
    }
    await RegisterLink.click();
    await driver.findElement(By.css("#firstName")).sendKeys("Sel");
    await driver.findElement(By.css("#lastName")).sendKeys("Enium");
    await driver.findElement(By.css("#email")).sendKeys("selenium@mail.se");
    await driver.findElement(By.css("#socialSecurityNumber")).sendKeys("600101-1111");
    await driver.findElement(By.css("#username")).sendKeys("selenium7");
    await driver.findElement(By.css("#password")).sendKeys("password1");
    await (await driver.findElement(By.css("#send"))).click();
    let registrationMessage = await driver.wait(until.elementLocated(By.css("#message")));

    assert.strictEqual(
        await registrationMessage.getText(), 
        "Hello Sel! Registration successful.", 
        "Check that first name of created user is displayed in the message"
    );
    
    
    //driver.quit();
}

testRegister();