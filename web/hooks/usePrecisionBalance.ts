import { useEffect, useMemo, useState } from "react";
import { UseBalanceReturnType, useBalance } from "wagmi";

export type UseBalanceReturnDataWithFormattedPrecision =
  UseBalanceReturnType["data"] & {
    formattedPrecision: string;
  };

export const strWithPrecision = (str: string, precision: number = 0) => {
  const list = str.split(".");
  if (list[1] && precision !== 0) {
    return list[0].concat(".").concat(list[1].slice(0, precision));
  }
  return list[0];
};

export function usePrecisionBalance({
  address,
  token,
  precision = 4,
  enabled = true,
}: {
  address?: `0x${string}`;
  token?: `0x${string}`;
  precision?: number;
  enabled?: boolean;
}) {
  const [balance, setBalance] =
    useState<UseBalanceReturnDataWithFormattedPrecision>();

  const { data, refetch, isLoading } = useBalance({
    address,
    token,
    query: {
      enabled,
    },
  });

  const formattedPrecision = useMemo(() => {
    if (data && data.formatted) {
      const list = data.formatted.split(".");
      if (list[1]) {
        return list[0].concat(".").concat(list[1].slice(0, precision));
      }
      return list[0];
    }
    return "";
  }, [data, precision]);

  useEffect(() => {
    if (data) {
      setBalance({
        ...data,
        formattedPrecision,
      });
    }
  }, [data, formattedPrecision]);

  return { balance, isLoading, refetch };
}
