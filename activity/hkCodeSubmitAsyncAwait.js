let puppeteer = require("puppeteer");
let { email, password } = require("../secret");
let { codes } = require("./code");
console.log("Before");
(async function () {
    try{
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"] //"--incoignito"
        })
        let newTab = await browserInstance.newPage();
        await newTab.goto("https://www.hackerrank.com/auth/login");
        await newTab.type("#input-1", email, { delay: 200 });
        await newTab.type("#input-2", password, { delay: 200 });
        await newTab.click("button[data-analytics='LoginPassword']");
        await waitAndClick(".card-content h3[title = 'Interview Preparation Kit']", newTab);
        await waitAndClick("a[data-attr1 = 'warmup']", newTab);
        let url = newTab.url();
        for(let i = 0 ; i < codes.length ; i++){
            await questionSolver(url, codes[i].qName, codes[i].soln,newTab);
        }
    } catch (err) {
        console.log(err);
    } 
})();
async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    // not wait for this promise since we want calling function to await this promise
    let selectorClickPromise = newTab.click(selector);
    return selectorClickPromise;
}
async function questionSolver(modulepageUrl, questionName, code, gtab) {
        await gtab.goto(modulepageUrl);
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
        await gtab.evaluate(browserconsolerunFn, questionName);
        await waitAndClick(".custom-checkbox.inline", gtab);
        await gtab.type(".custominput", code);
        await gtab.keyboard.down("Control");
        await gtab.keyboard.press("A");
        await gtab.keyboard.press("X");
        await gtab.click(".monaco-editor.no-user-select.vs");
        await gtab.keyboard.press("A");
        await gtab.keyboard.press("V");
        await gtab.keyboard.up("Control");
        return gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");    
}

console.log("After");