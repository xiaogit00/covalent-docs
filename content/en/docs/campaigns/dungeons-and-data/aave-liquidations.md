---
title: Puzzle Paladin - Aave Liquidations
order: 2
---

# Puzzle Paladin - Aave Liquidations

This puzzle involved answering the following:

<Aside>

Task 1:
Get the transaction hash of the LARGEST Aave Protocol V2 liquidation event (in $USD equivalent) since the launch of the V2 protocol until March 1, 2021 @ 0:00am UTC. Also note the token symbol for the liquidation event. You can use any publicly available tool to find this information.

With the transaction hash and token symbol, find the secret room by constructing the URL using the following format:

https://dnd.covalenthq.com/{token_symbol}-{transaction_hash}

</Aside>

While there are a few ways to go about finding the transaction hash, one common way approached by the community was to **manually scroll** through the list of liquidations presented here on [Aavewatch V2](https://v2.aavewatch.com/liquidations). We suppose they are lucky they didn't need to scroll too much to find the transaction!

Let us walk through the steps using the Covalent API. At a high level, here is the process:

1. A `Liquidation` event is emitted by the:  `Aave: Lending Pool V2` contract. Hence we need to find that contract address.

2. Find the `Liquidation` event topic hash.

3. Use the Covalent API to fetch all `Liquidation` events for Aave Protocol V2.

4. Map the `collateralAsset` of each `Liquidation` event to its corresponding token `symbol` and `decimal` parameters.

5. Find the spot price in USD for each `collateralAsset` on the day of the `Liquidation` event. We use the *CryptoSheets* add-on in Google sheets to do this easily.

6. Convert the `liquidatedCollateralAmount` value into its USD equivalent. 

7. Find the maximum converted `liquidatedCollateralAmount` and the corresponding transaction hash. 

&nbsp;
## Step 1: Find the Aave lending pool V2 contract address

This step can be done quickly. Go to [Etherscan](https://etherscan.io/) and search for `Aave: Lending Pool V2`. This gives the contract address: 
```
0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9
```

Also note when this contract was deployed, which was block `11362579`

&nbsp;
## Step 2: Find the `Liquidation` event topic hash

This can be difficult but Covalent makes it easy by providing this [Topic Hash Calculator](https://www.covalenthq.com/docs/tools/topic-calculator).

Simply enter in the Aave Lending Pool contract address from Step 1 and get the following topic hash for the `LiquidationCall(..)` event:
```
0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286
```

&nbsp;
## Step 3: Use the Covalent API to fetch `LiquidationCall` events

<Aside>

Using the Covalent API can begin as soon as you create an account, and requires two steps:

1. [Obtain your API key](https://www.covalenthq.com/platform/#/auth/register) so Covalent can authenticate your API requests

2. [Test your API key](https://www.covalenthq.com/docs/api/) directly from our docs to confirm your key is set up correctly

</Aside>


We now use the Covalent API [GET log events by topic hash](https://www.covalenthq.com/docs/api/#get-/v1/{chainId}/events/topics/{topic}/) endpoint with the following parameters

<TableWrap>

|Parameter|Value|
|---|---|
|`chainId`|`1`|
|`topic`|`0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286`|
|`starting-block`|`11362579`|
|`ending-block`|`latest`|
|`sender-address`|`0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9`|
|`page-size`|`9999`| 
|`format`|`csv`|

</TableWrap>

The response looks something like:

```csv
block_signed_at,block_height,tx_offset,log_offset,tx_hash,_raw_log_topics_bytes,sender_address,sender_address_label,raw_log_data,raw_log_topics_0,raw_log_topics_1,raw_log_topics_2,raw_log_topics_3,decoded_name,decoded_signature,decoded_params_name,decoded_params_type,decoded_params_indexed,decoded_params_decoded,decoded_params_value
"2020-12-17T14:19:27Z",11471171,28,56,"0x9ef1c383398cee036a85ca024db051b7a1c8bc692e703fe1b230da9e2305eb4a",,"0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9",,"0x0000000000000000000000000000000000000000000000000000000000012241000000000000000000000000000000000000000000000000f71a83c58b15b4eb0000000000000000000000007a512a3cf68df453ec76d487e3eaffecd74d68870000000000000000000000000000000000000000000000000000000000000000",,,,,"LiquidationCall","LiquidationCall(indexed address collateralAsset, indexed address debtAsset, indexed address user, uint256 debtToCover, uint256 liquidatedCollateralAmount, address liquidator, bool receiveAToken)","collateralAsset","address",true,true,"0x6b175474e89094c44da98b954eedeac495271d0f"
"2020-12-17T14:19:27Z",11471171,28,56,"0x9ef1c383398cee036a85ca024db051b7a1c8bc692e703fe1b230da9e2305eb4a",,"0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9",,"0x0000000000000000000000000000000000000000000000000000000000012241000000000000000000000000000000000000000000000000f71a83c58b15b4eb0000000000000000000000007a512a3cf68df453ec76d487e3eaffecd74d68870000000000000000000000000000000000000000000000000000000000000000",,,,,"LiquidationCall","LiquidationCall(indexed address collateralAsset, indexed address debtAsset, indexed address user, uint256 debtToCover, uint256 liquidatedCollateralAmount, address liquidator, bool receiveAToken)","debtAsset","address",true,true,"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
"2020-12-17T14:19:27Z",11471171,28,56,"0x9ef1c383398cee036a85ca024db051b7a1c8bc692e703fe1b230da9e2305eb4a",,"0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9",,"0x0000000000000000000000000000000000000000000000000000000000012241000000000000000000000000000000000000000000000000f71a83c58b15b4eb0000000000000000000000007a512a3cf68df453ec76d487e3eaffecd74d68870000000000000000000000000000000000000000000000000000000000000000",,,,,"LiquidationCall","LiquidationCall(indexed address collateralAsset, indexed address debtAsset, indexed address user, uint256 debtToCover, uint256 liquidatedCollateralAmount, address liquidator, bool receiveAToken)","user","address",true,true,"0xa53fe221bd861f75907d8fd496db1c70779721aa"
.
.
.
```

Simply press the *Copy* button and paste the CSV contents directly into a Google Sheet or Excel Spreadsheet! Here is a copy of the [Liquidation CSV data in a shared Google Sheet](https://docs.google.com/spreadsheets/d/1_WS_9PxyjH0KCzEJc_mazuQBGyeHUwpgEWVurwHBOJw/edit?usp=sharing).

&nbsp;
## Step 4: Get token mapping

The `decoded_params_value` column provides all the key data for the following parameters:
- `collateralAsset`
- `debtAsset`
- `user`
- `debtToCover`
- `liquidatedCollateralAmount`
- `liquidator`
- `receiveAToken`


The fields of interest for this task are:

- `collateralAsset`
- `liquidatedCollateralAmount`

The `collateralAsset` is provided as the ERC20 token's contract address which needs to be looked up to get the token `symbol`, `decimals` and historical `price` in USD. 

<Aside>

Realistically, one can just focus on the top 3 tokens on [*Aavewatch V2*](https://v2.aavewatch.com/liquidations) but here is a comprehensive [token mapping](https://docs.google.com/spreadsheets/d/1_WS_9PxyjH0KCzEJc_mazuQBGyeHUwpgEWVurwHBOJw/edit#gid=476149307) worksheet that can be used. 

</Aside>


&nbsp;
## Step 5: Find the USD price for each `collateralAsset` 

This is provided in the above worksheet but we use the [*CryptoSheets*](https://cryptosheets.com/) add-on in Google sheets to do this easily.

<Aside>

**Covalent is one of the data providers for *CryptoSheets***

</Aside>

To get the historical price of an asset, just use the formula:
```
=CSPRICE("ETH", "USD", "3/1/2021")
```

&nbsp;
## Step 6: Convert `liquidatedCollateralAmount` 

We then convert the `liquidatedCollateralAmount` value into its USD equivalent using the following formula:

```
liquidationValueUSD = liquidatedCollateralAmount / (10 ^ (decimals)) * (historical_price)
```

For example, if the `liquidatedCollateralAmount` is `17805688961227928811` and the token is `DAI`, which uses `18` decimal places, and has a value of `1.0028167` USD on say March 1, 2021, then the `liquidationValueUSD` is: `$17.86`. 

&nbsp;
## Step 7: Find maximum `liquidationValueUSD`

From the data in the previous step, simply use the `MAX()` function to get the maximum `liquidationValueUSD`, which was a Liquidation of `38,621.56753776622868845` LINK tokens on Aave Protocol V2 with a transaction hash of: `0x13645cedef3aa7f87484ff3d2827631bc469a39f932c51c1ad44931843e6595f`

Hence the URL is:

<Aside>

https://dnd.covalenthq.com/link-0x13645cedef3aa7f87484ff3d2827631bc469a39f932c51c1ad44931843e6595f

</Aside>














