// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title VSDUtilityToken
 * @dev The official ERC20 token for the VSD Network.
 * Total supply is fixed at 1,000,000,000 tokens.
 */
contract VSDToken is ERC20 {
    /**
     * @dev Sets the values for {name} and {symbol}.
     * Mints the total supply of 1,000,000,000 tokens to the deployer.
     */
    constructor() ERC20("VSD Utility Token", "VSD") {
        // The total supply is 1,000,000,000 VSD.
        // Since ERC20 tokens typically have 18 decimals, we need to add 18 zeros.
        _mint(msg.sender, 1000000000 * 10**decimals());
    }
}
