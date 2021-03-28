let puppeteer = require("puppeteer");
let {email, password} = require("../secret");
let gtab;
console.log("Before");
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"] //"--incoignito"
})
browserPromise
    .then(function (browserInstance){
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
        let emailWillBeTypesPromise = gtab.type("#input-1",email,{delay: 200});
        return emailWillBeTypesPromise;
    })
    .then(function () {
        let passwordWillBeTypesPromise = gtab.type("#input-2",password,{delay: 200});
        return passwordWillBeTypesPromise;
    })
    .then(function () {
        let loginPageWillBeClickedPromise = gtab.click("button[data-analytics='LoginPassword']");
        let IPKitChallengeElementPromise = gtab.waitForSelector(".card-content h3[title = 'Interview Preparation Kit']",{ visible: true });
        let combinedPromise = Promise.all([loginPageWillBeClickedPromise, gtab.waitForNavigation({waitUntil:"networkidle0" }), IPKitChallengeElementPromise]);
        return combinedPromise;
    })
    .then(function () {
        console.log("Login Done IPK element loaded");
        let interviewPrepKitPromise = gtab.click(".card-content h3[title = 'Interview Preparation Kit']");
        let WarmUpChallengeElementPromise = gtab.waitForSelector("a[data-attr1 = 'warmup']",{ visible: true });
        let combinedPromise = Promise.all([interviewPrepKitPromise, gtab.waitForNavigation({waitUntil:"networkidle0" }), WarmUpChallengeElementPromise]);
        return combinedPromise;
    })
    .then(function () {
        console.log("Interview Prep Kit Page Opened And Warm up Challenge loaded");
        let warmUpChallengePromise = gtab.click("a[data-attr1 = 'warmup']");
        let sockMerchantPromise = gtab.waitForSelector("a[data-attr1 = 'sock-merchant']",{ visible: true });
        let combinedPromise = Promise.all([warmUpChallengePromise, gtab.waitForNavigation({waitUntil:"networkidle0" }), sockMerchantPromise]);
        return combinedPromise;
    })
    .then(function () {
        console.log("Warm-up Page Opened and Sock merchant loaded");
        let clickPromise = gtab.click("a[data-attr1 = 'sock-merchant']");
        let combinedPromise = Promise.all([clickPromise, gtab.waitForNavigation({waitUntil:"networkidle0" })]);
        return combinedPromise;
    })
    .catch(function (err) {
        console.log(err);
    })

console.log("After");