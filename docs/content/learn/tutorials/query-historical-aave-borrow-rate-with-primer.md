---
title: Querying Historical Aave Borrow rate with Primer
updated: 2021-05-27
type: "📝 Article"
order: 3
hidden: false
author: gane5h
description: Learn how to query historical aave borrow rate with primer
tags: 
  - Primer
  - MongoDB
---

import Prerequisites from "../../../components/prerequisites.js";


# Querying Historical Aave Borrow rate with Primer


## TLDR

In this guide, we want to get the historical borrow rates for Aave Markets across 3 blockchains. We will use Primer's query parameters and also learn how to access array elements with Primer. 

## Primer URL Syntax

For reference, we have the following top-level query parameters.

<TableWrap>

|Name|Description|
|---|---|
|primer|Records enter a multi-stage pipeline that transforms the records into aggregated results. Supports `$group` and `Aggregation` operators.|
|match|Filters the records to pass only the documents that match the specified condition(s).|
|group|Groups input elements by the specified _id expression and for each distinct grouping, outputs an element. Grouping by _date_ operators is also possible.|
|sort|Sorts all input records and returns them in ascending or descending sorted order.|
|skip|Skips over the specified number of records|
|limit|Limits the number of records.|

</TableWrap>


We will be using this endpoint to help get the historical borrow rates for Aave Markets [https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12000000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9](https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12000000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9). 

This is the Log Events endpoint. We set `topic` to `0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a` (ReserveDataUpdated) and `sender-address` to `0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9` (Aave v2 Lending Pool).

`Reserve Data Updated` is an event in Aave that for everytime you borrow something or you lend something, Aave updates the reserve data and this updates the variable borrow rate. 


Now, let's add Primer to the endpoint `primer=[{"$match":{"decoded.params.0.value":"0x6b175474e89094c44da98b954eedeac495271d0f"}},{"$group":{"_id":{"year":{"$year":"block_signed_at"},"month":{"$month":"block_signed_at"},"day":{"$dayOfMonth":"block_signed_at"},"hour":{"$hourOfDay":"block_signed_at"},"minuteOfDay":{"$minuteOfDay":"block_signed_at"},"secondOfDay":{"$secondOfDay":"block_signed_at"}},"count":{"$sum":1},"variable_borrow_rate":{"$sum":"decoded.params.3.value"}}}]`

Here is a better look at the Primer Query.

```json
---
header: Primer Query Parameters
---
// https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12000000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9&primer=[{"$match":{"decoded.params.0.value":"0x6b175474e89094c44da98b954eedeac495271d0f"}},{"$group":{"_id":{"year":{"$year":"block_signed_at"},"month":{"$month":"block_signed_at"},"day":{"$dayOfMonth":"block_signed_at"},"hour":{"$hourOfDay":"block_signed_at"},"minuteOfDay":{"$minuteOfDay":"block_signed_at"},"secondOfDay":{"$secondOfDay":"block_signed_at"}},"count":{"$sum":1},"variable_borrow_rate":{"$sum":"decoded.params.3.value"}}}]
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
            "$sum": "decoded.params.3.value"
         }
      }
   }
]

```

## Understanding how Primer filters historical borrow rates for Aave Markets

Please reference this endpoint to understand what Primer is trying to filter for. [https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12000000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9](https://api.covalenthq.com/v1/1/events/topics/0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a/?starting-block=12000000&ending-block=latest&sender-address=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9)


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

After, we can count how many times that data was updated at that particular reserve. We can group it by year, month, day, hour, minutes and seconds using Primer's top-level query parameter `$group`. We will also add up all values of the variable borrow rate corresponding to that
particular reserve using Primer's Aggregation `$sum`.

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
            "$sum": "decoded.params.3.value"
         }
      }
   }
   
```

## Result from API Endpoint

There you have it! We have gotten the historical borrow rates for Aave Markets. This is the result after using Primer to filter out the API response. 

```json
{
    "data": {
        "updated_at": "2021-05-28T21:33:33.906752197Z",
        "items": [
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 20,
                    "minuteOfDay": 1234,
                    "secondOfDay": 74055
                },
                "variable_borrow_rate": 2.158009962204262E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 20,
                    "minuteOfDay": 1243,
                    "secondOfDay": 74605
                },
                "variable_borrow_rate": 1.0820422234275882E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 20,
                    "minuteOfDay": 1245,
                    "secondOfDay": 74700
                },
                "variable_borrow_rate": 1.0820409886447795E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 20,
                    "minuteOfDay": 1245,
                    "secondOfDay": 74744
                },
                "variable_borrow_rate": 1.0954082566326786E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 20,
                    "minuteOfDay": 1248,
                    "secondOfDay": 74937
                },
                "variable_borrow_rate": 1.2036366204162756E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 20,
                    "minuteOfDay": 1249,
                    "secondOfDay": 74979
                },
                "variable_borrow_rate": 1.2054411404828477E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1260,
                    "secondOfDay": 75617
                },
                "variable_borrow_rate": 1.2009633259852367E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1262,
                    "secondOfDay": 75770
                },
                "variable_borrow_rate": 1.200678140934975E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1263,
                    "secondOfDay": 75796
                },
                "variable_borrow_rate": 1.2024460134972007E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1265,
                    "secondOfDay": 75955
                },
                "variable_borrow_rate": 1.1943035994425013E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1274,
                    "secondOfDay": 76476
                },
                "variable_borrow_rate": 1.1917223745949032E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1276,
                    "secondOfDay": 76586
                },
                "variable_borrow_rate": 3.6243599371896806E26,
                "count": 3.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1280,
                    "secondOfDay": 76854
                },
                "variable_borrow_rate": 1.2656470297572567E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1292,
                    "secondOfDay": 77550
                },
                "variable_borrow_rate": 1.2669224171431682E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1300,
                    "secondOfDay": 78031
                },
                "variable_borrow_rate": 1.2669049046119315E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1303,
                    "secondOfDay": 78237
                },
                "variable_borrow_rate": 1.1709348013745061E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1305,
                    "secondOfDay": 78348
                },
                "variable_borrow_rate": 2.352544226236079E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1305,
                    "secondOfDay": 78352
                },
                "variable_borrow_rate": 1.1824694140310885E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1311,
                    "secondOfDay": 78694
                },
                "variable_borrow_rate": 1.196547095665139E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1316,
                    "secondOfDay": 78962
                },
                "variable_borrow_rate": 1.293804175405167E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1317,
                    "secondOfDay": 79027
                },
                "variable_borrow_rate": 1.3118456442936718E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1318,
                    "secondOfDay": 79091
                },
                "variable_borrow_rate": 1.3129292562733643E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1318,
                    "secondOfDay": 79103
                },
                "variable_borrow_rate": 1.3133918284188552E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 21,
                    "minuteOfDay": 1319,
                    "secondOfDay": 79151
                },
                "variable_borrow_rate": 1.390368980149442E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 22,
                    "minuteOfDay": 1324,
                    "secondOfDay": 79450
                },
                "variable_borrow_rate": 4.223144998985634E26,
                "count": 3.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 22,
                    "minuteOfDay": 1329,
                    "secondOfDay": 79780
                },
                "variable_borrow_rate": 1.408895175778959E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 22,
                    "minuteOfDay": 1340,
                    "secondOfDay": 80420
                },
                "variable_borrow_rate": 1.414322472898122E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 22,
                    "minuteOfDay": 1341,
                    "secondOfDay": 80494
                },
                "variable_borrow_rate": 1.4504249178963284E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 22,
                    "minuteOfDay": 1352,
                    "secondOfDay": 81158
                },
                "variable_borrow_rate": 1.4504108830372498E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 22,
                    "minuteOfDay": 1374,
                    "secondOfDay": 82450
                },
                "variable_borrow_rate": 1.4519302037818408E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1392,
                    "secondOfDay": 83573
                },
                "variable_borrow_rate": 1.4509576457547098E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1395,
                    "secondOfDay": 83729
                },
                "variable_borrow_rate": 1.4541375324806108E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1407,
                    "secondOfDay": 84447
                },
                "variable_borrow_rate": 1.7249100077613975E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1408,
                    "secondOfDay": 84493
                },
                "variable_borrow_rate": 1.8121443229231655E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1419,
                    "secondOfDay": 85151
                },
                "variable_borrow_rate": 1.8129045587024796E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1420,
                    "secondOfDay": 85241
                },
                "variable_borrow_rate": 1.813359086059331E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1421,
                    "secondOfDay": 85286
                },
                "variable_borrow_rate": 1.8846080202335345E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1422,
                    "secondOfDay": 85337
                },
                "variable_borrow_rate": 1.7889388764487506E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1424,
                    "secondOfDay": 85474
                },
                "variable_borrow_rate": 1.7895531629226688E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 8,
                    "hour": 23,
                    "minuteOfDay": 1430,
                    "secondOfDay": 85841
                },
                "variable_borrow_rate": 1.8082134581126752E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 15,
                    "secondOfDay": 950
                },
                "variable_borrow_rate": 1.815824713730388E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 16,
                    "secondOfDay": 997
                },
                "variable_borrow_rate": 1.8161877903003025E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 19,
                    "secondOfDay": 1182
                },
                "variable_borrow_rate": 3.6460506649100444E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 19,
                    "secondOfDay": 1196
                },
                "variable_borrow_rate": 1.8479078811540337E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 33,
                    "secondOfDay": 2015
                },
                "variable_borrow_rate": 1.9067284628981398E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 42,
                    "secondOfDay": 2530
                },
                "variable_borrow_rate": 1.9071017294672778E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 45,
                    "secondOfDay": 2739
                },
                "variable_borrow_rate": 1.907976824893557E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 0,
                    "minuteOfDay": 45,
                    "secondOfDay": 2740
                },
                "variable_borrow_rate": 1.9074309799249083E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 62,
                    "secondOfDay": 3745
                },
                "variable_borrow_rate": 1.9437369356934648E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 73,
                    "secondOfDay": 4429
                },
                "variable_borrow_rate": 1.9446096293948165E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 74,
                    "secondOfDay": 4451
                },
                "variable_borrow_rate": 1.941084269607254E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 81,
                    "secondOfDay": 4860
                },
                "variable_borrow_rate": 1.9456707804045257E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 81,
                    "secondOfDay": 4898
                },
                "variable_borrow_rate": 1.9723639379681404E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 83,
                    "secondOfDay": 5029
                },
                "variable_borrow_rate": 1.9814462021866712E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 87,
                    "secondOfDay": 5221
                },
                "variable_borrow_rate": 1.98471876502383E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 90,
                    "secondOfDay": 5418
                },
                "variable_borrow_rate": 1.985085961016023E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 1,
                    "minuteOfDay": 114,
                    "secondOfDay": 6868
                },
                "variable_borrow_rate": 1.9862138891875868E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 120,
                    "secondOfDay": 7202
                },
                "variable_borrow_rate": 2.0058105969770624E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 122,
                    "secondOfDay": 7327
                },
                "variable_borrow_rate": 2.0094472116542813E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 131,
                    "secondOfDay": 7879
                },
                "variable_borrow_rate": 2.0090296377664374E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 132,
                    "secondOfDay": 7938
                },
                "variable_borrow_rate": 4.016378620428013E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 137,
                    "secondOfDay": 8223
                },
                "variable_borrow_rate": 4.0278331896227716E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 145,
                    "secondOfDay": 8757
                },
                "variable_borrow_rate": 2.1257028971430435E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 152,
                    "secondOfDay": 9143
                },
                "variable_borrow_rate": 2.0104679953912996E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 171,
                    "secondOfDay": 10276
                },
                "variable_borrow_rate": 2.1321084114906065E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 173,
                    "secondOfDay": 10412
                },
                "variable_borrow_rate": 2.130578243200895E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 2,
                    "minuteOfDay": 176,
                    "secondOfDay": 10577
                },
                "variable_borrow_rate": 2.1129955447349472E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 182,
                    "secondOfDay": 10963
                },
                "variable_borrow_rate": 2.1170143805768094E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 185,
                    "secondOfDay": 11112
                },
                "variable_borrow_rate": 2.1169886515092764E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 191,
                    "secondOfDay": 11506
                },
                "variable_borrow_rate": 2.1443436283155744E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 198,
                    "secondOfDay": 11892
                },
                "variable_borrow_rate": 2.1644059391699037E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 200,
                    "secondOfDay": 12006
                },
                "variable_borrow_rate": 2.163416359771496E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 205,
                    "secondOfDay": 12312
                },
                "variable_borrow_rate": 2.1944157099184515E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 206,
                    "secondOfDay": 12409
                },
                "variable_borrow_rate": 2.1955115951496507E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 209,
                    "secondOfDay": 12597
                },
                "variable_borrow_rate": 2.194062528702377E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 223,
                    "secondOfDay": 13406
                },
                "variable_borrow_rate": 2.1955323020904235E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 229,
                    "secondOfDay": 13787
                },
                "variable_borrow_rate": 2.1956030098092215E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 3,
                    "minuteOfDay": 232,
                    "secondOfDay": 13920
                },
                "variable_borrow_rate": 2.1921913639114364E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 245,
                    "secondOfDay": 14727
                },
                "variable_borrow_rate": 2.1926409082315402E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 247,
                    "secondOfDay": 14878
                },
                "variable_borrow_rate": 2.18932350433816E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 256,
                    "secondOfDay": 15387
                },
                "variable_borrow_rate": 2.189303161499982E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 270,
                    "secondOfDay": 16256
                },
                "variable_borrow_rate": 2.189313474733808E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 272,
                    "secondOfDay": 16339
                },
                "variable_borrow_rate": 2.1855193572090467E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 274,
                    "secondOfDay": 16487
                },
                "variable_borrow_rate": 2.2717815492144793E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 284,
                    "secondOfDay": 17071
                },
                "variable_borrow_rate": 2.2845901719014968E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 292,
                    "secondOfDay": 17539
                },
                "variable_borrow_rate": 2.2695343205445663E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 293,
                    "secondOfDay": 17605
                },
                "variable_borrow_rate": 2.2563018014722338E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 4,
                    "minuteOfDay": 295,
                    "secondOfDay": 17755
                },
                "variable_borrow_rate": 2.6075336963199853E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 313,
                    "secondOfDay": 18802
                },
                "variable_borrow_rate": 5.213424418761858E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 323,
                    "secondOfDay": 19396
                },
                "variable_borrow_rate": 5.211335484892029E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 324,
                    "secondOfDay": 19445
                },
                "variable_borrow_rate": 2.6071985194586047E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 324,
                    "secondOfDay": 19454
                },
                "variable_borrow_rate": 2.603873153834684E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 327,
                    "secondOfDay": 19626
                },
                "variable_borrow_rate": 2.416059725478778E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 327,
                    "secondOfDay": 19635
                },
                "variable_borrow_rate": 2.4144937954455598E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 327,
                    "secondOfDay": 19636
                },
                "variable_borrow_rate": 2.4066569374888265E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 329,
                    "secondOfDay": 19746
                },
                "variable_borrow_rate": 2.4063798067279347E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 331,
                    "secondOfDay": 19906
                },
                "variable_borrow_rate": 4.811502533676487E26,
                "count": 2.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 335,
                    "secondOfDay": 20147
                },
                "variable_borrow_rate": 2.1141513783702018E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 336,
                    "secondOfDay": 20183
                },
                "variable_borrow_rate": 2.1143340505737066E26,
                "count": 1.0
            },
            {
                "id": {
                    "year": 2021,
                    "month": 3,
                    "day": 9,
                    "hour": 5,
                    "minuteOfDay": 336,
                    "secondOfDay": 20213
                },
                "variable_borrow_rate": 2.1137695334484555E26,
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

