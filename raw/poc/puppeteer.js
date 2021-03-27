// npm install puppeteer
let puppeteer = require("puppeteer");
// browser launch
let browserWillBeLaunchedPromise = puppeteer.launch({
    headless: false
})
// callback hell
// browserWillBeLaunchedPromise
//     .then(function (browserInstance) {
//         // new tab
//         let newPagePromise = browserInstance.newPage();
//         newPagePromise
//             .then(function (newPage) {
//                 console.log("new page opened");
//                 // go to pepcoding
//                 let pageWillBeOpenedPromise = newPage.goto("https://www.pepcoding.com");
//                 pageWillBeOpenedPromise
//                     .then(function () {
//                         console.log("page is opened");
//                     })
//             })
//     })
browserWillBeLaunchedPromise
    .then(function (browserInstance) {
        // new tab
        let newPagePromise = browserInstance.newPage();
        return newPagePromise
    }).then(function (newPage) {
        console.log("new page opened");
        // go to pepcoding
        let pageWillBeOpenedPromise = newPage.goto("https://www.pepcoding.com");
        return pageWillBeOpenedPromise   
    }).then(function () {
        console.log("page is opened");
    }).catch(function (err){
        console.log(err);
    })