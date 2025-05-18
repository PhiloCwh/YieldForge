import { getAddress } from "viem";

export const AddressZero = getAddress(
  "0x0000000000000000000000000000000000000000"
);

export const MaxUint256 = BigInt(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);

export const copyToClipboard = (textToCopy: string | number) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy.toString());
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy.toString();
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
};

export const shortenAddress = (address: `0x${string}`) => {
  if (!address) return ''; // 确保地址存在
  const start = address.slice(0, 4); // 前四位
  const end = address.slice(-4); // 后四位
  return `${start}...${end}`;
}

export const shortenTransaction = (address: `0x${string}`) => {
  if (!address) return ''; // 确保地址存在
  const start = address.slice(0, 12); // 前四位
  const end = address.slice(-2); // 后四位
  return `${start}...${end}`;
}

export const formatDuration = (timestamp: number) => {
  const time = Date.now() - (timestamp * 1000)
  const minutes = Math.floor(time / 60000); // 将时间戳转换为分钟
  const hours = Math.floor(minutes / 60); // 将分钟转换为小时
  const remainingMinutes = minutes % 60; // 剩下的分钟数

  if (hours > 0) {
    return `${hours} hours`;
  } else {
    return `${minutes}minutes ago`;
  }
}

export const getFutureTime = (seconds: bigint) => {
  const now = new Date();
  const future = new Date(now.getTime() + Number(seconds) * 1000);
  return future.toLocaleString();
}

export const WETHAddress = {
  8453: '0x4200000000000000000000000000000000000006',
  1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
} as const