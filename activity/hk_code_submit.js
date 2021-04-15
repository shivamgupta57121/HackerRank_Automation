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
        let emailWillBeTypedPromise = gtab.type("#input-1", email, { delay: 200 });
        return emailWillBeTypedPromise;
    })
    .then(function () {
        let passwordWillBeTypedPromise = gtab.type("#input-2", password, { delay: 200 });
        return passwordWillBeTypedPromise;
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
        let fqsp = questionSolver(url, questionObj.qName, questionObj.soln);
        for(let i = 1 ; i < codes.length ; i++){
            fqsp = fqsp.then(function(){
                return questionSolver(url, codes[i].qName, codes[i].soln);
            })
        }
        return fqsp;
    })
    .then(function (){
        console.log("All questions submitted");
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
// question solver function
function questionSolver(modulepageUrl, questionName, code) {
    return new Promise(function (resolve, reject) {
        // page visit
        let reachedPageUrlPromise = gtab.goto(modulepageUrl);
        reachedPageUrlPromise
            .then(function () {
                //  page h4 -> mathcing h4 -> click
                // function will exceute inside the browser
                // questionName-> appear -> click
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
            })
            // Wait for any element on next page since checkbox with same class present on current page also
            // If will not use this current page checkbox will be checked and code will not work further  
            .then(function () {
                // checkbox click
                let nextPageReached = gtab.waitForSelector("div[data-attr2='Submissions']", { visible: true });
                return nextPageReached;
            })
            .then(function () {
                // checkbox click
                let inputWillBeClickedPromise = waitAndClick("input[type='checkbox']"); // prev class - .custom-checkbox.inline
                return inputWillBeClickedPromise;
            })
            .then(function () {
                // type
                let codeWillBeTypedPromise = gtab.type(".custominput", code);
                return codeWillBeTypedPromise;
            })
            .then(function () {
                // hold the control
                let controlWillBeHoldPromise = gtab.keyboard.down("Control");
                return controlWillBeHoldPromise;
            })
            .then(function () {
                // select all --- press a
                let selectAllPromise = gtab.keyboard.press("A");
                return selectAllPromise;
            })
            .then(function () {
                // cut --- press x
                let cutPromise = gtab.keyboard.press("X");
                return cutPromise;
            })
            .then(function () {
                // click in editor
                let editorWillBeClickedPromise = gtab.click(".monaco-editor.no-user-select.vs");
                return editorWillBeClickedPromise;
            })
            .then(function () {
                // select all --- press a
                let selectAllPromise = gtab.keyboard.press("A");
                return selectAllPromise;
            })
            .then(function () {
                // paste --- press x
                let pastePromise = gtab.keyboard.press("V");
                return pastePromise;
            })
            .then(function () {
                // release the control
                let controlWillBeReleasedPromise = gtab.keyboard.up("Control");
                return controlWillBeReleasedPromise;
            })
            .then(function () {
                let submitIsClickedPromise = gtab.click(".hr-monaco-submit");     // prev class - .pull-right.btn.btn-primary.hr-monaco-submit
                return submitIsClickedPromise;
            })
            .then(function () {
                resolve();
            })
            .catch(function () {
                reject(err);
            })
    })
}
// change settings function
function settingHandler() {
    return new Promise(function (resolve, reject) {

        // click on settings btn
        let settingClickPromise = waitAndClick("button[aria-label='Editor Settings']");
        settingClickPromise
            .then(function () {
                // click on disable
                let disableButtonClickPromise = waitAndClick("button[aria-label='Disable Autocomplete']");
                return disableButtonClickPromise;
            }).then(function () {
                // click on setting button btn
                let settingIsClickedpromise = gtab.click("button[aria-label='Editor Settings']");
                return settingIsClickedpromise;
            }).then(function () {
                resolve();
            }).catch(function () {
                reject(err);
            })
        // autocomplete -> wait ,click

    })
}
console.log("After");