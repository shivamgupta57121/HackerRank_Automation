let fs = require("fs");
let frp = fs.promises.readFile("f1.txt");
console.log("Before");
let thenKP = frp.then(cb);
console.log("then ka promise", thenKP);
// cb behaves in a particular manner
function cb(data) {
    console.log("data " + data);
    return 10;
}

setTimeout(function () {
    console.log("then ka promise", thenKP);
},1000);

console.log("After");
console.log("````````````````````````````````");

// thenKP -> cb return value 
//     value -> value  
//     nothing -> undefined 
//     pending promise -> thenKP will wait for that pending promise
//     error -> then ka promise will get rejected 


// Link to read --- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
