export const dataRewardABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_vault",
                "type": "address"
            }
        ],
        "name": "getStakingRewardsData",
        "outputs": [
            {
                "internalType": "string",
                "name": "stakeTokenSymbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "farmTokenSymbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "stakeTokenSupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "dailyRewards",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "starTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const