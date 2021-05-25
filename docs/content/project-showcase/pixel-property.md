---
title: PixelProperty
order: 12
hidden: false
featuredImage: ../images/project-showcase/pixel-property.png
description: A fun and engaging app for artists and marketers to come together and enjoy.
---

![EthHole Banner](../images/project-showcase/pixel-property.png)

&nbsp;
# Pixel Property

### Website
https://www.youtube.com/watch?v=v_JpUJR7dlA

<Aside>

“Covalent API is very straight forward and easy to plug in with Axios!”

</Aside>

&nbsp;
### Use of Covalent API
The V1 of PixelProperty has been on mainnet since 2018. I wanted to make it cross-chain and remove my dependency on the Etheruem full node we were running. For historic data, the contract emits a SetColors event when drawing, and one of our features is creating a timelapse, so we need not the current canvas state, but the historic changes that lead to it. 

A SQLite3 database was created for saving events that have been requested (so we don't re-request the API), and it iterates through all the events propagated by the mainnet contract, and saves them into a local database which we can then extremely quickly query when needed.

This was then done for the testnets, storing into the same database, however with a extra "chainID" column now added. So we can aggregate together all the colour changes events from all chains to get the "real" aggregated story of the evolving canvas.

&nbsp;
### Event
The project was built at [#ETHGlobal - Scaling Ethereum](https://www.covalenthq.com/blog/scaling-ethereum-winners/)

&nbsp;
### Developers

- Carson Roscoe

