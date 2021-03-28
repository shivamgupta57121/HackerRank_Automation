let fs = require("fs");
console.log("Before");
let p1 = fs.promises.readFile("f1.txt");
let p2 = fs.promises.readFile("f2.txt");
let p3 = fs.promises.readFile("f3.txt");

let combinedPromise = Promise.all([p1,p2,p3]);
console.log(combinedPromise);
combinedPromise.then(function (combinedPromiseData) {
    for( let i = 0 ; i < combinedPromiseData.length ; i++){
        console.log("content -> " , combinedPromiseData[i]);
        console.log("content -> " + combinedPromiseData[i]);
    }
})

console.log("After")