// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface IstakingRewards {
    function setRewardsDuration(uint _duration) external;
    function notifyRewardAmount(uint _amount) external;
    function transferOwnerShip(address newOwner) external;
    function stakingToken() external view returns (address);
    function rewardsToken() external view returns (address);
    function finishAt() external view returns (uint256);
    function duration() external view returns (uint256);
    function totalSupply() external view returns (uint256);
    function rewardRate() external view returns (uint256);
}
