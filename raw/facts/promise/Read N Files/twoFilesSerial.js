let fs = require("fs");
let frp = fs.promises.readFile("../../f1.txt");
console.log("Before");
let thenKP = frp.then(cb);
console.log("then ka promise" , thenKP)
function cb (data){
    console.log("data "+ data);
    return fs.promises.readFile("../../f2.txt");
}
thenKP.then(function (data){
    console.log("thenKPKiValue"+data);
})

console.log("After");
console.log("``````````````````````````````");
