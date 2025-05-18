import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// tokenFarmer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const tokenFarmerAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_factory', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'description',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'image', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'website',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'githubRepository',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'twLink',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'idoAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'userMaxIdoAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'time',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DeployVault',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [
      { name: '_stakingToken', internalType: 'address', type: 'address' },
      { name: '_farmToken', internalType: 'address', type: 'address' },
      { name: '_farmTokenAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_farmDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createTokenFarmer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'searchPoolBystakingToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'stakingRewardList',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingRewardList1',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenCreator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenStakingAddrList',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vault', internalType: 'address', type: 'address' },
      { name: '_newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'transferStakingRewardOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_receiptor', internalType: 'address payable', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withDrawBnb',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_receiptor', internalType: 'address', type: 'address' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withDrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const tokenFarmerAddress = {
  11155111: '0x248BAD6F606a62F328855847c891C1c5b010e041',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const tokenFarmerConfig = {
  address: tokenFarmerAddress,
  abi: tokenFarmerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmer = /*#__PURE__*/ createUseReadContract({
  abi: tokenFarmerAbi,
  address: tokenFarmerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmerOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenFarmerAbi,
  address: tokenFarmerAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"searchPoolBystakingToken"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmerSearchPoolBystakingToken =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'searchPoolBystakingToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"stakingRewardList"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmerStakingRewardList =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'stakingRewardList',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"stakingRewardList1"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmerStakingRewardList1 =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'stakingRewardList1',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"tokenCreator"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmerTokenCreator =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'tokenCreator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"tokenStakingAddrList"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useReadTokenFarmerTokenStakingAddrList =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'tokenStakingAddrList',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenFarmerAbi,
  address: tokenFarmerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"createTokenFarmer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmerCreateTokenFarmer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'createTokenFarmer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmerRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmerTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"transferStakingRewardOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmerTransferStakingRewardOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'transferStakingRewardOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"withDrawBnb"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmerWithDrawBnb =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'withDrawBnb',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"withDrawERC20"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWriteTokenFarmerWithDrawErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'withDrawERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmer = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenFarmerAbi,
  address: tokenFarmerAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"createTokenFarmer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmerCreateTokenFarmer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'createTokenFarmer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmerRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmerTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"transferStakingRewardOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmerTransferStakingRewardOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'transferStakingRewardOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"withDrawBnb"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmerWithDrawBnb =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'withDrawBnb',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenFarmerAbi}__ and `functionName` set to `"withDrawERC20"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useSimulateTokenFarmerWithDrawErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    functionName: 'withDrawERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFarmerAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWatchTokenFarmerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFarmerAbi}__ and `eventName` set to `"DeployVault"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWatchTokenFarmerDeployVaultEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    eventName: 'DeployVault',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenFarmerAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x248BAD6F606a62F328855847c891C1c5b010e041)
 */
export const useWatchTokenFarmerOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenFarmerAbi,
    address: tokenFarmerAddress,
    eventName: 'OwnershipTransferred',
  })
