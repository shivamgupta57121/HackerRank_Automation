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
        let loginPageWillBeClickedPromise = gtab.click("button[type='submit']");
        return loginPageWillBeClickedPromise;
    })
    .then(function () {
        console.log("Login Done");
        
    })
    .catch(function (err) {
        console.log(err);
    })

console.log("After");