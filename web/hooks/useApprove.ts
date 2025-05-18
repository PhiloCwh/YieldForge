import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useAllowance } from "./erc20";
import { useEffect } from "react";
import { erc20Abi } from "viem";

export const useTokenApprove = ({
  owner,
  spender,
  tokenAddress,
  amount,
  onSuccess,
}: {
  owner: `0x${string}`;
  spender: `0x${string}`;
  tokenAddress: `0x${string}`;
  amount: bigint;
  onSuccess: () => unknown;
}) => {
  const { data: allowance, refetch: refetchAllowance } = useAllowance(
    owner,
    spender,
    tokenAddress
  );

  const {
    writeContract,
    data: tx,
    isPending: approveLoading,
  } = useWriteContract();

  const { isLoading: approveWaiting, status: approveStatus } =
    useWaitForTransactionReceipt({
      hash: tx,
    });

  useEffect(() => {
    if (approveStatus === "success") {
      //toast.success("Approve Success");
      refetchAllowance();
      onSuccess();
    }
  }, [approveStatus, refetchAllowance, onSuccess]);

  return {
    allowance,
    approve: () => {
      return writeContract(
        {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "approve",
          args: [spender, amount],
        },
        {
          onSuccess,
        }
      );
    },
    isLoading: approveLoading || approveWaiting,
    refetch: refetchAllowance,
  };
};
