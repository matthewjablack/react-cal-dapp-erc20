import './ExampleCoin.sol';

pragma solidity ^0.4.21;

contract ERC20Swap {
  bytes32 public keyHash;
  uint public expiration;
  address public deployer;
  address public recipient;
  address public refund;
  address public tokenAddress;
  uint public value;
  
  ExampleCoin public token;

  constructor (uint _value, bytes32 _keyHash, uint _expiration, address _recipient, address _tokenAddress) public {
    keyHash = _keyHash;
    recipient = _recipient;
    expiration = _expiration;
    tokenAddress = _tokenAddress;
    value = _value;
    refund = msg.sender;
    token = ExampleCoin(_tokenAddress);
  }

  function fundsLocked () returns (bool) {
    return value >= token.balanceOf(address(this));
  }

  function claim (bytes32 secret) public {
    require(msg.sender == recipient);
    require(sha256(secret) == keyHash);
    uint256 b = token.balanceOf(address(this));
    token.transfer(msg.sender, value);
  }

  function expire () public {
    require(msg.sender == refund);
    require (now > expiration);
    uint256 b = token.balanceOf(address(this));
    token.transfer(deployer, b);
  }
}