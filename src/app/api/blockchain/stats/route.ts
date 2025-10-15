
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const VSD_CONTRACT_ADDRESS = '0xA37CDC5CE42333A4F57776A4cD93f434E59AB243';

// Minimal ABI for ERC20 functions we need
const VSD_TOKEN_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export async function GET() {
    const RPC_URL = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL;

    if (!RPC_URL) {
        console.error("Server configuration error: Missing Ethereum RPC URL.");
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    try {
        // Use a static provider for read-only access from the server
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        
        const contract = new ethers.Contract(VSD_CONTRACT_ADDRESS, VSD_TOKEN_ABI, provider);

        // Fetch data in parallel
        const [name, totalSupply, decimals] = await Promise.all([
          contract.name(),
          contract.totalSupply(),
          contract.decimals(),
        ]);

        // Format total supply using the contract's decimals
        const formattedTotalSupply = ethers.formatUnits(totalSupply, decimals);

        return NextResponse.json({ name, totalSupply: formattedTotalSupply });
    } catch (e: any) {
        console.error("Error fetching blockchain data from server:", e);
        let errorMessage = "Could not connect to the blockchain via the server-side provider.";
        if (e.code === 'NETWORK_ERROR') {
            errorMessage = "Network error on the server. Could not reach the Ethereum RPC endpoint.";
        } else if (e.code === 'CALL_EXCEPTION') {
            errorMessage = "Error calling the smart contract from the server. It may not be deployed on the configured network.";
        }
        return NextResponse.json({ error: errorMessage }, { status: 502 }); // 502 Bad Gateway
    }
}

// Add a dummy POST function to prevent 405 Method Not Allowed errors if the client sends a POST by mistake.
export async function POST() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
