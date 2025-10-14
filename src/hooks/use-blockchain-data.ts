
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const VSD_CONTRACT_ADDRESS = '0xA37CDC5CE42333A4F57776A4cD93f434E59AB243';

// Minimal ABI for ERC20 functions we need
const VSD_TOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
];

interface BlockchainData {
  totalSupply: string | null;
  name: string | null;
}

export function useBlockchainData() {
  const [data, setData] = useState<BlockchainData>({ totalSupply: null, name: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Use the default provider which is read-only and connects to mainnet
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        const contract = new ethers.Contract(VSD_CONTRACT_ADDRESS, VSD_TOKEN_ABI, provider);

        // Fetch data in parallel
        const [name, totalSupply, decimals] = await Promise.all([
          contract.name(),
          contract.totalSupply(),
          contract.decimals(),
        ]);

        // Format total supply using the contract's decimals
        const formattedTotalSupply = ethers.formatUnits(totalSupply, decimals);

        setData({ name, totalSupply: formattedTotalSupply });
      } catch (e: any) {
         console.error("useBlockchainData Error:", e);
         let errorMessage = "Could not connect to the blockchain. Ensure you have a wallet like MetaMask installed and are connected to the Ethereum Mainnet.";
         if (e.code === 'NETWORK_ERROR') {
            errorMessage = "Network error. Please check your internet connection or wallet's network settings.";
         } else if (e.code === 'CALL_EXCEPTION') {
            errorMessage = "Error calling the smart contract. It may not be deployed on the current network.";
         }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    if (typeof window.ethereum !== 'undefined') {
        fetchData();
    } else {
        setError("MetaMask or a compatible Ethereum wallet is not installed. Please install it to view live blockchain data.");
        setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}
