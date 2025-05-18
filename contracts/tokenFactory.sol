// SPDX-License-Identifier: MIT

//ETH
import "./standToken4.sol";
import "./stakingReward.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.17;

contract tokenFactory is Ownable {
    constructor() Ownable(msg.sender) {}

    uint constant ONE_ETH = 10 ** 18;

    function createToken(
        address _user,
        string memory _name,
        string memory _symbol,
        string memory _tokenUri
    ) public onlyOwner returns (address) {
        bytes32 _salt = keccak256(
            abi.encodePacked(_name, _symbol, _user, block.timestamp)
        );
        standToken tokenAddr = new standToken{salt: bytes32(_salt)}(
            _name,
            _symbol,
            _tokenUri,
            msg.sender
        );
        return address(tokenAddr);
    }

    function createStakingReward(
        address _stakingToken,
        address _rewardToken
    ) public onlyOwner returns (address) {
        bytes32 _salt = keccak256(
            abi.encodePacked(_stakingToken, _rewardToken, block.timestamp)
        );
        stakingRewards tokenAddr = new stakingRewards{salt: bytes32(_salt)}(
            _stakingToken,
            _rewardToken,
            msg.sender
        );
        return address(tokenAddr);
    }
}
