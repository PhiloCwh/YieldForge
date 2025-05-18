"use client";
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useWaitForTransactionReceipt } from "wagmi";
import {
    useWriteTokenFarmerCreateTokenFarmer,
    useSimulateTokenFarmerCreateTokenFarmer
} from "@/app/abi/tokenFarmer";
import { parseUnits, ContractFunctionRevertedError } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { injected } from "wagmi/connectors";
import toast from "react-hot-toast";
import { Spinner } from "@/app/styles/global";
import { useTokenApprove } from "@/hooks/useApprove";
import { MaxUint256 } from "@/hooks/index"
import { usePrecisionBalance } from "@/hooks/usePrecisionBalance"

const schema = z.object({
    stakingToken: z.string().min(1, "Required"),
    rewardToken: z.string().min(1, "Required"),
    rewardAmount: z.string().min(1, "Required"),
    duration: z.string().min(1, "Required")
});

type FormData = z.infer<typeof schema>;

export default function CreateTokenFarmerForm() {
    const { connect } = useConnect();
    const [loading, setLoading] = useState(false);
    const { openConnectModal } = useConnectModal();
    const router = useRouter();
    const { address: account, isConnected } = useAccount();

    const {
        register,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const stakingToken = watch("stakingToken");
    const rewardToken = watch("rewardToken");
    const rewardAmount = watch("rewardAmount");
    const duration = watch("duration");
    const durationInSeconds = Number(duration) * 86400;

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const { balance: farmTokenBanlance } = usePrecisionBalance({
        address: account,
        token: rewardToken as unknown as `0x${string}`
    });

    const ensureWalletConnected = () => {
        if (!isConnected) {
            connect({ connector: injected() });
        }
    };

    useEffect(() => {
        ensureWalletConnected();
    }, [isConnected]);

    const { data: createConfig, error: createError, refetch } = useSimulateTokenFarmerCreateTokenFarmer({
        args: [
            stakingToken as `0x${string}`,
            rewardToken as `0x${string}`,
            parseUnits(rewardAmount || '0', 18),
            BigInt(durationInSeconds || 0),
        ]
    });

    const {
        writeContract: create,
        data: tx,
        isPending: createLoading,
    } = useWriteTokenFarmerCreateTokenFarmer();

    const {
        data,
        isLoading: createWaiting,
        status: createWaitingStatus,
    } = useWaitForTransactionReceipt({
        hash: tx,
    });

    useEffect(() => {
        setLoading(createWaiting || createLoading);
    }, [createWaiting, createLoading]);

    useEffect(() => {
        if (createWaitingStatus === "success") {
            toast.success("Create Successfully!");
            console.log(data);

            router.push(`/`);
        }
    }, [createWaitingStatus]);

    const {
        approve,
        isLoading: isApproveLoading,
        allowance,
        refetch: refetchAllowance,
    } = useTokenApprove({
        owner: account as unknown as `0x${string}`,
        spender: '0x248BAD6F606a62F328855847c891C1c5b010e041' as unknown as `0x${string}`,
        tokenAddress: rewardToken as unknown as `0x${string}`,
        amount: MaxUint256,
        onSuccess: refetch,
    });

    useEffect(() => {
        if (stakingToken && rewardToken && rewardAmount && durationInSeconds > 0) {
            refetch()
            refetchAllowance()
        }
    }, [stakingToken, rewardToken, rewardAmount, durationInSeconds]);

    const createButton = () => {
        if (!mounted) {
            return <Button className="w-full" disabled>Loading...</Button>;
        }

        if (!account) {
            return (
                <Button className="w-full" onClick={openConnectModal}>
                    {loading ? (
                        <div className="flex"><Spinner /> Loading...</div>
                    ) : (
                        <div>Connect Wallet</div>
                    )}
                </Button>
            );
        }

        if (farmTokenBanlance !== undefined && farmTokenBanlance.value < parseUnits(rewardAmount || '0', 18)) {
            return (
                <Button
                    className="w-full"
                    disabled
                >
                    Insufficient Balance
                </Button>
            );
        }

        if (allowance !== undefined && allowance < parseUnits(rewardAmount || '0', 18)) {
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
                type="submit"
                className="w-full"
                disabled={createLoading || createWaiting || isSubmitting}
            >
                {loading ? (
                    <div className="flex justify-center items-center"><Spinner /> Creating...</div>
                ) : (
                    <div>Create</div>
                )}
            </Button>
        );
    };

    const onCheck = async () => {
        create(createConfig!.request);
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onCheck();
        }}>
            <Card className="max-w-xl mx-auto mt-10 p-6 shadow-lg">
                <CardContent className="space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Create Token Farmer</h2>
                    <div>
                        <Input
                            placeholder="Staking Token Address"
                            {...register("stakingToken")}
                            className={errors.stakingToken ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.stakingToken && (
                            <p className="text-red-500 text-sm mt-1">{errors.stakingToken.message}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            placeholder="Reward Token Address"
                            {...register("rewardToken")}
                            className={errors.rewardToken ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.rewardToken && (
                            <p className="text-red-500 text-sm mt-1">{errors.rewardToken.message}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="number"
                            placeholder="Reward Amount"
                            {...register("rewardAmount")}
                            className={errors.rewardAmount ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.rewardAmount && (
                            <p className="text-red-500 text-sm mt-1">{errors.rewardAmount.message}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="number"
                            placeholder="Duration day"
                            {...register("duration")}
                            className={errors.duration ? "border-red-500 focus:ring-red-500 mt-1" : "mt-1"}
                        />
                        {errors.duration && (
                            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                        )}
                    </div>
                    {createButton()}
                    {createError && (
                        <div className="text-[#f23645] text-xs my-2.5" >
                            {(createError as ContractFunctionRevertedError)?.shortMessage}
                        </div>
                    )}
                </CardContent>
            </Card>
        </form>
    );
}
