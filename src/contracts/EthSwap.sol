pragma solidity ^0.5.0;
import './Token.sol';


contract EthSwap {
    string public name="EthSwap";
    Token public token;
    uint256 public rate = 100;
    event TokenPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        uint256 tokenAmt = msg.value * rate;
        require(token.balanceOf(address(this)) >=tokenAmt);
        token.transfer(msg.sender, tokenAmt);

        //Emit event
        emit TokenPurchased(msg.sender, address(token), tokenAmt, rate);
    }

    function sellToken(uint256 _amount){
        uint256 etherAmount = _amount /rate;
        msg.sender.transfer(etherAmount)
    }
}