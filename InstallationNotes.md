1. The smart contract code is compatible with node 19,5.0 and node 18.13.0 LTS
2. Bug: https://stackoverflow.com/questions/69665222/node-js-17-0-1-gatsby-error-digital-envelope-routinesunsupported-err-os See the solution here

        This issue comes with the new update of Node.js 17. In React you can change the script attribute in the package.json file to:
        "scripts": {
            "start": "react-scripts --openssl-legacy-provider start",
            "build": "react-scripts --openssl-legacy-provider build",
            "test": "react-scripts test",
            "eject": "react-scripts eject"
        }


Useful command list
- npm run start
- truffle migrate --reset
- token=await Token.deployed()
- balance=await token.balanceOf("0x9C93Ef05ca15087D95FB75Ab581230a902935C0B")
- balance.toString()
- const token = await Token.deployed()
- truffle test