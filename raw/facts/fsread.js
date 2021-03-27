let fs = require("fs");
console.log("before");
// calback is an older way to do async 
fs.readFile("f1.txt", function cb(err, data) {

    if ( err ) {
        console.log(err);
    } else {
        console.log("data -> " + data);
    }
})

// promise return inital state is always pending
let promise = fs.promises.readFile("f1.txt");
console.log("Initial state", promise);
console.log("After");

// setTimeout(function () {
//     console.log("final state", promise);
// },2000);

// consumer function it will be called when a promises is fullfilled
promise.then(function (data) {
    console.log(data);
})
// reject
promise.catch(function (err) {
    console.log("err", err);
})

console.log("Hello");