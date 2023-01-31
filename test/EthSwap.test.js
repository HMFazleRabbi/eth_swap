const { assert } = require("chai");
const _deploy_contracts = require("../migrations/2_deploy_contracts");

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contracts('EthSwap', (accounts) => {

    describe("EthSwap deployment", async ()=>{
        it ('contract has a name', async()=>{
            let ethSwap=await EthSwap.new();
            const name=await ethSwap.name();
            assert.equal(name, "EthSwap");

        })
    })
})


