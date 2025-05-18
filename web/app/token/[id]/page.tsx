"use client";
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useAccount, useBalance, useWaitForTransactionReceipt } from 'wagmi'
import {
    useReadStakingRewardStakingToken,
    useReadStakingRewardRewardsToken,
    useReadStakingRewardRewardRate,
    useReadStakingRewardEarned
} from "@/app/abi/stakingReward"
import {
    useWriteStakingRewardStake,
    useSimulateStakingRewardStake,
    useWriteStakingRewardGetReward,
    useSimulateStakingRewardGetReward,
    useSimulateStakingRewardWithdraw,
    useWriteStakingRewardWithdraw,
    useReadStakingRewardBalanceOf
} from "@/app/abi/stakingReward"
import toast from "react-hot-toast";
import { formatUnits, parseUnits, ContractFunctionRevertedError } from "viem"
import { useTokenApprove } from "@/hooks/useApprove";
import { MaxUint256 } from "@/hooks/index"
import { Spinner } from "@/app/styles/global";

const assets = [
    {
        symbol: "USDC.e",
        apy: 54.33,
        deposit: 0.00,
        icon: "💵",
        position: 0.00,
        projected: 0.00,
    },
]

interface Props {
    params: {
        id: `0x${string}`;
    };
}

const TokenPage: React.FC<Props> = ({ params }) => {
    const { address: account } = useAccount();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(BigInt(0));
    const parsed = parseFloat('') || 0
    const [inputAmount, setInputAmount] = useState('')
    const [isInputError, setIsInputError] = useState(false)
    const [inputError, setInputError] = useState('')

    const [stakeAmount, setStakeAmount] = useState(BigInt(0));
    const [inputStakeAmount, setStakeInputAmount] = useState('')
    const [isStakeInputError, setIsStakeInputError] = useState(false)
    const [StakeInputError, setStakeInputError] = useState('')

    const { data: stakeTokenAddress } = useReadStakingRewardStakingToken({
        address: params.id
    });
    const { data: rewardTokenAddress } = useReadStakingRewardRewardsToken({
        address: params.id
    });
    const { data: dailyReward } = useReadStakingRewardRewardRate({
        address: params.id
    });
    const { data: stakeTokenBalance, refetch: refetchStakeTokenBalance } = useBalance({ token: stakeTokenAddress, address: account })
    const { data: rewardTokenBalance, refetch: refetchRewardTokenBalance } = useBalance({ token: rewardTokenAddress, address: account })


    const { data: stakeBalance, refetch: refetchStakeBalance } = useReadStakingRewardBalanceOf(
        {
            address: params.id,
            args: [account as `0x${string}`]
        }
    );

    const { data: earnedBalance, refetch: refetchEarnedBalance } = useReadStakingRewardEarned(
        {
            address: params.id,
            args: [account as `0x${string}`]
        }
    );

    useEffect(() => {
        if (stakeTokenAddress) {
            refetchStakeTokenBalance();
        }
    }, [stakeTokenAddress])

    useEffect(() => {
        if (rewardTokenAddress) {
            refetchRewardTokenBalance();
        }
    }, [rewardTokenAddress])

    useEffect(() => {
        if (!amount) {
            setInputError('Exceed limited')
            setIsInputError(true)
            return
        }
        if (!stakeBalance) {
            setInputError('Exceed limited')
            setIsInputError(true)
            return
        }

        if (amount && stakeBalance && parseUnits(inputAmount, 18) > stakeBalance) {
            setInputError('Exceed limited')
            setIsInputError(true)
            return
        }

        if (amount) {
            refetchWithdraw();
            setIsInputError(false)
            console.log(amount);
        }
    }, [amount])

    useEffect(() => {
        if (!stakeAmount) {
            setStakeInputError('Exceed limited')
            setIsStakeInputError(true)
            return
        }
        if (stakeAmount && !stakeTokenBalance?.value) {
            setStakeInputError('Insufficient Balance')
            setIsStakeInputError(true)
            return
        }

        if (stakeAmount && stakeTokenBalance?.value && stakeAmount > stakeTokenBalance?.value) {
            setStakeInputError('Insufficient Balance')
            setIsStakeInputError(true)
            return
        }

        if (stakeAmount) {
            refetchAllowance()
            refetchStake();
            setIsStakeInputError(false)
            console.log(stakeAmount);
        }
    }, [stakeAmount])
    //stake
    const {
        data: stakeConfig,
        error: stakeError,
        refetch: refetchStake,
    } = useSimulateStakingRewardStake(
        {
            address: params.id,
            args: [stakeAmount]
        }
    );

    const {
        writeContract: stake,
        data: stakeTx,
        isPending: stakeLoading,
    } = useWriteStakingRewardStake();

    const { isLoading: stakeWaiting, status: stakeWaitingStatus } = useWaitForTransactionReceipt({
        hash: stakeTx,
    });

    useEffect(() => {
        if (stakeWaiting || stakeLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [stakeWaiting, stakeLoading])

    useEffect(() => {
        if (stakeWaitingStatus === "success") {
            toast.success('Deposit Successfully!')
            refetchStakeBalance()
        }
    }, [stakeWaitingStatus])

    //withdraw
    const {
        data: withdrawConfig,
        error: withdrawError,
        refetch: refetchWithdraw,
    } = useSimulateStakingRewardWithdraw(
        {
            address: params.id,
            args: [amount]
        }
    );

    const {
        writeContract: withdraw,
        data: withdrawTx,
        isPending: withdrawLoading
    } = useWriteStakingRewardWithdraw();

    const { isLoading: withdrawWaiting, status: withdrawWaitingStatus } = useWaitForTransactionReceipt({
        hash: withdrawTx,
    });

    useEffect(() => {
        if (withdrawWaiting || withdrawLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [withdrawWaiting, withdrawLoading])

    useEffect(() => {
        if (withdrawWaitingStatus === "success") {
            toast.success('Withdraw Successfully!')

        }
    }, [withdrawWaitingStatus])

    //getReward
    const {
        data: getRewardConfig,
        error: claimError
    } = useSimulateStakingRewardGetReward(
        {
            address: params.id
        }
    );

    const {
        writeContract: getReward,
        data: getRewardTx,
        isPending: getRewardLoading,
    } = useWriteStakingRewardGetReward();

    const { isLoading: getRewardWaiting, status: getRewardWaitingStatus } = useWaitForTransactionReceipt({
        hash: getRewardTx,
    });

    useEffect(() => {
        if (getRewardWaiting || getRewardLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [getRewardWaiting, getRewardLoading])

    useEffect(() => {
        if (getRewardWaitingStatus === "success") {
            toast.success('Claim Successfully!')
            refetchEarnedBalance()
        }
    }, [getRewardWaitingStatus])

    const {
        approve,
        isLoading: isApproveLoading,
        allowance,
        refetch: refetchAllowance,
    } = useTokenApprove({
        owner: account as unknown as `0x${string}`,
        spender: params.id as unknown as `0x${string}`,
        tokenAddress: stakeTokenAddress as unknown as `0x${string}`,
        amount: MaxUint256,
        onSuccess: refetchStake,
    });

    const stakeButton = () => {

        if (stakeTokenBalance !== undefined && stakeTokenBalance.value < parseUnits(inputStakeAmount || '0', 18)) {
            return (
                <Button
                    className="w-full"
                    disabled
                >
                    Insufficient Balance
                </Button>
            );
        }

        if (allowance !== undefined && allowance < parseUnits(inputStakeAmount || '0', 18)) {
            return (
                <Button
                    className="w-full"
                    onClick={() => approve?.()}
                    disabled={isApproveLoading}
                >{isApproveLoading ? (
                    <div className="flex justify-center items-center"><Spinner /> Approving...</div>
                ) : (
                    <div>Approve</div>
                )}
                </Button>
            );
        }

        return (
            <Button
                disabled={loading || !stakeAmount || isStakeInputError || stakeLoading || stakeWaiting}
                className="w-full mt-2"
                onClick={() => { stake?.(stakeConfig!.request) }}
            >
                {loading ? (
                    <div className="flex justify-center items-center"><Spinner /> Staking...</div>
                ) : (
                    <div>{!stakeAmount ? "Enter an amount" : 'Stake'}</div>
                )}

            </Button>
        );
    };

    const onChange = (e: { target: { value: string; }; }) => {
        setAmount(parseUnits(e.target.value, 18))
        setInputAmount(e.target.value)
    }

    const stakeOnChange = (e: { target: { value: string; }; }) => {
        setStakeAmount(parseUnits(e.target.value, 18))
        setStakeInputAmount(e.target.value)
    }

    const setMaxAmount = () => {
        setAmount(stakeBalance || BigInt(0))
        setInputAmount(formatUnits(stakeBalance || BigInt(0), 18))
    }

    const setMaxStakeAmount = () => {
        setStakeAmount(stakeTokenBalance?.value || BigInt(0))
        setStakeInputAmount(stakeTokenBalance?.formatted || '0.00')
    }
    return (

        <div className="bg-white text-black p-4">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Deposits</h1>
                    <div className="text-4xl font-bold mt-2">{formatUnits(stakeBalance || BigInt(0), 18)} {stakeTokenBalance?.symbol}</div>
                    <div className="text-muted-foreground text-sm"> {(Number(formatUnits(dailyReward || BigInt(0), 18)) * 86400).toFixed(4)} {rewardTokenBalance?.symbol} Daily Reward</div>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <div className="text-right">
                            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-black">✨ {formatUnits(earnedBalance || BigInt(0), 18)} {rewardTokenBalance?.symbol}</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black rounded-xl max-w-md w-full p-6 border border-gray-200">
                        <DialogHeader>
                            <DialogTitle className="text-[20px] font-semibold">Claim Rewards</DialogTitle>
                            <DialogDescription className="text-sm text-gray-500 mt-1">
                                Claim rewards you earned by participating in eligible YieldForge campaigns.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="bg-gray-100 rounded-xl p-4 mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">

                                    <span className="text-sm text-gray-700">{rewardTokenBalance?.symbol}</span>
                                </div>
                                <span className="text-sm font-medium text-black"> {formatUnits(earnedBalance || BigInt(0), 18)}</span>
                            </div>
                            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between text-sm text-gray-500">
                                <span>Total Rewards</span>
                                <span>$0.00</span>
                            </div>
                        </div>
                        <Button
                            disabled={loading || getRewardLoading || getRewardWaiting}
                            className="w-full mt-2"
                            onClick={() => { getReward?.(getRewardConfig!.request) }}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center"><Spinner /> Claiming...</div>
                            ) : (
                                <div>Claim</div>
                            )}
                        </Button>
                        {(claimError && earnedBalance) && (
                            <div className="text-red-500 text-sm mt-1"  >
                                {(claimError as ContractFunctionRevertedError)?.shortMessage}
                            </div>
                        )}
                        <div className="text-center text-xs text-gray-400 mt-3">
                            Rewards update every hours.
                        </div>
                    </DialogContent>
                </Dialog>

            </div>

            <Card className="bg-gray-100 border-none mb-6">
                <CardContent className="p-4 flex items-center gap-3">
                    <div className="text-xl">✅</div>
                    <div>
                        <div className="font-semibold">Stake and earning</div>
                        <div className="text-sm text-muted-foreground">
                            Stake {stakeTokenBalance?.symbol} and earn {rewardTokenBalance?.symbol} rewards.
                        </div>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-lg font-semibold mb-3">Explore earning</h2>
            <div className="space-y-3">
                {assets.map((asset) => (
                    <Dialog key={asset.symbol}>
                        <DialogTrigger asChild>
                            <Card className="bg-gray-100 border-none cursor-pointer">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl">{asset.icon}</div>
                                        <div>
                                            <div className="text-base font-medium flex items-center gap-1">
                                                {asset.symbol}
                                                <Badge className="text-xs bg-blue-600 text-white">
                                                    {(Number(formatUnits(dailyReward || BigInt(0), 18)) * 86400).toFixed(4)} {rewardTokenBalance?.symbol} Daily Reward ✨
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                My Deposit: ${asset.deposit.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4" />
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-black">
                            <DialogHeader>
                                <DialogTitle className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{asset.icon}</div>
                                        <div>
                                            <div className="text-xl font-bold">{asset.symbol}</div>
                                            <div className="text-sm text-muted-foreground">by Re7 Labs</div>
                                        </div>
                                    </div>

                                </DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="supply" className="mt-4 space-y-4">
                                <TabsList className="grid grid-cols-2 bg-gray-200 text-black">
                                    <TabsTrigger value="supply" className="data-[state=active]:bg-white data-[state=active]:text-black">Supply</TabsTrigger>
                                    <TabsTrigger value="withdraw" className="data-[state=active]:bg-white data-[state=active]:text-black">Withdraw</TabsTrigger>
                                </TabsList>
                                <TabsContent value="supply">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-muted-foreground">Projected earnings / day</div>
                                            <div className="text-lg font-semibold">{(Number(formatUnits(dailyReward || BigInt(0), 18)) * 86400).toFixed(4)} {rewardTokenBalance?.symbol} ✨ ✅</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-muted-foreground">My Position</div>
                                            <div className="text-lg font-semibold">{formatUnits(stakeBalance || BigInt(0), 18)} </div>
                                        </div>
                                        <Card className="bg-gray-200 border-none space-y-2">
                                            <CardContent className="p-4 space-y-2">
                                                <div className="text-sm capitalize">supply {stakeTokenBalance?.symbol}</div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="0.00"
                                                        type="number"
                                                        value={inputStakeAmount}
                                                        onChange={stakeOnChange}
                                                        className="text-2xl font-semibold bg-gray-200 text-black"
                                                    />
                                                </div>
                                                {(isStakeInputError && stakeAmount) && (
                                                    <div className="text-red-500 text-sm mt-1" >
                                                        {StakeInputError}
                                                    </div>
                                                )}
                                                <div className="text-sm flex justify-between items-center">
                                                    <div>${parsed.toFixed(2)}</div>
                                                    <div>{stakeTokenBalance?.formatted} {stakeTokenBalance?.symbol}<Button variant="secondary" className="bg-gray-500 rounded-[25px] text-black text-xs h-7 px-3 ml-2 rounded-[25px]" onClick={setMaxStakeAmount}>Max</Button></div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div>My Position</div>
                                            <div>${asset.projected.toFixed(2)}</div>
                                        </div>
                                        {stakeButton()}
                                        {(stakeError && stakeAmount) && (
                                            <div className="text-red-500 text-sm mt-1"  >
                                                {(stakeError as ContractFunctionRevertedError)?.shortMessage}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="withdraw">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-muted-foreground">Projected earnings / day</div>
                                            <div className="text-lg font-semibold">{(Number(formatUnits(dailyReward || BigInt(0), 18)) * 86400).toFixed(4)} {rewardTokenBalance?.symbol} ✨ ✅</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-muted-foreground">My Position</div>
                                            <div className="text-lg font-semibold">{formatUnits(stakeBalance || BigInt(0), 18)}</div>
                                        </div>
                                        <Card className="bg-gray-200 border-none space-y-2">
                                            <CardContent className="p-4 space-y-2">
                                                <div className="text-sm capitalize">withdraw {stakeTokenBalance?.symbol}</div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="0.00"
                                                        type="number"
                                                        value={inputAmount}
                                                        onChange={onChange}
                                                        className="text-2xl font-semibold bg-gray-200 text-black"
                                                    />
                                                </div>
                                                {(isInputError && amount) && (
                                                    <div className="text-red-500 text-sm mt-1" >
                                                        {inputError}
                                                    </div>
                                                )}
                                                <div className="text-sm flex justify-between items-center">
                                                    <div>${parsed.toFixed(2)}</div>
                                                    <div>{formatUnits(stakeBalance || BigInt(0), 18)} {stakeTokenBalance?.symbol}<Button variant="secondary" className="bg-gray-500 rounded-[25px] text-black text-xs h-7 px-3 ml-2 rounded-[25px]" onClick={setMaxAmount}>Max</Button></div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div>My Position</div>
                                            <div>{formatUnits(stakeBalance || BigInt(0), 18)}</div>
                                        </div>

                                        <Button
                                            disabled={loading || !amount || isInputError || withdrawLoading || withdrawWaiting}
                                            className="w-full mt-2"
                                            onClick={() => { withdraw?.(withdrawConfig!.request) }}
                                        >
                                            {loading ? (
                                                <div className="flex justify-center items-center"><Spinner /> Receiving...</div>
                                            ) : (
                                                <div>{!amount ? "Enter an amount" : 'Withdraw'}</div>
                                            )}
                                        </Button>
                                        {(withdrawError && amount) && (
                                            <div className="text-red-500 text-sm mt-1"  >
                                                {(withdrawError as ContractFunctionRevertedError)?.shortMessage}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>

    )
}

export default TokenPage;