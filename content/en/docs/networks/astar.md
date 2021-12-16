---
title: Astar
order: 15
hidden: false
featuredImage: /static/images/networks/banners/Astar.png
description: Support for the Astar network
---

![Astar banner](/static/images/networks/banners/Astar.png)

# Astar Network

## Introduction

[Astar Network](https://astar.network/) is a scalable and interoperable infrastructure for Web3.0. Since Astar Network is built with [Parity’s Substrate framework](https://substrate.io/), it can be a future [Polkadot](https://polkadot.network/) parachain that also acts as a scalable smart contract platform. The Polkadot Relaychain, by design, does not support smart contracts. This allows Astar the opportunity to fill in this gap. Scalability is obviously one of the most crucial demands dApp developers have. Ideally, the developers can build whatever applications on Astar Network without having to consider its scalability.

The [Astar Shiden](https://docs.astar.network/integration/network-details) network is built on the Kusama parent chain. 

### Quick facts

<TableWrap>

| Property              | Value                |
| --------------------- | -------------------- |
| Astar Shiden          | `336`         |
| Blockchain Explorer|https://blockscout.com/shiden/|
| Block time            | ~20 seconds           |


</TableWrap>


## Supported endpoints

<Aside>

All [**Class A**](https://www.covalenthq.com/docs/api/#tag--Class-A) endpoints are supported for the Astar Shiden network. You can query the network via the unified API by changing the `chainId`.

</Aside>

<Definitions>

- `api.covalenthq.com/v1/{chainId}/address/{address}/balances_v2/`

  - Get token balances for `address`. Return a list of all ERC20 and NFT token balances including ERC721 and ERC1155 along with their current spot prices.

- `api.covalenthq.com/v1/{chainId}/address/{address}/transactions_v2/`

  - Retrieve all transactions for `address` including their decoded log events. This endpoint does a deep-crawl of the blockchain to retrieve all kinds of transactions that references the address.

- `api.covalenthq.com/v1/{chainId}/address/{address}/transfers_v2/`

  - Get ERC20 token transfers for `address` along with historical token prices.

- `api.covalenthq.com/v1/{chainId}/tokens/{contract_address}/token_holders/`

  - Return a paginated list of token holders `contract_address` as of any historical block height.

- `api.covalenthq.com/v1/{chainId}/events/address/{contract_address}/`

  - Return a paginated list of decoded log events emitted by a particular smart contract.

- `api.covalenthq.com/v1/{chainId}/events/topics/{topic}/`
  - Return a paginated list of decoded log events with one or more topic hashes separated by a comma.

</Definitions>

<a target="_blank" class="Button Button-is-docs-primary" href="https://www.covalenthq.com/docs/api/">Go to Covalent's API Reference</a>

---

## Appendix

### Shiden token

The Shiden token `SDN` is the native token of the Astar Shiden network. This is similar to Ether in Ethereum. To interact with the Astar Shiden network, `SDN` tokens are required to pay gas fees. The Covalent API response returns `gas_*` fields in fiat units.