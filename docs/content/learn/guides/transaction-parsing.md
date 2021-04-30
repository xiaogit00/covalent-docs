---
title: Transaction Parsing
updated: 2021-04-30
type: "📝 Article"
order: 4
hidden: false
author: aurelienft
featuredImage: ./images/working-with-nfts.png
description: Learn how to parse transactions data of a native token of a blockchain from transactions events.
tags:
  - Class A
  - Intermediate
  - Transacation
  - Parsing
---

import EmbeddedREPL from "../../../components/embedded-repl.js";

# Transaction Parsing


## Learn to parse transaction from "Get transactions" endpoint

The transactions of ERC-20 tokens are well parsed by the "Get ERC20 token transfers" but the main tokens of a blockchain is not considered as ERC-20 tokens so the transactions are not parsed.

In this tutorial you will learn how to parse transactions that imply native token. We will use the Avalanche C-Chain chain but it works the same for others like Ethereum etc...

### Prerequisites

- Have a REPL account

## Step 1: Get the token address

The token have a contract address you can fetch it from the avalanche explorer: https://cchain.explorer.avax.network/address/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/transactions and get the contract address. For this tutorial we use AVAX address : `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`.

## Step 2: Filter transactions

Now we go though the real part ! We gonna start by filter transactions types.

There is 2 possible transactions patterns for swap.
- A transaction with a first log  `Swap`.
- A transaction with a first log `Withdrawal` and second log `Swap`

In the following REPL you have the call to fetch all transactions. Filter the transactions to display transactions separated by their Swap patterns.

Replace the three dots lines 12 and 14 to make the code pass the unit test.

Click on Play button to run tests to see if you did a great job.

<EmbeddedREPL address="https://replit.com/@AurelienFT/Test-embed?lite=true" />

Well played ! You have filtered the two patterns of swap !

### Step 3: Filter the transactions that match the token AVAX

Now we want to filter to get only the swaps that include AVAX tokens.

Edit the following code by replacing the three dots by the address of the AVAX token to return only transactions which includes AVAX:

<EmbeddedREPL address="https://replit.com/@AurelienFT/Second-Exercise-Transaction-Parsing?lite=true" />

Well played. Now we just have the AVAX transactions.

### Step 4: Get the amount of exchanged tokens

The price is in the `Swap` event. As we saw before, we have two patterns and the `Swap` log is not in the same position in the two patterns. To have the price we will use this formula :
`
t.log_events[{position_of_swap_log}].decoded.params[{position_of_price}].value / 10**token.contract_decimals
`

The `Swap` log have two pairs of parameters:
- `amount0In` (position 1 in array of parameters) / `amount1Out`(position 4 in array of parameters)
- `amount1In` (position 2 in array of parameters) /
`amount0Out` (position 3 in array of parameters)

In this REPL we have the last code and a new function that must return the prices. Complete the three dots in the follow code to make tests pass.

<EmbeddedREPL address="https://replit.com/@AurelienFT/Third-Exercice-Transaction-Parsing?lite=true" />

Tada ! Now you have the prices. You can also get the gas with the formula :
`
transaction.gas_spent*transaction.gas_price/10**18
`

I hope the tutorial was cool and you learned something ! If you have any feedback or you want help, go ask on Discord.