---
title: Operator Reference
order: 1
---
# Primer Query Parameters

|Name|Description|
|---|---|
|primer|By using `$pipeline`, records enter a multi-stage pipeline that transforms the records into aggregated results. Supports `$group` and `Aggregation` operators.|
|match|Filters the records to pass only the documents that match the specified condition(s).|
|sort|Sorts all input records and returns them in acsending or decsending sorted order.|
|skip|Skips over the specified number of records|
|limit|Limits the number of records.|

Note: These are listed in order of precedence. Eg: If `primer={ ... }` and `match={ ... }` are used, `primer` is executed first. 

# Operator Reference

## Comparison
<TableWrap>

|Name|Description|
|---|---|
|$eq|Matches values that are equal to a specified value.|
|$ne|Matches values that are not equal to a specified value.|
|$gt|Matches values that are greater than a specified value.|
|$gte|Matches values that are greater than or equal to a specified value.
|$lt|Matches values that are less than a specified value.|
|$lte|Matches values that are less than or equal to a specified value.|
|$in|Matches any of the values specified in an array.|
|$nin|Matches none of the values specified in an array.|

</TableWrap>

## Logical

<TableWrap>

|Name|Description|
|---|---|
|$and|Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.|
|$not|Inverts the effect of a query expression and returns documents that do not match the query expression.|
|$nor|Joins query clauses with a logical NOR returns all documents that fail to match both clauses.|
|$or|Joins query clauses with a logical OR returns all documents that match the conditions of either clause.|


</TableWrap>

## Element

<TableWrap>

|Name|Description|
|---|---|
|$exists|Matches documents that have the specified field.|

</TableWrap>

<!-- ## Aggregation
<TableWrap>

|Name|Description|
|---|---|
|$sum|Sums all values with a specified value.|
|$avg|Averages all values with a specified value.|
|$max|Determines maximum of a specified value.|
|$min|Determines minimum of a specified value.|
</TableWrap> -->


## Projection
<TableWrap>

|Name|Description|
|---|---|
|$elemMatch|Projects the first element in an array that matches the specified $elemMatch condition.|
|$group|Groups input elements by the specified _id expression and for each distinct grouping, outputs an element.|
</TableWrap>

## Aggregation
|Name|Description|
|---|---|
|$match|Filters the records to pass only the documents that match the specified condition(s) to the next pipeline stage.|
|$limit|Limits the number of records passed to the next stage in the pipeline.|
|$skip|Skips over the specified number of records and passes the remaining records to the next stage in the pipeline.|
|$sort|Sorts all input records and returns them in acsending or decsending sorted order.|
