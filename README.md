# Upgradable NFT

A NFT (ERC721) contract that can be upgraded using OpenZeppelin UUPS proxy pattern.

## Installation

```console
git clone https://github.com/ismaventuras/Upgradeable-NFT.git .
npm install
```

## Usage

- Change `secrets_sample.json` placeholders for your own information and rename the file to `secrets.json`

### Deploy

- Change the name and symbol for your NFT on `contracts/UpgradeableNFT.sol`

- Deploy the contract using hardhat and the script `scripts/deployProxy.js` , if you change the contract name you will need to change the `CONTRACT_NAME` variable inside `deployProxy.js`

```powershell
hardhatFolder> npx hardhat run .\scripts\deployProxy.js --network $network
```

- Verify the implementation address using hardhat verify

```powershell
hardhatFolder> npx hardhat verify --network mumbai $implementationAddress
```

- Verify the proxy on block explorer, go to the proxy address on block explorer, click on code, then on More Options and finally on "Is this a proxy?". It will open a new window, click on verify and you will be able to use the proxy via block explorer

![verify_proxy](/assets/etherscan.png)

### Upgrade

- Set the current proxy address on `CURRENT_PROXY_ADDRESS` variable and the upgraded contract name on `CONTRACT_NAME`

```powershell
hardhatFolder> npx hardhat run .\scripts\upgradeProxy.js --network mumbai
#NOTE: IF THIS COMMAND RETURNS THE PREVIOUS IMPLEMENTATION ADDRESS RUN IT AGAIN
```

- Verify the implementation address using hardhat verify

```powershell
hardhatFolder> npx hardhat verify --network mumbai $implementationAddress
```

- You don't need to verify proxy address again, block explorer will automatically show the updated version on the proxy.

## Tests

A test script testing the deployment and upgrade of the proxy under tests/UpgradeableNFT.test.js
```powershell
upgradeableNFT> npx hardhat test .\tests\UpgradeableNFT.test.js


  ✔ deploys and name is UpgradeableNFT (483ms)
  ✔ deploys and is upgraded to V2 (313ms)

  2 passing (2s)
```

## folder distribution

```console
UpgradeableNFT
│   README.md
│   secrets_sample.json
│   package.json
│   hardhat-config.js    
│
└───contracts
│   │   UpgradeableNFT.sol 
│   
└───scripts
│   │   deployProxy.js
│   │   upgradeProxy.js
│
└───tests
    │   UpgradeableNFT.test
```

## [How OpenZeppelin upgradeable plugins work](https://docs.openzeppelin.com/upgrades-plugins/1.x/)

TL;DR : Do NOT delete .openzeppelin folder

The plugins will keep track of all the implementation contracts you have deployed in an .openzeppelin folder in the project root, as well as the proxy admin. You will find one file per network there. It is advised that you commit to source control the files for all networks except the development ones (you may see them as .openzeppelin/unknown-*.json).

## LICENSE

MIT
