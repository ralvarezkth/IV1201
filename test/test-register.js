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
                    let msg = "Client validation";
                    test(msg);
                    assert.ok(activeId === id, "Client validation does not appear to autofocus");
                    pass(msg);
                });
            });
        });

        lastName.getText().then(text => {
            let msg = "Client validation";
            test(msg);
            assert.strictEqual("", text, "Client validation input expected empty but appears not to be");
            pass(msg);
        });

        await driver.sleep(100);
        lastName.sendKeys("Woosah");
        await driver.sleep(100);

        button.click();
        await driver.sleep(500);
        let feedback = await driver.findElement(By.xpath("//div[@class='App']/div"));
        
        feedback.getAttribute("class").then(attr => {
            feedback.getText().then(text => {
                let msg = "Conditional registration";
                test(msg);
                if (attr === "bg-green") {
                    assert.notStrictEqual(-1, text.indexOf("Registration successful", "Registration successful but expected feedback not provided"));
                    pass(msg);
                } else {
                    assert.notStrictEqual(-1, text.indexOf("Registration failed", "Registration failed due to duplicate user but expected feedback not provided"));
                    assert.notStrictEqual(-1, text.indexOf("not available"), "Registration failed due to duplicate user but expected feedback not provided");
                    pass(msg);
                }
            });
        });

        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        feedback.getText().then(text => {
            let msg = "Register duplicate user";
            test(msg);
            assert.notStrictEqual(-1, text.indexOf("Registration failed"), "Registration failed due to duplicate user but expected feedback not provided");
            assert.notStrictEqual(-1, text.indexOf("not available"), "Registration failed due to duplicate user but expected feedback not provided");
            pass(msg);
        });

        await driver.sleep(100);
        firstName.clear();
        lastName.clear();
        email.clear();
        ssn.clear();
        uname.clear();
        passwd.clear();
        await driver.sleep(100);

        firstName.sendKeys("Test1");
        lastName.sendKeys("User");
        email.sendKeys("test@user.com");
        ssn.sendKeys("990909-9999");
        uname.sendKeys("TestUser123");
        passwd.sendKeys("Password123");

        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        feedback.getText().then(text => {
            let msg = "Invalid name format; server-side validation";
            test(msg);
            assert.notStrictEqual(-1, text.indexOf("Invalid name format"), "Registration failed due to invalid first name but expected feedback not provided");
            pass(msg);
        });

        await driver.sleep(100);
        firstName.clear();
        firstName.sendKeys("Test");
        lastName.clear();
        lastName.sendKeys("User1");

        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        feedback.getText().then(text => {
            let msg = "Invalid name format; server-side validation";
            test(msg);
            assert.notStrictEqual(-1, text.indexOf("Invalid name format"), "Registration failed due to invalid last name but expected feedback not provided");
            pass(msg);
        });

        await driver.sleep(100);
        lastName.clear();
        lastName.sendKeys("User");
        email.clear();
        email.sendKeys("test@user");

        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        feedback.getText().then(text => {
            let msg = "Invalid email format; server-side validation";
            test(msg);
            assert.notStrictEqual(-1, text.indexOf("Invalid email format"), "Registration failed due to invalid email address but expected feedback not provided");
            pass(msg);
        });

        await driver.sleep(100);
        email.clear();
        email.sendKeys("test@user.com");
        passwd.clear();
        passwd.sendKeys("badpw");

        await driver.sleep(100);
        button.click();
        await driver.sleep(500);

        feedback.getText().then(text => {
            let msg = "Invalid password format; server-side validation";
            test(msg);
            assert.notStrictEqual(-1, text.indexOf("Invalid password"), "Registration failed due to invalid password but expected feedback not provided");
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