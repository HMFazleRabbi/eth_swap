const { assert } = require("chai");
const _deploy_contracts = require("../migrations/2_deploy_contracts");

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n){
    return web3.utils.toWei(n,'ether') ;
}
contract('EthSwap', ([deployer, investor]) => {
    let token, ethSwap;

    before (async () => {
        token=await Token.new();
        ethSwap=await EthSwap.new(token.address);
        await token.transfer(ethSwap.address, tokens('1000000'))
    });

    describe("Dex Token deployment", async ()=>{
        it ('contract has a name', async()=>{
            const name=await token.name();
            assert.equal(name, "Dex Token");

        })
    })

    describe("EthSwap deployment", async ()=>{
        it ('contract has a name', async()=>{
            const name=await ethSwap.name();
            assert.equal(name, "EthSwap");

        })

        it ('contract has token', async()=>{

            let balance=await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'));

        })
    })

    describe("Buy tokens", async ()=>{
        let result;
        before(async ()=>{
            result=await ethSwap.buyTokens({from : investor, value: web3.utils.toWei('1','ether')});
        });
        it ('Allows user to instantly purchase token for fixed price', async()=>{
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('100'));

            let ethSwapBalance = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), tokens('999900'));

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), tokens('1'));

            const event = result.logs[0].args
            //console.log(result.logs)
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), web3.utils.toWei('100','ether'));
            assert.equal(event.rate.toString(), "100");

        })
    })

})


