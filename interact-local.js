const { ethers } = require("ethers");
const { fs, readFileSync } = require("fs");

const PROVIDER_URL = "http://127.0.0.1:7545";
const MYADDR = "050F45B0Da5a1247D6E4C6DD4b597b2c065A572D";
const PRIVKEY = "45798d551f9f243d0ab959e2abcebbad3e15051b4d3ff1ba8ad663c3c2ec57cd";
const CONTRACT_ADDR = "5872c772Dd7018f673bb41865073eDe5702dd6a3";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVKEY, provider);
    const abi = readFileSync("./abi.json", "utf8"); // contract abi from etherscan: http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x293bed43c285506f9af05ecff03014164c439a28&format=raw
    const contract = new ethers.Contract(CONTRACT_ADDR, abi, wallet);

    // YOUR CODE GOES HERE
    //let yee = await contract._flagCaptured();
    let yee = await contract.initialize("what goes here?", {"from": MYADDR}) // idk what "initialize()" is sposed to be called with, but the only transaction in etherscan is "initialize()" so i called it
    console.log(yee)
}
// error catcher: prints either "Good" or "Bad: {error message}" after main() runs
main().then(value => console.log("\n\n Good"), wrong => console.log(`\n\n Bad: ${wrong}`));
