let puppeteer = require("puppeteer");
let { email, password } = require("../secret");
let { codes } = require("./code");
let gtab;
console.log("Before");
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"] //"--incoignito"
})
browserPromise
    .then(function (browserInstance) {
        let newTabPromise = browserInstance.newPage();
        return newTabPromise;
    })
    .then(function (newPage) {
        // console.log("new tab opened");
        let loginPageWillBeOpenedPromise = newPage.goto("https://www.hackerrank.com/auth/login");
        gtab = newPage;
        return loginPageWillBeOpenedPromise;
    })
    .then(function () {
        // console.log("login page opened");
        let emailWillBeTypesPromise = gtab.type("#input-1", email, { delay: 200 });
        return emailWillBeTypesPromise;
    })
    .then(function () {
        let passwordWillBeTypesPromise = gtab.type("#input-2", password, { delay: 200 });
        return passwordWillBeTypesPromise;
    })
    .then(function () {
        let loginPageWillBeClickedPromise = gtab.click("button[data-analytics='LoginPassword']");
        return loginPageWillBeClickedPromise;
    })
    .then(function () {
        console.log("Login Done");
        let clickIPKit = waitAndClick(".card-content h3[title = 'Interview Preparation Kit']");
        return clickIPKit;
    })
    .then(function () {
        console.log("Interview Prep Kit Page Opened");
        let warmUpClick = waitAndClick("a[data-attr1 = 'warmup']");
        return warmUpClick;
    })
    .then(function () {
        let url = gtab.url();
        console.log(url);
        let questionObj = codes[0];
        questionSolver(url, questionObj.qName, questionObj.soln);
    })
    .catch(function (err) {
        console.log(err);
    })
// promise based function -> wait and click
function waitAndClick(selector) {
    return new Promise(function (resolve, reject) {
        let selectorWaitPromise =
            gtab.waitForSelector(selector, { visible: true });
        selectorWaitPromise
            .then(function () {
                let selectorClickPromise = gtab.click(selector);
                return selectorClickPromise;
            }).then(function () {
                resolve();
            }).catch(function () {
                reject(err);
            })
    })
}
function questionSolver(modulepageUrl, questionName, code) {
    return new Promise(function (resolve, reject) {
        // page visit
        let reachedPageUrlPromise = gtab.goto(modulepageUrl);
        reachedPageUrlPromise
            .then(function () {
                //  page h4 -> mathcing h4 -> click
                // function will exceute inside the browser
                function browserconsolerunFn(questionName) {
                    let allH4Elem = document.querySelectorAll("h4");
                    let textArr = [];
                    for (let i = 0; i < allH4Elem.length; i++) {
                        let myQuestion = allH4Elem[i]
                            .innerText.split("\n")[0];
                        textArr.push(myQuestion);
                    }
                    let idx = textArr.indexOf(questionName);
                    // console.log(idx);
                    // console.log("hello");
                    allH4Elem[idx].click();
                }
                let pageClickPromise =
                    gtab.evaluate(browserconsolerunFn, questionName);
                return pageClickPromise;
            }).then(function () {
                resolve();
            })
        // questionName-> appear -> click
        // read 
        // copy
        // paste
        // submit 
    })
}
console.log("After");