
const productVersion = require("../package.json").version;
const exploreIsNative = false;  // false: webview version, true: native search version
const travisVersion='';         // this line is updated by .travis.yml, with sed command
const branchName='';            // this line is updated by .travis.yml, with sed command

let ui = '';
ui += `${exploreIsNative ? 'NX' : 'wvX'}`;

let tmpDebug = `${productVersion}`
if (travisVersion.length > 0)   tmpDebug += ` - ${travisVersion}`
if (branchName.length > 0)      tmpDebug += ` - ${branchName}`
tmpDebug += ` - ${ui}`

export const debugVersion = tmpDebug;
export const isNative = {
    explore:exploreIsNative
}; 
export default productVersion;
