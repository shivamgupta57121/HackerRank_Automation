let fs = require("fs").promises;
let arr = ["../../f1.txt","../../f2.txt","../../f3.txt"];
console.log("Before");
// parallel read
for(let i = 0 ; i < arr.length ; i++){
    let frp = fs.readFile(arr[i]);
    frp.then(cb);
}
function cb(data){
    console.log("data ->" + data);
}
console.log("After");