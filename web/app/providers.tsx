'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { WagmiProvider, http } from "wagmi";
import { sepolia } from "wagmi/chains";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
    appName: "YieldForge",
    // Your dApps chains
    chains: [sepolia],
    transports: {
        //[bsc.id]: http(process.env.NEXT_PUBLIC_RPC_BSC)
        [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_SEPOLIA)
    },
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
});

const queryClient = new QueryClient();
export function Providers(props: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider locale="en" modalSize="compact">
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}