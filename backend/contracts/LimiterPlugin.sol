//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/TransactionHelper.sol";
import "./interfaces/IPlugin.sol";

contract Plugin is IPlugin {
    using TransactionHelper for Transaction;

    struct Limit {
        address spender;
        uint256 amount;
    }

    mapping(address => Limit[]) public activeLimits;

    function isValid(Transaction calldata _tx)
        external
        view
        override
        returns (bool)
    {
        // Limit[] memory limits = activeLimits(address);
    }

    function addWallets(Limit[] calldata _newLimits) external {}

    function removeWallets(address[] calldata _wallets) external {}
}
