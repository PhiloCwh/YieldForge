// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface Ifactory {
    function createToken(
        address _user,
        string memory _name,
        string memory _simple,
        string memory _tokenUri
    ) external returns (address);
    function createStakingReward(
        address _stakingToken,
        address _rewardToken
    ) external returns (address);
}
