const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const {Options} = require('selenium-webdriver/chrome');

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
        let el = await driver.findElements(By.xpath("//div[@class='Header']//a"));
        let home = el[0];
        let login = el[2];
        let apply = el[3];

        login.click();
        await driver.sleep(100);
        let inputs = await driver.findElements(By.xpath("//form//input"));
        let uname = inputs[0];
        let passwd = inputs[1];
        let button = await driver.findElement(By.xpath("//form//button"));

        uname.sendKeys("President");
        passwd.sendKeys("admin123");
        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        let feedback = await driver.findElement(By.xpath("//div[@class='App']/div"));
        feedback.getText().then(text => {
            if (text.indexOf("password do not match")) {
                let msg = "Bad credentials";
                test(msg);
                assert.notStrictEqual(-1, text.indexOf("Login failed"));
                assert.notStrictEqual(-1, text.indexOf("password do not match"));
                pass(msg);
            } else {
                let msg = "Number of failed logins";
                test(msg);
                assert.notStrictEqual(-1, text.indexOf("Login failed"));
                assert.notStrictEqual(-1, text.indexOf("please wait 1 minute"));
                pass(msg);
            }
        });

        await driver.sleep(100);
        passwd.sendKeys("4");
        await driver.sleep(100);
        button.click();
        await driver.sleep(500);
        let loggedIn = true;

        driver.getCurrentUrl().then(url => {
            if (url.indexOf("apply") !== -1) {
                let welcome = driver.findElement(By.xpath("//div[@class='App']//h3"));
                welcome.then(el => {
                    el.getText().then(text => {
                        let msg = "Successful login";
                        test(msg);
                        assert.notStrictEqual(-1, text.indexOf("Hi Richi"));
                        pass(msg)
                    });
                })
                
            } else {
                loggedIn = false;
                let msg = "Number of failed logins";
                test(msg);
                assert.notStrictEqual(-1, text.indexOf("Login failed"));
                assert.notStrictEqual(-1, text.indexOf("please wait 1 minute"));
                pass(msg);
            }
        });

        await driver.sleep(100);

        if (!loggedIn) {
            throw new Error("Cant login");
        }

        inputs = await driver.findElements(By.xpath("//form//input"));
        button = await driver.findElement(By.xpath("//form//button"));
        let competence = inputs[0];
        let duration = inputs[1];
        let availability = inputs[2];

        competence.sendKeys("BananMosare");
        duration.sendKeys("5");
        availability.sendKeys("forever");

        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        feedback = await driver.findElement(By.xpath("//div[@class='App']/div"));
        feedback.getText().then(text => {
            let msg = "Submit application";
            test(msg);
            assert.notStrictEqual(-1, text.indexOf("feature has not been implemented yet"));
            pass(msg);
        });

        await driver.sleep(100);
        
    } finally {
        await driver.quit();
    }

    function test(msg) {
        console.log("[*] testing: " + msg);
    }

    function pass(msg) {
        console.log("[X] passed: " + msg);
    }
})();