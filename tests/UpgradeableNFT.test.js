const { ethers, upgrades } = require("hardhat");
const assert = require('assert')

before('get factories', async () => {
    this.Contract = await ethers.getContractFactory('UpgradeableNFT')
    this.ContractV2 = await ethers.getContractFactory('UpgradeableNFT_V2')
})

it('deploys and name is UpgradeableNFT', async () => {
    const x = await upgrades.deployProxy(this.Contract, {kind:'uups'})

    assert(await x.name() === "UpgradeableNFT")
})
it('deploys and is upgraded to V2', async () => {
    const V1 = await upgrades.deployProxy(this.Contract, {kind:'uups'})
    const V2 = await upgrades.upgradeProxy(V1, this.ContractV2)

    assert(await V2.version() === "V2")
})