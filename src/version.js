var fs = require('fs');

const productVersion = require("../package.json").version;
let travisVersion;

console.log('@@',{fs})

// fs.readFile('travis_version',function(err, contents) {
//     console.log('@@travis version',{err,contents});
// })

export default {
    productVersion,
    travisVersion
};