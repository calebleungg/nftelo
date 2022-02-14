pragma solidity ^0.8.4;

// 1. Rankings Contract
//  - collates all votes
//  - stores current elo

// 2. Votes Contract
//  - this will collate all addresses that make a vote
//  - and total pool value

// 3. Random Distributer Contract
//  - contain logic to send the pool to lucky winner, with votes being the entry.

contract Rankings {
  // an array of ipfs image urls
  // an array of elo rankings
  // relation as at index

  uint storedData;
  address myAddress = address(this);
  string[] dimsums = ["siu mai", "lo bak go", "har gao"];

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getMyAddress() public view returns (address) {
    return myAddress;
  }

  function getOtherStuff() public view returns (string[] memory) {
    return dimsums;
  }
}
