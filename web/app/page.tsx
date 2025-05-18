"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation";
import { useReadTokenFarmerStakingRewardList1 } from "@/app/abi/tokenFarmer"
import { readContract } from '@wagmi/core'
import { config } from "@/app/providers"
import { dataRewardABI } from "@/app/abi/dataRewardABI"
import { formatUnits } from "viem";
import dayjs from 'dayjs'

interface tokenData {
  stakeTokenSymbol: string,
  farmTokenSymbol: string;
  tvl: bigint;
  rewards: bigint;
  startTime: bigint;
  endTime: bigint;
  address: `0x${string}`
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [tokenData, setTokenData] = useState<tokenData[]>([]);
  const [sortKey, setSortKey] = useState<keyof typeof tokenData[0]>("farmTokenSymbol")
  const [sortAsc, setSortAsc] = useState(true)

  const router = useRouter();

  const { data: stakeContractAddress } = useReadTokenFarmerStakingRewardList1();

  const fetchData = async (address: `0x${string}`) => {
    try {
      const data = await readContract(config,
        {
          address: "0x604E9C81f720e303a3bA0bd0735028a4EF23335d",
          abi: dataRewardABI,
          functionName: "getStakingRewardsData",
          args: [address]
        })

      return data
    } catch (error) {
      console.error(`Failed to fetch symbol for ${address}`, error)
      return ['', '', BigInt(0), BigInt(0), BigInt(0), '0x']
    }
  }

  useEffect(() => {
    if (stakeContractAddress) {
      const fetchSymbols = async () => {
        const results = await Promise.all(
          stakeContractAddress.map(async (addr) => {
            const symbol = await fetchData(addr as `0x${string}`)
            return { stakeTokenSymbol: symbol[0], farmTokenSymbol: symbol[1], tvl: symbol[2], rewards: symbol[3], startTime: symbol[4], endTime: symbol[5], address: addr } as tokenData
          })
        )
        setTokenData(results)
      }

      if (stakeContractAddress.length) fetchSymbols()
    }

  }, [stakeContractAddress])

  const handleSort = (key: keyof typeof tokenData[0]) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const filtered = tokenData
    .filter((d) => d.farmTokenSymbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

  return (
    <div className="bg-white p-6 rounded-xl text-black shadow border space-y-4">
      {/* 搜索框 */}
      <Input
        placeholder="Search Market Exposure..."
        className="bg-white border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 表格 */}
      <Table>
        <TableHeader className="bg-gray-100 text-gray-600">
          <TableRow>
            <TableHead
              className="px-4 cursor-pointer"
              onClick={() => handleSort("farmTokenSymbol")}
            >
              Market Exposure{" "}
              {/* {sortKey === "farmTokenSymbol" && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)} */}
            </TableHead>
            <TableHead
              className="text-right px-4 cursor-pointer"
              onClick={() => handleSort("tvl")}
            >
              TVL
              {sortKey === "tvl" && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
            </TableHead>
            <TableHead
              className="text-right px-4 cursor-pointer"
              onClick={() => handleSort("rewards")}
            >
              Daily Rewards{" "}
              {sortKey === "rewards" && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
            </TableHead>
            <TableHead
              className="text-right px-4 cursor-pointer"
              onClick={() => handleSort("startTime")}
            >
              Farm Duration{" "}
              {sortKey === "startTime" && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered && <>
            {filtered.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-gray-100 transition" onClick={() => router.push(`/token/${item.address}`)}>
                <TableCell className="flex items-center gap-3 px-4 py-2">
                  <img
                    src={`/tokens/${item.stakeTokenSymbol.toLowerCase()}.png`}
                    alt={item.stakeTokenSymbol}
                    className="w-6 h-6 rounded-full"
                  />
                  {item.stakeTokenSymbol}/{item.farmTokenSymbol}
                </TableCell>
                <TableCell className="text-right px-4">{formatUnits(item.tvl, 18)}  {item.stakeTokenSymbol}</TableCell>
                <TableCell className="text-right px-4">{(Number(formatUnits(item.rewards || BigInt(0), 18)) * 86400).toFixed(4)} {item.farmTokenSymbol}</TableCell>
                <TableCell className="text-right px-4">{dayjs.unix(Number(item.startTime)).format("YYYY-MM-DD HH:mm:ss")}-{dayjs.unix(Number(item.endTime)).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
              </TableRow>
            ))}</>}
        </TableBody>
      </Table>
    </div>
  )
}
