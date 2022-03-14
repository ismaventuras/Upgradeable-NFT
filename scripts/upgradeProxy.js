// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");
const {saveProgress} = require('../utils/saveProgress')

const CURRENT_PROXY_ADDRESS = "0x68E505a3AB5eD075cf6B0379Cb7222553508AFA2"
const CONTRACT_NAME = 'UpgradeableNFT_V3'

async function main() {
    // get the contract factory and apply the upgrade
  const UpgradedContract = await ethers.getContractFactory(CONTRACT_NAME);
  console.log('upgrading ', CONTRACT_NAME)
  // create the new implementation contract and change the proxy pointer
  const upgradedContract = await upgrades.upgradeProxy(CURRENT_PROXY_ADDRESS, UpgradedContract);

  // log deployment info
  console.log("Implementation upgraded: ", upgradedContract.address);
  let implementationAddress = await upgrades.erc1967.getImplementationAddress( upgradedContract.address)
  console.log("new implementation address: ", implementationAddress)

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});