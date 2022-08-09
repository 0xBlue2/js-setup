# js-setup
basic js for chall


## KNOWN ISSUES:
- `bytecode.bin` is has extra newline, making it 2 lines long
    - ethers will interpret that \n as a byte in bytecode, reports "Error: invalid bytecode"
    - solution: remove newline after cloning repo

## SETUP:
- _create package.json_
    - without it, npm tries to install packages to your home directory(~/node_modules) I think
    - __add pair of brackes('{}') to package.json__
    - linux: ``echo '{}' > package.json``
- _install npm and node_
  - `sudo apt install npm`
  - same for node
  - node runs .js files, npm lets you install ethers

- _install ethers(npm library)_
  - `npm install ethers` (makes `node_modules` dir to use ethers in that dir only)
  - __or__ `sudo npm install ethers -g` (idk how this works, but it makes ethers lib accessible from anywhere)

- _"install" ganache(mock blockchain gui)_
  - ganache sets up a test blockchain locally and gives you a nice gui to see it
  - dont really need to "install" for linux, its just a standalone appimage
  - __get from: [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/)__
  
- _optional: install vscode extension(not available in `code-oss` from kali, have to use propietary version from msft)_
  - [https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity)
  - sidenote: hardhat = eth development framework. but the same people also made this solidity syntax highlighter

## RUN:
Install ethers lib, run ganache, copy/paste pubkey & privkey of address you want to use into `deploy.js`, then:
```sh
node deploy.js
```

## FILES:
- `abi.json`
    - came from [https://ropsten.etherscan.io/address/0xb6514151340FF027469EAFcBB4c775C993A6Bdb0#code](https://ropsten.etherscan.io/address/0xb6514151340FF027469EAFcBB4c775C993A6Bdb0#code): "Contract ABI" => "Export ABI" => "Raw/Text Format"
- `bytecode.bin`
    - came from same link above^ : "Contract Creation Code"
-  `deploy.js`
    - deploys Totally-Secure-Dapp to ganache(ganache must already be running)
- `interact-local.js`
    - script to interact with local contract from `deploy.js`
- `Initializable.sol` and `TotallySecureDapp.sol`
    - arent needed to run js scripts or anything, but nice to reference
- `interact-remote.js`
    - script to interact with actual dapp from chall
