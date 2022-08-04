const { ethers, BigNumber } = require("ethers");
const { fs, readFileSync } = require("fs");

const MYADDR = "BEEFBEEFBEEFBEEF...";
const PRIVKEY = "BEEFBEEFBEEFBEEF...";
const CONTRACT_ADDR = "b8E7c836f09B352A05C6c2C9DCAf82c5016518Cd";

async function printSlotContents(_provider, _address, _slot, _isArrayOffset) {
    if (_isArrayOffset) {
        let newslot = ethers.utils.solidityKeccak256(["uint"], [_slot]);
        await printSlotContents(_provider, _address, newslot, false);
        return 0;
    }
    let contents = await _provider.getStorageAt(_address, _slot);
    //contents = ethers.utils.hexStripZeros(contents);
    //console.log("Slot:\t\t\t\t\t\t\t\t    |  Contents:")
    console.log(`${_slot} --> ${contents}`);
    return 0;
}

async function main() {
    const provider = new ethers.providers.InfuraProvider("ropsten", "infurakeygoeshere");
    const wallet = new ethers.Wallet(PRIVKEY, provider);
    const abi = readFileSync("./abi.json", "utf8"); // contract abi from etherscan: http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x293bed43c285506f9af05ecff03014164c439a28&format=raw
    const contract = new ethers.Contract(CONTRACT_ADDR, abi, wallet);

    // YOUR CODE GOES HERE
    //let yee = await contract._flagCaptured();
    printSlotContents(provider, CONTRACT_ADDR, 6, _isArrayOffset=false);
}
// error catcher: prints either "Good" or "Bad: {error message}" after main() runs
main().then(value => console.log("\n\nGood"), wrong => console.log(`\n\n Bad: ${wrong}`));