import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// stakingReward
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingRewardAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_stakingToken', internalType: 'address', type: 'address' },
      { name: '_rewardToken', internalType: 'address', type: 'address' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'payable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'burnBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'duration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'finishAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalanceOfContract',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'notifyRewardAmount',
    outputs: [],
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
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'realBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_stakingToken', internalType: 'address', type: 'address' },
      { name: '_rewardToken', internalType: 'address', type: 'address' },
    ],
    name: 'resetToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'rewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardsToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_duration', internalType: 'uint256', type: 'uint256' }],
    name: 'setRewardsDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stakeBurn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stakingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'updatedAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userRewardPerTokenPaid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_erc20', internalType: 'address', type: 'address' }],
    name: 'withdrawErc20Token',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawEth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__
 */
export const useReadStakingReward = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadStakingRewardBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"burnBalanceOf"`
 */
export const useReadStakingRewardBurnBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'burnBalanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"duration"`
 */
export const useReadStakingRewardDuration = /*#__PURE__*/ createUseReadContract(
  { abi: stakingRewardAbi, functionName: 'duration' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"earned"`
 */
export const useReadStakingRewardEarned = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardAbi,
  functionName: 'earned',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"finishAt"`
 */
export const useReadStakingRewardFinishAt = /*#__PURE__*/ createUseReadContract(
  { abi: stakingRewardAbi, functionName: 'finishAt' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"getBalanceOfContract"`
 */
export const useReadStakingRewardGetBalanceOfContract =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'getBalanceOfContract',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"lastTimeRewardApplicable"`
 */
export const useReadStakingRewardLastTimeRewardApplicable =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'lastTimeRewardApplicable',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingRewardOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"realBalanceOf"`
 */
export const useReadStakingRewardRealBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'realBalanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"rewardPerToken"`
 */
export const useReadStakingRewardRewardPerToken =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'rewardPerToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"rewardPerTokenStored"`
 */
export const useReadStakingRewardRewardPerTokenStored =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'rewardPerTokenStored',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"rewardRate"`
 */
export const useReadStakingRewardRewardRate =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'rewardRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"rewards"`
 */
export const useReadStakingRewardRewards = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardAbi,
  functionName: 'rewards',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"rewardsToken"`
 */
export const useReadStakingRewardRewardsToken =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'rewardsToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"stakingToken"`
 */
export const useReadStakingRewardStakingToken =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'stakingToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadStakingRewardTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"updatedAt"`
 */
export const useReadStakingRewardUpdatedAt =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'updatedAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"userRewardPerTokenPaid"`
 */
export const useReadStakingRewardUserRewardPerTokenPaid =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardAbi,
    functionName: 'userRewardPerTokenPaid',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__
 */
export const useWriteStakingReward = /*#__PURE__*/ createUseWriteContract({
  abi: stakingRewardAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"getReward"`
 */
export const useWriteStakingRewardGetReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'getReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 */
export const useWriteStakingRewardNotifyRewardAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'notifyRewardAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"resetToken"`
 */
export const useWriteStakingRewardResetToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'resetToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 */
export const useWriteStakingRewardSetRewardsDuration =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'setRewardsDuration',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"stake"`
 */
export const useWriteStakingRewardStake = /*#__PURE__*/ createUseWriteContract({
  abi: stakingRewardAbi,
  functionName: 'stake',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"stakeBurn"`
 */
export const useWriteStakingRewardStakeBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'stakeBurn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteStakingRewardWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdrawErc20Token"`
 */
export const useWriteStakingRewardWithdrawErc20Token =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'withdrawErc20Token',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdrawEth"`
 */
export const useWriteStakingRewardWithdrawEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'withdrawEth',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdrawRewardToken"`
 */
export const useWriteStakingRewardWithdrawRewardToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardAbi,
    functionName: 'withdrawRewardToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__
 */
export const useSimulateStakingReward = /*#__PURE__*/ createUseSimulateContract(
  { abi: stakingRewardAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"getReward"`
 */
export const useSimulateStakingRewardGetReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'getReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"notifyRewardAmount"`
 */
export const useSimulateStakingRewardNotifyRewardAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'notifyRewardAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"resetToken"`
 */
export const useSimulateStakingRewardResetToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'resetToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"setRewardsDuration"`
 */
export const useSimulateStakingRewardSetRewardsDuration =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'setRewardsDuration',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"stake"`
 */
export const useSimulateStakingRewardStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"stakeBurn"`
 */
export const useSimulateStakingRewardStakeBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'stakeBurn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateStakingRewardWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdrawErc20Token"`
 */
export const useSimulateStakingRewardWithdrawErc20Token =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'withdrawErc20Token',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdrawEth"`
 */
export const useSimulateStakingRewardWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'withdrawEth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardAbi}__ and `functionName` set to `"withdrawRewardToken"`
 */
export const useSimulateStakingRewardWithdrawRewardToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardAbi,
    functionName: 'withdrawRewardToken',
  })
