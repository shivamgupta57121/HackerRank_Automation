let fs = require("fs").promises;
console.log("Before");
// callback code of aync converted to promise based code
// brute force
// cons -> need to attach cath for every then
// used only fs.readFile since we had taken promises in fs in line 1
// let frp = fs.readFile("../f1.txt");
// frp.then(cb);
// function cb(data) {
//     console.log("content -> " + data);
//     let f2rp = fs.readFile("../f2.txt");
//     f2rp.then(cb2);
// }
// function cb2(data) {
//     console.log("content -> " + data);
//     let f3rp = fs.readFile("../f3.txt");
//     f3rp.then(cb3);
// }
// function cb3(data) {
//     console.log("content -> " + data);
// }

// version 

let frp = fs.readFile("../f1.txt");
frp.then(cb).then(cb2).then(cb3).catch(function () {
    console.log("Inside Catch");
});
function cb(data) {
    console.log("content -> " + data);
    let f2rp = fs.readFile("../f21.txt");
    return f2rp;
}
function cb2(data) {
    console.log("content -> " + data);
    let f3rp = fs.readFile("../f3.txt");
    return f3rp;
}
function cb3(data) {
    console.log("content -> " + data);
}

// let frp = fs.readFile("../f1.txt");
// frp
//     .then(function (data) {
//         console.log("content -> " + data);
//         return fs.readFile("../f2.txt");
//     })
//     .then(function (data) {
//         console.log("content -> " + data);
//         return fs.readFile("../f3.txt");
//     })
//     .then(function (data) {
//         console.log("content -> " + data);
//     })
//     .catch(function (err) {
//         console.log("err -> " + err);
//     });

console.log("After");