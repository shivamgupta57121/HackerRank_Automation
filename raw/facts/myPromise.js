// cb -> promise
// node js -> fs.promises.readline
// resolve -> work complete
// reject -> work fail
let fs = require("fs");
function promisifiedReadFile(filePath){
    // pending state promise
    return new Promise( function ( resolve, reject ) {
        fs.readFile(filePath, function cb(err, data){
            if( err ) {
                // console.log(err);
                // reject -> work fail
                reject(err);

            } else {
                // console.log(data);
                // resolve -> work complete
                resolve(data);
            }
        });
    });
} 

// achieve-> user
let fReadPromise = promisifiedReadFile("f1.txt");
console.log(fReadPromise);
fReadPromise
    .then(function (data){
        console.log("Content -> " + data);
    })
fReadPromise
    .catch(function (err){
        console.log(err);
    })