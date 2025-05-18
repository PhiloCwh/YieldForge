'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ 新的 hook
import { useState, useEffect } from 'react';
import styles from '../../styles/Nav.module.css';
import MobileMenu from './mobile-menu';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  const pathname = usePathname(); // ✅ 获取当前路径
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset <= 10);
    };
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const navItems = [
    { label: 'Opportunities', path: '/' },
    // { label: 'Dashboard', path: '/dashboard' },
    { label: 'Create Campaign', path: '/create' },
  ];

  return (
    <header className={`fixed w-full z-30 transition-all ${!top ? 'backdrop-blur-sm' : ''}`}>
      <div className={`max-w-8xl mx-auto px-5 pr-6 ${styles.banner}`}>
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Left: Nav */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex space-x-4">
              <img src="./images/logo1.jpg" alt="" width={'100px'} height={'80px'} />
              {navItems.map(({ label, path }) => {
                const isActive = pathname === path;
                return (
                  <Link key={path} href={path}>
                    <span
                      className={`relative cursor-pointer transition text-black hover:text-indigo-300 ${isActive ? 'font-semibold text-indigo-500' : ''
                        }`}
                    >
                      {label}
                      {isActive && (
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-400" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Wallet Connect */}
          <nav className="hidden md:flex items-center">
            <ul className="flex gap-4 items-center">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {!connected ? (
                        <button onClick={openConnectModal} type="button" className={styles.connectWalletBtn}>
                          Connect Wallet
                        </button>
                      ) : chain.unsupported ? (
                        <button onClick={openChainModal} type="button" className={`${styles.connectWalletBtn} ${styles.walletAdressBtn}`}>
                          Wrong network
                        </button>
                      ) : (
                        <div className="flex gap-3">
                          <button
                            onClick={openChainModal}
                            className={`${styles.connectWalletBtn} ${styles.walletAdressBtn}`}
                            type="button"
                          >
                            {account.displayBalance ? `(${account.displayBalance})` : '0.0 ETH'}
                          </button>
                          <button onClick={openAccountModal} type="button" className={styles.connectWalletBtn}>
                            {account.displayName}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </ul>
          </nav>

          {/* Mobile nav */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
