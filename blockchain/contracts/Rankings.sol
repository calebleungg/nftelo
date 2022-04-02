pragma solidity ^0.8.4;

contract Rankings {
  // index memory will reference
  // the azuki number since they all share
  // the same image host
  uint256 maxAzukiCount = 10000;
  // ie. "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/[azuki_index].png"
  uint[10000] elo;
  uint[10000] votes;

  // function set(uint x) public {
  //   storedData = x;
  // }

  function getRankings() public view returns (uint[] memory) {
    for (uint i; i < maxAzukiCount; i++) {
    }

    return storedData;
  }

  // function getMyAddress() public view returns (address) {
  //   return myAddress;
  // }

  // function getOtherStuff() public view returns (string[] memory) {
  //   return dimsums;
  // }
}
