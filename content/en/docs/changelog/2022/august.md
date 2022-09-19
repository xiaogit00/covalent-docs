---
title: August 2022
weight: -20
hidden: false
description: Godwoken added! Bug fixes. 
---
 
## 2022-08-31

### ADDED
- The **[Godwoken](https://www.covalenthq.com/docs/networks/godwoken/)** L2 network is now fully indexed! Godwoken runs on the Nervos blockchain. Users can query all on-chain data through our Class A endpoints. **Nervos Godwoken Mainnet chainID: 71402. Nervos Godwoken Testnet chainID: 71401.**
- We added a field to our [`Get token balances for address`](https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/1) endpoint to indicate whether or not a token is the native gas token of a blockchain. 


### BUG FIXES
- We fixed an issue where ERC721 Approval events were not being decoded in our [`Get a transaction`](https://www.covalenthq.com/docs/api/#/0/Get%20a%20transaction/USD/1) endpoint response. 

