import {
  useReadContract,
} from "wagmi";
import { erc20Abi } from 'viem'

export function useAllowance(
  owner: `0x${string}` | undefined,
  spender: `0x${string}` | undefined,
  tokenAddress: `0x${string}` | undefined
) {
  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner!, spender!],
})
}

export function useDecimals(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });
}

export function useSymbol(tokenAddress: `0x${string}` | undefined) {
  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "symbol",
  });
}
