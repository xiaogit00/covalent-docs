---
title: Network Rewards
description: Network Rewards
---
<div class="font-light font-sans text-4xl text-covalent-black pt-12 max-w-screen-md">
 Network Rewards
</div>

The Covalent Network will reward Operators who perform tasks for the network i.e. Block Specimen Producers.

Rewards are based on a) contribution to the Network and b) how much the respective Operator has staked.

When an Operator fulfils more network roles, more rewards are available to them.

## Bootstrapping the Network

The initial staking yield and network rewards are supplied through the Staking allocation (more info [here](https://www.covalenthq.com/token/)) and this will be used to supplement network rewards for up to 4 years.

As time elapses, the staking contract will emit rewards based on a rate determined by the smart contract such that the proof-of-stake validation remains profitable. The reward emission rate is denominated in CQT per epoch which means the staking yield will change as the staked CQT changes. The CQT emission will be monitored and updated by the contract owner as the quantity of staked CQT grows such that a reasonable staking yield is maintained.

## Becoming Self-Sustainable

Ultimately, the aim is for the Covalent Network to become economically self-sustainable. As documented in @CQT Operating on the Covalent Network, users will eventually be paying Query Operators to query the Covalent API. Query Operators will then “pay into” a network fund (proportionate to the amount they’ve fetched from the network) that pays out in turn to the production operators (i.e. Block Specimen Producers) as “network rewards”.  

## Network Operator Reward Models

As further Operator roles are developed, the reward model will be displayed below.

### Block Specimen Producers

BSPs produce a good; the Block Specimen and are rewarded for doing so. In the long run, the price for this good will be determined by the free market; Query Operators being the primary purchaser. However, until then, Covalent will be the only buyer of the Block Specimen and therefore, setting the price a BS is worth.     

The BSP reward model plays out over the course of an epoch; every 24 hours. A set amount of CQT will be emitted per epoch (token_emission) from the Staking Contract Reward pool. This reward pool is filled using the Staking Allocation and maintained by the contract owner.

To determine the price of a Block Specimen, the number of Block Specimen Produced, as well as the number of BSPs, is also considered. With that being said, the formulae are as follows:

`BlockSpecimen_price = token_emission * (operator_stake / total_stake) * (1 / blocks_per_epoch)`

`BSP_reward_per_epoch = BS_price * num_specimens_produced`
