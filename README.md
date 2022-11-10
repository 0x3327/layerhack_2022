# LayerHack Submission - Account Abstraction Plugins

## What is AAP

Transaction executed through abstracted accounts are validated through a certain validation logic. This logic enables usages such as requiring multiple signatures for a transaction. However, this logic is stored on the deployed account smart contract and as such cannot be changed after the fact.

AAP enables customization of verification logic via plugins. This allows users to set up rules which their account has to abide by when executing transactions while being able to reconfigure them in the future. The process improves account security by restricting permissions certain keys have while remaining adaptable to the user's changing needs. 

Usage examples:
* Enforcing a spending limit based on the key used for the transaction (I can only spend XX on my mobile device, but I can spend XXX on my desktop device).
* Restricting interaction with a certain dApp to a specific key (only my PC can alter my DeSo profile)
* Defining session keys, which are allowed to initiate transactions for only a limited period of time.

## How does AAP work

### Plugins

We introduce a new smart contract interface `IPlugin` which contains a `isValid` function. This function receives a Transaction object and returns a boolean value indicating whether a transaction should be approved or rejected, based on the verification logic of the plugin. 

Plugins are deployed as separate contracts, accessible to anybody who wishes to implement them in their account.

### Account Modifications

We extended the Account Abstraction smart contract with an array of addresses called `activePlugins`. This array contains the addresses of plugins active on the given account.

A user can activate new plugins by adding to this array, or deactivate existing plugins by removing them. The functions to execute these functionalities are `activatePlugin` and `removePlugin` respectably. These functions can be called by a specified wallet `owner`, though this logic can be extended to require multiple signatures.

During the execution of the `verifyTransaction` function, the `isValid` function is called for each plugin active on that account. If all plugins return a true value, the transaction is considered allowed and it gets executed. If any plugin returns a false value the transaction will get rejected.


## Example - LimiterPlugin

We implemented a restriction that specifies how much value is a particular transaction allowed to have based on the signer of the transaction. This enables finer control over spending limits of certain keys a user has. For example, a specific wallet should not be allowed to spend more than 0.01 ETH in a single transaction. 



