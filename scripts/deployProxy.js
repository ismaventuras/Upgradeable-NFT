const { ethers, upgrades } = require("hardhat");

// Constants for each contract deployment
const CONTRACT_NAME = "UpgradeableNFT" // Change this line if you changed the contract name on contracts/UpgradeableNFT.sol

async function main() {
    // get contract factory and deploy proxy
    const UpgradeableNFT = await ethers.getContractFactory(CONTRACT_NAME);
    console.log('deploying ', CONTRACT_NAME)
    const proxy = await upgrades.deployProxy(UpgradeableNFT, {kind : 'uups'}); // deploy the proxy
    await proxy.deployed();

    // print data
    let implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.address)
    console.log(CONTRACT_NAME,"(PROXY)  deployed to:", proxy.address);
    console.log("getImplementationAddress:",implementationAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });