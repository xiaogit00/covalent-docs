---
title: Puzzle Paladin - Aave FlashLoans
order: 3
---

# Puzzle Paladin - Aave FlashLoans

This puzzle involved answering the following:

<Aside>

Tasks:

1. Revisit Ganesh & Alex's discussion last week on DeFi, Data & Risk and from the 15-minute mark, identify the event that is being referred to.

2. Identify the date this event took place in YYYY-MM-DD format

3. Determine the total number of Flash Loans that occurred that day on Aave Protocol V1. Convert this number to binary.

With the event date and binary number, find the secret room by constructing the URL using the following format:
```
https://dnd.covalenthq.com/{YYYY-MM-DD}-{binary}
```

</Aside>

The event referred to by Ganesh & Alex which occurred about a year ago is [*Black Thursday*](https://medium.com/aave/march-madness-events-integrations-hacks-and-black-thursday-79d4f39a55a0) which happened on March 12, 2020 or: `2020-03-12`. 

One can easily get the number of flash loans which occurred on that day using the Covalent API. At a high level, here is the process:

1. A `FlashLoan` event is emitted by the: `Aave: Lending Pool V1` contract. Hence we need to find that particular contract address.

2. Then find the `FlashLoan` event topic hash.

3. Use the Covalent API to fetch all `FlashLoan` events for Aave Protocol V1 on March 12, 2020.

&nbsp;
## Step 1: Find the Aave lending pool V1 contract address

This step can be done quickly. Go to [Etherscan](https://etherscan.io/) and search for `Aave: Lending Pool V1`. This gives the contract address: 
```
0x398eC7346DcD622eDc5ae82352F02bE94C62d119
```

&nbsp;
## Step 2: Find the `FlashLoan` event topic hash

This can be difficult but Covalent makes it easy by providing this [Topic Hash Calculator](https://www.covalenthq.com/docs/tools/topic-calculator).

Simply enter in the Aave Lending Pool contract address from Step 1 and get the following topic hash for the `FlashLoan(..)` event:
```
0x5b8f46461c1dd69fb968f1a003acee221ea3e19540e350233b612ddb43433b55
```

&nbsp;
## Step 3: Use the Covalent API to fetch `FlashLoan` events on March 12, 2020.

<Aside>

Using the Covalent API can begin as soon as you create an account, and requires two steps:

1. [Obtain your API key](https://www.covalenthq.com/platform/#/auth/register) so Covalent can authenticate your API requests

2. [Test your API key](https://www.covalenthq.com/docs/api/) directly from our docs to confirm your key is set up correctly

</Aside>

There are a many ways to identify the block height range around March 12, 2020. One way is to use the [GET a block](https://www.covalenthq.com/docs/api/#get-/v1/{chainId}/block_v2/{block_height}/) Covalent API endpoint, which gives the `signed_at` timestamp for a particular block height, by trying a few different block heights. We quickly find a `starting-block` of `9653275`, which has a timestamp of `2020-03-11T23:38:49Z`, and an `ending-block` of `9659867`, which has a timestamp of `2020-03-13T00:07:42Z`. 

We now use the Covalent API [GET log events by topic hash](https://www.covalenthq.com/docs/api/#get-/v1/{chainId}/events/topics/{topic}/) endpoint with the following parameters

<TableWrap>

|Parameter|Value|
|---|---|
|`chainId`|`1`|
|`topic`|`0x5b8f46461c1dd69fb968f1a003acee221ea3e19540e350233b612ddb43433b55`|
|`starting-block`|`9653275`|
|`ending-block`|`9659867`|
|`sender-address`|`0x398eC7346DcD622eDc5ae82352F02bE94C62d119`|
|`page-size`|`9999`| 
|`format`|`csv`|

</TableWrap>

The response looks something like:

```csv
block_signed_at,block_height,tx_offset,log_offset,tx_hash,_raw_log_topics_bytes,sender_address,sender_address_label,raw_log_data,raw_log_topics_0,raw_log_topics_1,raw_log_topics_2,decoded_name,decoded_signature,decoded_params_name,decoded_params_type,decoded_params_indexed,decoded_params_decoded,decoded_params_value
"2020-03-11T23:38:49Z",9653275,109,144,"0x8844e19bd29a5efbda8ddc6ec94c138f5ca9a21d1de3853635887c762d201aa2",,"0x398ec7346dcd622edc5ae82352f02be94c62d119",,"0x0000000000000000000000000000000000000000000000000dade648e0273d6c000000000000000000000000000000000000000000000000000326d670a30e5d0000000000000000000000000000000000000000000000000000f20d21ca844f000000000000000000000000000000000000000000000000000000005e697689",,,,"FlashLoan","FlashLoan(indexed address _target, indexed address _reserve, uint256 _amount, uint256 _totalFee, uint256 _protocolFee, uint256 _timestamp)","_target","address",true,true,"0xe5ef548019d63ba5f9e6d061f7c4bd8ec1ebbd77"
"2020-03-11T23:38:49Z",9653275,109,144,"0x8844e19bd29a5efbda8ddc6ec94c138f5ca9a21d1de3853635887c762d201aa2",,"0x398ec7346dcd622edc5ae82352f02be94c62d119",,"0x0000000000000000000000000000000000000000000000000dade648e0273d6c000000000000000000000000000000000000000000000000000326d670a30e5d0000000000000000000000000000000000000000000000000000f20d21ca844f000000000000000000000000000000000000000000000000000000005e697689",,,,"FlashLoan","FlashLoan(indexed address _target, indexed address _reserve, uint256 _amount, uint256 _totalFee, uint256 _protocolFee, uint256 _timestamp)","_reserve","address",true,true,"0x6b175474e89094c44da98b954eedeac495271d0f"
"2020-03-11T23:38:49Z",9653275,109,144,"0x8844e19bd29a5efbda8ddc6ec94c138f5ca9a21d1de3853635887c762d201aa2",,"0x398ec7346dcd622edc5ae82352f02be94c62d119",,"0x0000000000000000000000000000000000000000000000000dade648e0273d6c000000000000000000000000000000000000000000000000000326d670a30e5d0000000000000000000000000000000000000000000000000000f20d21ca844f000000000000000000000000000000000000000000000000000000005e697689",,,,"FlashLoan","FlashLoan(indexed address _target, indexed address _reserve, uint256 _amount, uint256 _totalFee, uint256 _protocolFee, uint256 _timestamp)","_amount","uint256",false,true,"985697094136708460"
"2020-03-11T23:38:49Z",9653275,109,144,"0x8844e19bd29a5efbda8ddc6ec94c138f5ca9a21d1de3853635887c762d201aa2",,"0x398ec7346dcd622edc5ae82352f02be94c62d119",,"0x0000000000000000000000000000000000000000000000000dade648e0273d6c000000000000000000000000000000000000000000000000000326d670a30e5d0000000000000000000000000000000000000000000000000000f20d21ca844f000000000000000000000000000000000000000000000000000000005e697689",,,,"FlashLoan","FlashLoan(indexed address _target, indexed address _reserve, uint256 _amount, uint256 _totalFee, uint256 _protocolFee, uint256 _timestamp)","_totalFee","uint256",false,true,"887127384723037"
.
.
.
```

Simply press the *Copy* button and paste the CSV contents directly into a Google Sheet or Excel Spreadsheet! Here is a copy of the [FlashLoan CSV data in a shared Google Sheet](https://docs.google.com/spreadsheets/d/1hE2Iw2SqTlVIi4stNYfZ552Ik7yFv6TP1rbNd90-qOE/edit?usp=sharing).

Doing a count of the number of `FlashLoan` events on March 12, 2020 gives us 132 flash loans. The binary value of 132 is: `10000100`


Hence the URL is:

<Aside>

https://dnd.covalenthq.com/2020-03-12-10000100

</Aside>














