"use client";

import React, { ReactNode } from "react";
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig, Chain } from "wagmi";
import { sepolia, lineaTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ sepolia, lineaTestnet],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo} modalSize="compact"
            theme={darkTheme({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
