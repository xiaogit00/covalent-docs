---
title: Network Rewards

---
# Network Rewards

The Covalent Network will reward Network Operators who perform tasks for the network i.e. produce Block Specimens.

Rewards are based on a) contribution to the network and b) how much the respective Network Operator has staked.

When a Network Operator fulfils more network roles, further rewards are available to them.

## Bootstrapping the Network

The initial staking yield and network rewards are supplied through the Staking allocation (view [here](https://www.covalenthq.com/token/)) and this will be used to supplement network rewards for up to 4 years.

As time elapses, the staking contract will emit rewards based on a rate determined by the smart contract such that the proof-of-stake validation remains profitable. The reward emission rate is denominated in CQT per epoch (24 hours) which means the staking yield will change as the staked CQT changes. The CQT emission will be monitored and updated by the contract owner (Covalent) as the quantity of staked CQT grows such that a reasonable staking yield is maintained.

## Becoming Self-Sustainable

Ultimately, the aim is for the Covalent Network to become economically self-sustainable. As documented in *[CQT Operating on the Covalent Network](https://covalent-docs-git-network-docs-covalenthq.vercel.app/docs/network/covalent-query-token)*, users will eventually be paying Query Operators to query the Covalent API. Query Operators will then “pay into” a network fund (proportionate to the amount of data they’ve fetched from the network) that pays out in turn to the production operators (i.e. Block Specimen Producers) as network rewards.  

## Network Operator Reward Models

As further Operator roles are developed, the reward model will be displayed below.

### Block Specimen Producers

BSPs produce a good; the Block Specimen and are rewarded for doing so. In the long run, the price for this good will be determined by the free market; Query Operators being the primary purchaser. However, until then, Covalent will be the only buyer of the Block Specimen and therefore, setting the price a Block Specimen is worth.     

The BSP reward model plays out over the course of an epoch; every 24 hours. A set amount of CQT will be emitted per epoch (token_emission) from the Staking Contract Reward pool. This reward pool is filled using the Staking Allocation and maintained by the contract owner.

To determine the price of a Block Specimen, the number of Block Specimen Produced, as well as the number of BSPs, is considered. With that being said, the formulae are as follows:

`block_specimen_price = token_emission_rate * (operator_stake / total_stake) * (1 / blocks_per_epoch)`

`bsp_reward_per_epoch = block_specimen_price * num_specimens_produced`
