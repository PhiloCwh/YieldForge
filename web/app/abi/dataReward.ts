import { createUseReadContract } from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// dataReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x604E9C81f720e303a3bA0bd0735028a4EF23335d)
 */
export const dataRewardAbi = [
  {
    type: 'function',
    inputs: [{ name: '_vault', internalType: 'address', type: 'address' }],
    name: 'getStakingRewardsData',
    outputs: [
      { name: 'stakeTokenSymbol', internalType: 'string', type: 'string' },
      { name: 'farmTokenSymbol', internalType: 'string', type: 'string' },
      { name: 'stakeTokenSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'dailyRewards', internalType: 'uint256', type: 'uint256' },
      { name: 'starTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x604E9C81f720e303a3bA0bd0735028a4EF23335d)
 */
export const dataRewardAddress = {
  11155111: '0x604E9C81f720e303a3bA0bd0735028a4EF23335d',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x604E9C81f720e303a3bA0bd0735028a4EF23335d)
 */
export const dataRewardConfig = {
  address: dataRewardAddress,
  abi: dataRewardAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dataRewardAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x604E9C81f720e303a3bA0bd0735028a4EF23335d)
 */
export const useReadDataReward = /*#__PURE__*/ createUseReadContract({
  abi: dataRewardAbi,
  address: dataRewardAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link dataRewardAbi}__ and `functionName` set to `"getStakingRewardsData"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x604E9C81f720e303a3bA0bd0735028a4EF23335d)
 */
export const useReadDataRewardGetStakingRewardsData =
  /*#__PURE__*/ createUseReadContract({
    abi: dataRewardAbi,
    address: dataRewardAddress,
    functionName: 'getStakingRewardsData',
  })
