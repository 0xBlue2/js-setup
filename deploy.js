const { ethers } = require("ethers");
const { fs, readFileSync } = require("fs");

const PROVIDER_URL = "http://127.0.0.1:7545";
const MYADDR = "4d8E1055bdDBC41a92d08c9Ac35Bf2f6CEd03abE";
const PRIVKEY = "29c5989924422f010e102366202592968c4962f07a5b7ec89acbd3a91361881c";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const abi = readFileSync("./abi.json", "utf8"); // contract abi from etherscan: http://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0x293bed43c285506f9af05ecff03014164c439a28&format=raw
    const bin = readFileSync("./bytecode.bin", "utf8"); // from "contract creation code" from etherscan
    const wallet = new ethers.Wallet(PRIVKEY, provider);
    const contract = new ethers.ContractFactory(abi, bin, wallet);
    const deployed_contract = await contract.deploy();

    // YOUR CODE GOES HERE
    console.log(deployed_contract, "\n\n", deployed_contract.address);
}
// error catcher: prints either "Good" or "Bad: {error message}" after main() runs
main().then(value => console.log("\n\n Good"), wrong => console.log(`\n\n Bad: ${wrong}`));
