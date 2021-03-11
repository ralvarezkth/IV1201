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
        let el = await driver.findElements(By.xpath("//div[@class='Header']//a"));
        let home = el[0];
        let reg = el[1];
        let login = el[2];
        let apply = el[3];
        let footer = await driver.findElement(By.xpath("//div[@class='footer']"));
        let homeDesc = await driver.findElement(By.xpath("//div[@class='App']/div"));
        let langOptions = await driver.findElements(By.xpath("//select/option"));
        let english = langOptions[0];
        let swedish = langOptions[1];
        let german = langOptions[2];
        let content = {header: {en: "Home", se: "Hem", de: "Zuhause"}, footer: {en: "Footer all rights reserved", se: "Svettiga fötter välkommen att ta för er", de: "Kartoffelsalat ist sehr gut"},
            home: {en: "This client is still very much", se: "Den här klienten är fortfarande ett bananskal", de: "unser deutsch ist ein bisschen besser"},
            };

        english.isSelected().then(was => {
            assert.ok(was, "English is default language but appears not to be selected per default");
        });

        home.getText().then(text => {
            assert.strictEqual(content.header.en, text, "Expected english content not present");
            assert.notStrictEqual(content.header.se, text, "English language selected but appears swedish is shown");
            assert.notStrictEqual(content.header.de, text, "English language selected but appears german is shown");
        });

        footer.getText().then(text => {
            assert.strictEqual(content.footer.en, text, "Expected english content not present");
            assert.notStrictEqual(content.footer.se, text, "English language selected but appears swedish is shown");
            assert.notStrictEqual(content.footer.de, text, "English language selected but appears german is shown");
        });

        homeDesc.getText().then(text => {
            assert.notStrictEqual(-1, text.indexOf(content.home.en), "Expected english content not present");
            assert.strictEqual(-1, text.indexOf(content.home.se), "English language selected but appears swedish is shown");
            assert.strictEqual(-1, text.indexOf(content.home.de), "English language selected but appears german is shown");
        });

        await driver.sleep(100);
        swedish.click();
        await driver.sleep(100);

        swedish.isSelected().then(was => {
            assert.ok(was, "Swedish is selected language but appears not to be selected");
        });

        home.getText().then(text => {
            assert.notStrictEqual(content.header.en, text, "Swedish language selected but appears english is shown");
            assert.strictEqual(content.header.se, text, "Expected swedish content not present");
            assert.notStrictEqual(content.header.de, text, "Swedish language selected but appears german is shown");
        });

        footer.getText().then(text => {
            assert.notStrictEqual(content.footer.en, text, "Swedish language selected but appears english is shown");
            assert.strictEqual(content.footer.se, text, "Expected swedish content not present");
            assert.notStrictEqual(content.footer.de, text, "Swedish language selected but appears german is shown");
        });

        homeDesc.getText().then(text => {
            assert.strictEqual(-1, text.indexOf(content.home.en), "Swedish language selected but appears english is shown");
            assert.notStrictEqual(-1, text.indexOf(content.home.se), "Expected swedish content not present");
            assert.strictEqual(-1, text.indexOf(content.home.de), "Swedish language selected but appears german is shown");
        });

        await driver.sleep(100);
        german.click();
        await driver.sleep(100);

        german.isSelected().then(was => {
            assert.ok(was, "German is selected language but appears not to be selected");
        });

        home.getText().then(text => {
            assert.notStrictEqual(content.header.en, text, "German language selected but appears english is shown");
            assert.notStrictEqual(content.header.se, text, "German language selected but appears swedish is shown");
            assert.strictEqual(content.header.de, text, "Expected german content not present");
        });

        footer.getText().then(text => {
            assert.notStrictEqual(content.footer.en, text, "German language selected but appears english is shown");
            assert.notStrictEqual(content.footer.se, text, "German language selected but appears swedish is shown");
            assert.strictEqual(content.footer.de, text, "Expected german content not present");
        });

        homeDesc.getText().then(text => {
            assert.strictEqual(-1, text.indexOf(content.home.en), "German language selected but appears english is shown");
            assert.strictEqual(-1, text.indexOf(content.home.se), "German language selected but appears swedish is shown");
            assert.notStrictEqual(-1, text.indexOf(content.home.de), "Expected german content not present");
        });

        await driver.sleep(100);
        reg.click();
        await driver.sleep(100);
        let inputs = await driver.findElements(By.xpath("//form//input"));
        let button = await driver.findElement(By.xpath("//form//button"));

        assert.strictEqual(6, inputs.length);
        button.getAttribute("type").then(type => assert.strictEqual("submit", type, "Button expected to be type submit but is not"));

        await driver.sleep(100);
        login.click();
        await driver.sleep(100);
        inputs = await driver.findElements(By.xpath("//form//input"));
        button = await driver.findElement(By.xpath("//form//button"));

        assert.strictEqual(2, inputs.length);
        inputs[1].getAttribute("type").then(type => assert.strictEqual("password", type.toLowerCase(), "Password field was expected to be masked but is not"))
        button = await driver.findElement(By.xpath("//form//button"));

        await driver.sleep(100);
        apply.click();
        await driver.sleep(100);
        inputs = await driver.findElements(By.xpath("//form//*"));

        assert.strictEqual(1, inputs.length);

        await driver.sleep(100);
        home.click();
        await driver.sleep(100);
        
    } finally {
        await driver.quit();
    }
})();