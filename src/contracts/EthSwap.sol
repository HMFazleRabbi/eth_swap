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

    event TokenSold(
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

    function sellTokens(uint256 _amount) public {

        //User cant sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        uint256 etherAmount = _amount /rate;
        require(address(this).balance >= etherAmount);

        //Sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        emit TokenSold(msg.sender, address(token), _amount, rate);
    }
}