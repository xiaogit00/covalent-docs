---
title: Querying Historical Aave Borrow rate with Primer
updated: 2021-05-27
type: "📝 Article"
order: 3
hidden: false
author: Dennis
description: Learn how to query historical aave borrow rate with primer
tags: 
  - Primer
  - MongoDB
---

import Prerequisites from "../../../components/prerequisites.js";

# Querying Historical Aave Borrow rate with Primer


## TLDR

<Aside>

In this guide, we want to get the historical borrow rates for `Aave v2 Markets` across 3 blockchains. We will use Primer's query parameters and also learn how to access array elements with Primer. 

</Aside>

## Primer URL Syntax

For reference, we will use the following top-level query parameters as shown below. The rest of the top-level query parameters are available [here](https://www.covalenthq.com/docs/learn/tutorials/query-with-primer-beg)

<TableWrap>

|Name|Description|
|---|---|
|match|Filters the records to pass only the documents that match the specified condition(s).|
|group|Groups input elements by the specified _id expression and for each distinct grouping, outputs an element. Grouping by _date_ operators is also possible.|

</TableWrap>

## Getting Started

### Side note

<Aside>

We can also change the blockchain ID and the contract address and get the historical borrow rates for any market on any blockchain.

</Aside>

<TableWrap>

|Blockchain ID|Chain Name|LendingPool|Contract Address|
|---|---|---|---|
|1|`Ethereum Mainnet`|Aave V2|0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9|
|137|`Matic Mainnet`|Aave V2|0x8dff5e27ea6b7ac08ebfdf9eb090f32ee9a30fcf|

</TableWrap>

### Get borrow rates for Aave v2 Markets
 
 We now use the Covalent API [GET log events by topic hash](https://www.covalenthq.com/docs/api/#get-/v1/{chainId}/events/topics/{topic}/) endpoint with the following parameters. Note that the Covalent API currently limits the block range between the `starting-block` and the `ending-block` to 1 million blocks. Hence, this data will need to be fetched in batches of 1 million blocks.

<TableWrap>

|Parameter|Description|Value|
|---|---|---|
|`chainId`|`Ethereum Mainnet`|`1`|
|`topic`|`Reserve Data Updated`|`0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a`|
|`starting-block`|`current Ethereum mainnet block height, as of 2021-06-01T17:31:52Z `|`12500000`|
|`ending-block`|`latest block height value`|`latest`|
|`sender-address`|`Aave v2 Lending Pool`|`0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9`|

</TableWrap>

From Etherscan, the current Ethereum mainnet block height, as of "2021-06-01T17:31:52Z" is 12551266. For the ending-block field, we can use the value latest to ensure we get data up to the latest block height.


After feeding the parameters, this is what the endpoint looks like [https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12500000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&key=ckey_abc](https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12500000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&key=ckey_abc). 

Our response from the Covalent API looks something like this (only first couple records shown):

```json
{
  "data": {
    "updated_at": "2021-06-01T22:32:08.245291190Z",
    "items": [
      {
        "block_signed_at": "2021-05-24T23:17:48Z",
        "block_height": 12500001,
        "tx_offset": 55,
        "log_offset": 133,
        "tx_hash": "0xfcc8ac1834c9d4072769e3000cf0b31e717a63c669826af4135504c83f8b8277",
        "_raw_log_topics_bytes": null,
        "raw_log_topics": [
          "0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a",
          "0x000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca"
        ],
        "sender_contract_decimals": null,
        "sender_name": null,
        "sender_contract_ticker_symbol": null,
        "sender_address": "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9",
        "sender_address_label": null,
        "sender_logo_url": null,
        "raw_log_data": "0x00000000000000000000000000000000000000000000013844fd4b40c1a8d37b00000000000000000000000000000000000000000019de33cc7328f9059c58f500000000000000000000000000000000000000000000bc9e60c033968220a4ab0000000000000000000000000000000000000000033b51940b994f792ebbc8f20000000000000000000000000000000000000000033c50a65d561d37d0015b59",
        "decoded": {
          "name": "ReserveDataUpdated",
          "signature": "ReserveDataUpdated(indexed address reserve, uint256 liquidityRate, uint256 stableBorrowRate, uint256 variableBorrowRate, uint256 liquidityIndex, uint256 variableBorrowIndex)",
          "params": [
            {
              "name": "reserve",
              "type": "address",
              "indexed": true,
              "decoded": true,
              "value": "0x514910771af9ca656af840dff83e8264ecf986ca"
            },
            {
              "name": "liquidityRate",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "5760355363302566056827"
            },
            {
              "name": "stableBorrowRate",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "31272466365674405857351925"
            },
            {
              "name": "variableBorrowRate",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "890726455972084100146347"
            },
            {
              "name": "liquidityIndex",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "1000166895460320265505589490"
            },
            {
              "name": "variableBorrowIndex",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "1001371436844653983133948761"
            }
          ]
        }
      },
      {
        "block_signed_at": "2021-05-24T23:17:48Z",
        "block_height": 12500001,
        "tx_offset": 64,
        "log_offset": 165,
        "tx_hash": "0x2fc4a7f8dbe03cfb961af4620739f041378d6fcf11c398f175bb95424c860680",
        "_raw_log_topics_bytes": null,
        "raw_log_topics": [
          "0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a",
          "0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7"
        ],
        "sender_contract_decimals": null,
        "sender_name": null,
        "sender_contract_ticker_symbol": null,
        "sender_address": "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9",
        "sender_address_label": null,
        "sender_logo_url": null,
        "raw_log_data": "0x000000000000000000000000000000000000000000190f9fe7097b6e9907283300000000000000000000000000000000000000000061e3a1357d6a1af16509850000000000000000000000000000000000000000001e579cb16aba901aca130a000000000000000000000000000000000000000003626e953454cc9db9e449450000000000000000000000000000000000000000037bf8cc52c4cad647ddf06e",
        "decoded": {
          "name": "ReserveDataUpdated",
          "signature": "ReserveDataUpdated(indexed address reserve, uint256 liquidityRate, uint256 stableBorrowRate, uint256 variableBorrowRate, uint256 liquidityIndex, uint256 variableBorrowIndex)",
          "params": [
            {
              "name": "reserve",
              "type": "address",
              "indexed": true,
              "decoded": true,
              "value": "0xdac17f958d2ee523a2206206994597c13d831ec7"
            },
            {
              "name": "liquidityRate",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "30296930667889706360318003"
            },
            {
              "name": "stableBorrowRate",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "118340755474379826698455429"
            },
            {
              "name": "variableBorrowRate",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "36681510948759653396910858"
            },
            {
              "name": "liquidityIndex",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "1047451972435115274808871237"
            },
            {
              "name": "variableBorrowIndex",
              "type": "uint256",
              "indexed": false,
              "decoded": true,
              "value": "1078327821264292131647647854"
            }
          ]
        }
      },
```

We will add Primer to the endpoint to filter out the response to get the historical borrow rates. Before we do that, there are some quick references to know.

<Aside>

Quick reference, these are the Primer's Aggregation that we will be using shown below 

</Aside>

<TableWrap>

|Name|Description|
|---|---|
|`$sum`|Sums all values with a specified value.|
|`$avg`|Averages all values with a specified value.|

</TableWrap>

<Aside>

Quick reference, these are the Primer's Date Aggregation (Available within `$group`) that we will be using shown below 

</Aside>

<TableWrap>

|Name|Description|
|---|---|
|`$year`|Returns the year portion of a date.|
|`$month`|Returns the month of a year as a number between 1 and 12.|
|`$dayOfMonth`|Returns the day of the month as a number between 1 and 31.|
|`$hourOfDay`|Returns the hour of a day as a number between 0 and 23.|
|`$minuteOfDay`|Returns the minute of a day as a number between 0 and 1439.|
|`$secondOfDay`|Returns the second of a day as a number between 0 and 86400.|

</TableWrap>

<Aside>

We want to look for the DAI stable coin in the reserve field.

DAI stable coin: `0x6b175474e89094c44da98b954eedeac495271d0f`

</Aside>


With all that in mind, let's add Primer to the endpoint

```json
---
header: Primer Query Parameters
---
// https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12500000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&primer=[{"$match":{"decoded.params.0.value":"0x6b175474e89094c44da98b954eedeac495271d0f"}},{"$group":{"_id":{"year":{"$year":"block_signed_at"},"month":{"$month":"block_signed_at"},"day":{"$dayOfMonth":"block_signed_at"},"hour":{"$hourOfDay":"block_signed_at"},"minuteOfDay":{"$minuteOfDay":"block_signed_at"},"secondOfDay":{"$secondOfDay":"block_signed_at"}},"count":{"$sum":1},"variable_borrow_rate":{"$avg":"decoded.params.3.value"}}}]&key=ckey_abc
[
   {
      "$match": {
         "decoded.params.0.value": "0x6b175474e89094c44da98b954eedeac495271d0f"
      }
   },
   {
      "$group": {
         "_id": {
            "year": {
               "$year": "block_signed_at"
            },
            "month": {
               "$month": "block_signed_at"
            },
            "day": {
               "$dayOfMonth": "block_signed_at"
            },
            "hour": {
               "$hourOfDay": "block_signed_at"
            },
            "minuteOfDay": {
               "$minuteOfDay": "block_signed_at"
            },
            "secondOfDay": {
               "$secondOfDay": "block_signed_at"
            }
         },
         "count": {
            "$sum": 1
         },
         "variable_borrow_rate": {
            "$avg": "decoded.params.3.value"
         }
      }
   }
]

```

## Understanding how Primer filters historical borrow rates for Aave Markets

Please reference this endpoint to understand what Primer is trying to filter for. [https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12500000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&key=ckey_abc](https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12500000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&key=ckey_abc)


Reference above, we want to filter out a reserve, in this case we have chosen `0x6b175474e89094c44da98b954eedeac495271d0f` which is a DAI stable coin. A reserve is the address of the underlying asset of the reserve.  

We can first use Primer's top-level query `$match` to get this specified reserve and use [dot notation](https://www.covalenthq.com/docs/learn/tutorials/query-with-primer-beg) to access the reserve field. 

We can do this by using `decoded.params.0.value` which accesses the value of the first param of the first decoded log event which is the reserve field. 

```json
{
    "$match": {
        "decoded.params.0.value": "0x6b175474e89094c44da98b954eedeac495271d0f"
    }
}
```

After, we can count how many times that data was updated at that particular reserve using Primer's Aggregation `$sum`. We can group it by year, month, day, hour, minutes and seconds using Primer's top-level query parameter `$group`. We will then compute the average from all values of the variable borrow rate corresponding to that particular reserve using Primer's Aggregation `$avg`.

```json
{
      "$group": {
         "_id": {
            "year": {
               "$year": "block_signed_at"
            },
            "month": {
               "$month": "block_signed_at"
            },
            "day": {
               "$dayOfMonth": "block_signed_at"
            },
            "hour": {
               "$hourOfDay": "block_signed_at"
            },
            "minuteOfDay": {
               "$minuteOfDay": "block_signed_at"
            },
            "secondOfDay": {
               "$secondOfDay": "block_signed_at"
            }
         },
         "count": {
            "$sum": 1
         },
         "variable_borrow_rate": {
            "$avg": "decoded.params.3.value"
         }
      }
   }
   
```

## Result from API Endpoint

There you have it! We have gotten the historical borrow rates for Aave Markets. This is the result after using Primer to filter out the API response.  

<Aside>

What is returned:

- DAI stable coin reserve is grouped together based on the signed time of the block.
- The `variable borrow rate` field is displaying the average variable borrow rate for the grouped reserve.
- The `count` field counts the number of DAI stable coin during that particular signed time of the block.

</Aside>

```json
// https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12500000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&primer=[{"$match":{"decoded.params.0.value":"0x6b175474e89094c44da98b954eedeac495271d0f"}},{"$group":{"_id":{"year":{"$year":"block_signed_at"},"month":{"$month":"block_signed_at"},"day":{"$dayOfMonth":"block_signed_at"},"hour":{"$hourOfDay":"block_signed_at"},"minuteOfDay":{"$minuteOfDay":"block_signed_at"},"secondOfDay":{"$secondOfDay":"block_signed_at"}},"count":{"$sum":1},"variable_borrow_rate":{"$avg":"decoded.params.3.value"}}}]&key=ckey_abc
{
  "data": {
    "updated_at": "2021-06-01T21:52:26.529672492Z",
    "items": [
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1398,
          "secondOfDay": 83906
        },
        "variable_borrow_rate": 3.879150133419968e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1401,
          "secondOfDay": 84096
        },
        "variable_borrow_rate": 3.8921211840774505e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1402,
          "secondOfDay": 84153
        },
        "variable_borrow_rate": 3.875405390666916e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1403,
          "secondOfDay": 84183
        },
        "variable_borrow_rate": 3.89186192070371e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1404,
          "secondOfDay": 84240
        },
        "variable_borrow_rate": 3.870630017747742e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1406,
          "secondOfDay": 84395
        },
        "variable_borrow_rate": 3.891768066862186e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1406,
          "secondOfDay": 84400
        },
        "variable_borrow_rate": 3.891767660584495e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1407,
          "secondOfDay": 84421
        },
        "variable_borrow_rate": 3.8644622176549773e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1408,
          "secondOfDay": 84532
        },
        "variable_borrow_rate": 3.864464148932104e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1409,
          "secondOfDay": 84551
        },
        "variable_borrow_rate": 3.89073400262501e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1410,
          "secondOfDay": 84634
        },
        "variable_borrow_rate": 3.8567451266008e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1412,
          "secondOfDay": 84741
        },
        "variable_borrow_rate": 3.889797797493098e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1413,
          "secondOfDay": 84821
        },
        "variable_borrow_rate": 3.890465019094867e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1417,
          "secondOfDay": 85043
        },
        "variable_borrow_rate": 3.891663579469018e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1418,
          "secondOfDay": 85101
        },
        "variable_borrow_rate": 3.89202722027799e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1418,
          "secondOfDay": 85138
        },
        "variable_borrow_rate": 3.8924686798359035e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1421,
          "secondOfDay": 85269
        },
        "variable_borrow_rate": 3.889814398520134e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1422,
          "secondOfDay": 85357
        },
        "variable_borrow_rate": 3.889840632923453e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1423,
          "secondOfDay": 85421
        },
        "variable_borrow_rate": 3.891392317124788e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1425,
          "secondOfDay": 85513
        },
        "variable_borrow_rate": 3.893492327861948e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 24,
          "hour": 23,
          "minuteOfDay": 1431,
          "secondOfDay": 85887
        },
        "variable_borrow_rate": 3.893492743911589e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 1,
          "secondOfDay": 110
        },
        "variable_borrow_rate": 3.893997895209308e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 3,
          "secondOfDay": 181
        },
        "variable_borrow_rate": 3.8940131079198475e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 10,
          "secondOfDay": 645
        },
        "variable_borrow_rate": 3.894797816503824e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 12,
          "secondOfDay": 757
        },
        "variable_borrow_rate": 3.89478390943628e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 19,
          "secondOfDay": 1176
        },
        "variable_borrow_rate": 3.895568847830933e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 22,
          "secondOfDay": 1320
        },
        "variable_borrow_rate": 3.8958213383170915e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 22,
          "secondOfDay": 1328
        },
        "variable_borrow_rate": 3.8966060457058414e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 24,
          "secondOfDay": 1449
        },
        "variable_borrow_rate": 3.897391092384924e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 25,
          "secondOfDay": 1537
        },
        "variable_borrow_rate": 3.898262780553528e+25,
        "count": 3.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 31,
          "secondOfDay": 1869
        },
        "variable_borrow_rate": 3.898241449878913e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 34,
          "secondOfDay": 2092
        },
        "variable_borrow_rate": 3.898257582468607e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 49,
          "secondOfDay": 2945
        },
        "variable_borrow_rate": 3.898038303797787e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 56,
          "secondOfDay": 3374
        },
        "variable_borrow_rate": 3.898048877136657e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 0,
          "minuteOfDay": 56,
          "secondOfDay": 3394
        },
        "variable_borrow_rate": 3.898063601267551e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 64,
          "secondOfDay": 3840
        },
        "variable_borrow_rate": 3.898056224608564e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 65,
          "secondOfDay": 3944
        },
        "variable_borrow_rate": 3.897856995880074e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 65,
          "secondOfDay": 3949
        },
        "variable_borrow_rate": 3.8973608033433715e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 68,
          "secondOfDay": 4088
        },
        "variable_borrow_rate": 3.897411436627493e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 73,
          "secondOfDay": 4397
        },
        "variable_borrow_rate": 3.89723864760894e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 76,
          "secondOfDay": 4601
        },
        "variable_borrow_rate": 3.897119884338404e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 78,
          "secondOfDay": 4694
        },
        "variable_borrow_rate": 3.896962627941463e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 81,
          "secondOfDay": 4916
        },
        "variable_borrow_rate": 3.8890088333921555e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 82,
          "secondOfDay": 4931
        },
        "variable_borrow_rate": 3.888983420682211e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 86,
          "secondOfDay": 5176
        },
        "variable_borrow_rate": 3.888809027657363e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 90,
          "secondOfDay": 5435
        },
        "variable_borrow_rate": 3.888746786065787e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 93,
          "secondOfDay": 5604
        },
        "variable_borrow_rate": 3.888745011788024e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 94,
          "secondOfDay": 5664
        },
        "variable_borrow_rate": 3.888639099470259e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 94,
          "secondOfDay": 5672
        },
        "variable_borrow_rate": 3.888740044679757e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 95,
          "secondOfDay": 5706
        },
        "variable_borrow_rate": 3.888563414921824e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 95,
          "secondOfDay": 5755
        },
        "variable_borrow_rate": 3.888542564704985e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 96,
          "secondOfDay": 5795
        },
        "variable_borrow_rate": 3.888290677583152e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 99,
          "secondOfDay": 5980
        },
        "variable_borrow_rate": 3.888044347260161e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 103,
          "secondOfDay": 6205
        },
        "variable_borrow_rate": 3.886760526020513e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 105,
          "secondOfDay": 6313
        },
        "variable_borrow_rate": 3.886572431761168e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 1,
          "minuteOfDay": 109,
          "secondOfDay": 6576
        },
        "variable_borrow_rate": 3.886079147683127e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 120,
          "secondOfDay": 7255
        },
        "variable_borrow_rate": 3.8859961146917245e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 134,
          "secondOfDay": 8065
        },
        "variable_borrow_rate": 3.885316168834514e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 138,
          "secondOfDay": 8310
        },
        "variable_borrow_rate": 3.88531644228531e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 138,
          "secondOfDay": 8313
        },
        "variable_borrow_rate": 3.8848486716963e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 140,
          "secondOfDay": 8458
        },
        "variable_borrow_rate": 3.88426261542778e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 142,
          "secondOfDay": 8577
        },
        "variable_borrow_rate": 3.883483795365911e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 143,
          "secondOfDay": 8596
        },
        "variable_borrow_rate": 3.883414200442297e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 144,
          "secondOfDay": 8674
        },
        "variable_borrow_rate": 3.883148258487292e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 145,
          "secondOfDay": 8732
        },
        "variable_borrow_rate": 3.883096985571517e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 149,
          "secondOfDay": 8985
        },
        "variable_borrow_rate": 3.883077096210029e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 150,
          "secondOfDay": 9019
        },
        "variable_borrow_rate": 3.882877754415074e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 150,
          "secondOfDay": 9026
        },
        "variable_borrow_rate": 3.8828342983879325e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 153,
          "secondOfDay": 9214
        },
        "variable_borrow_rate": 3.882815346022951e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 154,
          "secondOfDay": 9283
        },
        "variable_borrow_rate": 3.882805337639939e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 154,
          "secondOfDay": 9289
        },
        "variable_borrow_rate": 3.8828083699826605e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 159,
          "secondOfDay": 9593
        },
        "variable_borrow_rate": 3.882813752326817e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 162,
          "secondOfDay": 9755
        },
        "variable_borrow_rate": 3.882791235973704e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 166,
          "secondOfDay": 9976
        },
        "variable_borrow_rate": 3.882576072427745e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 167,
          "secondOfDay": 10035
        },
        "variable_borrow_rate": 3.8825683632385505e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 2,
          "minuteOfDay": 171,
          "secondOfDay": 10270
        },
        "variable_borrow_rate": 3.88255981244673e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 181,
          "secondOfDay": 10893
        },
        "variable_borrow_rate": 3.882346725106794e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 183,
          "secondOfDay": 10988
        },
        "variable_borrow_rate": 3.882342920249498e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 185,
          "secondOfDay": 11141
        },
        "variable_borrow_rate": 3.882202106086252e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 186,
          "secondOfDay": 11190
        },
        "variable_borrow_rate": 3.8820622783658446e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 186,
          "secondOfDay": 11198
        },
        "variable_borrow_rate": 3.882063799892603e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 195,
          "secondOfDay": 11714
        },
        "variable_borrow_rate": 3.881986046192135e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 197,
          "secondOfDay": 11838
        },
        "variable_borrow_rate": 3.881974676976748e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 201,
          "secondOfDay": 12088
        },
        "variable_borrow_rate": 3.8819654484734945e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 202,
          "secondOfDay": 12179
        },
        "variable_borrow_rate": 3.881810663042514e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 209,
          "secondOfDay": 12556
        },
        "variable_borrow_rate": 3.881791063629001e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 210,
          "secondOfDay": 12653
        },
        "variable_borrow_rate": 3.882043262480889e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 215,
          "secondOfDay": 12923
        },
        "variable_borrow_rate": 3.8825401523772294e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 3,
          "minuteOfDay": 227,
          "secondOfDay": 13672
        },
        "variable_borrow_rate": 3.8825488203000025e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 241,
          "secondOfDay": 14465
        },
        "variable_borrow_rate": 3.8825553064452225e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 251,
          "secondOfDay": 15061
        },
        "variable_borrow_rate": 3.882608590976547e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 252,
          "secondOfDay": 15146
        },
        "variable_borrow_rate": 3.88123950027034e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 254,
          "secondOfDay": 15254
        },
        "variable_borrow_rate": 3.881200492687993e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 255,
          "secondOfDay": 15331
        },
        "variable_borrow_rate": 3.881215700854468e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 269,
          "secondOfDay": 16181
        },
        "variable_borrow_rate": 3.881218112830658e+25,
        "count": 2.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 281,
          "secondOfDay": 16898
        },
        "variable_borrow_rate": 3.883568383403202e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 283,
          "secondOfDay": 17025
        },
        "variable_borrow_rate": 3.883565811014332e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 288,
          "secondOfDay": 17323
        },
        "variable_borrow_rate": 3.882736074142609e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 289,
          "secondOfDay": 17354
        },
        "variable_borrow_rate": 3.882745689821699e+25,
        "count": 1.0
      },
      {
        "id": {
          "year": 2021,
          "month": 5,
          "day": 25,
          "hour": 4,
          "minuteOfDay": 299,
          "secondOfDay": 17983
        },
        "variable_borrow_rate": 3.882757990629665e+25,
        "count": 1.0
      }
    ],
    "pagination": null
  },
  "error": false,
  "error_message": null,
  "error_code": null
}


```