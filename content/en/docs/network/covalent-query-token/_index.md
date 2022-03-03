---
title: Covalent Query Token
description: Covalent Query Token
---

# Covalent Query Token

A critical component of the Covalent Network is CQT. CQT is the native token of the network wherein all settlements are denominated in this currency. CQT's functions can be broadly broken down into the following:

**Staking & Infrastructure**: Operators, who first have to meet the minimum staking requirement to become such, are compensated in CQT for honestly fulfilling their roles (or role), and performing work on the network like validating data requests, indexing blockchain data, and responding to queries. Furthermore, token holders who wish to contribute to securing the network but do not wish to run node infrastructure, can delegate to a validator and earn staking rewards in CQT.

**Governance:** Those who hold CQT and have a vested interest in the network will be able to vote using CQT for on-chain proposals put forward by the community.


**CQT** **Contract Address:** 0xd417144312dbf50465b1c641d016962017ef6240



## Using your CQT
- Link to staking
- Link to Goverance

## CQT Operting on the Covalent Network

CQT is not a payment token, rather a means of settlement (settlement will take place on MoonBeam). In the future, when an individual makes a call for the API, they will pay in a US denominated stablecoin such as USDC. The contract will then perform a market buy of CQT using this USDC, driving demand for the token. The CQT is then distributed to the wallets of nodes as a reward for answering the API query.

<img src="/static/static/images/network/cqtnetwork.jpg"></img>

- 1. The application/developer loads their deposit account with stablecoin assets into the network smart contract.
- 2. The application queries the Covalent API.
- 3. A check is made to verify that there are sufficient funds in the deposit account before sending the respective query request to operators.
- 4. The query is sent to the Query operator to fulfill the request.
- 5. The desired data is sent back to the application.
- 6. An entry is made on the Moonbeam ledger regarding the data that is being consumed, and which operator(s) are fulfilling the request and their cost.
- 7. The balances between the network contract, CQT and the work performed are reconciled.
- 8. The USD funds are drawn down from the developer's deposit account and swapped for CQT via a market buy mechanism and settled against a validator's outstanding balance.

The reason for implementing a stablecoin mechanism is that:

- Stablecoins are the most highly adopted tokens in the web3 ecosystem.
- Enterprise customers do not want to hold a token that is susceptible to volatility on their balance sheets.
- It makes measuring the expense of using the Covalent API easier to budget for users.

Nonetheless, demand for CQT is directly correlated with API Demand.

## Resources

Link to CQT audits
CQT Tokenomics page
