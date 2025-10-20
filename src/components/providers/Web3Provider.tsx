
'use client';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';
import { ReactNode } from 'react';

function getLibrary(provider: any): EthersWeb3Provider {
  const library = new EthersWeb3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
}
