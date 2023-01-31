const { assert } = require("chai");
const _deploy_contracts = require("../migrations/2_deploy_contracts");

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap', (accounts) => {

    describe("Dex Token deployment", async ()=>{
        it ('contract has a name', async()=>{
            let token=await Token.new();
            const name=await token.name();
            assert.equal(name, "Dex Token");

        })
    })

    describe("EthSwap deployment", async ()=>{
        it ('contract has a name', async()=>{
            let ethSwap=await EthSwap.new();
            const name=await ethSwap.name();
            assert.equal(name, "EthSwap");

        })

        it ('contract has token', async()=>{
            let token=await Token.new();
            let ethSwap=await EthSwap.new();
            await token.transfer(ethSwap.address, '1000000000000000000000000')
            let balance=await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), "1000000000000000000000000");

        })
    })

})


