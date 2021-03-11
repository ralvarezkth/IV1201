const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const {Options} = require('selenium-webdriver/chrome');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const customChromePath = '/bin/brave';

(async function example() {
    let opts = new Options();

    if (customChromePath) {
        opts.setChromeBinaryPath(customChromePath);
    }

    const driver = await new Builder().forBrowser('firefox')
        .setChromeOptions(opts)
        .setFirefoxOptions()
        .build();

    try {
        await driver.get('http://localhost:3000');
        await driver.sleep(100);
        let el = await driver.findElements(By.xpath("//div[@class='Header']/a"));
        let home = el[0];
        let reg = el[1];

        reg.click();
        await driver.sleep(100);
        let inputs = await driver.findElements(By.xpath("//form//input"));
        let firstName = inputs[0];
        let lastName = inputs[1];
        let email = inputs[2];
        let ssn = inputs[3];
        let uname = inputs[4];
        let passwd = inputs[5];
        let button = await driver.findElement(By.xpath("//form//button"));

        firstName.sendKeys("Richi");
        lastName.sendKeys("");
        email.sendKeys("test@test.com");
        ssn.sendKeys("880808-8888");
        uname.sendKeys("President");
        passwd.sendKeys("admin1234");
        await driver.sleep(100);
        button.click();
        await driver.sleep(100);

        driver.switchTo().activeElement().then(el => {
            el.getId().then(activeId => {
                lastName.getId().then(id => {
                    assert.ok(activeId === id, "Client validation does not appear to autofocus");
                });
            });
        });

        lastName.getText().then(text => {
            assert.strictEquals("", text, "Client validation input expected empty but appears not to be");
        });

        await driver.sleep(100);
        lastName.sendKeys("Woosah");
        await driver.sleep(100);

        button.click();
        
        
    } finally {
  //      await driver.quit();
    }
})();