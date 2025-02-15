---
title: Creating a Column of Trading Signals
description: How to programatically create trading signals.
---

### Recap

By now, you are hopefully a little familiar with Pandas DataFrames and how to create a column of empty or constant signals.

To recap, to create a column of buy signals, we run the following: `data['signal'] = 1`

### More Advanced Signals

Of course, we want to create signals that are more complicated than just a constant, and perhaps not just a whole integer of a value of -1 or 1, but perhaps a decimal that represents a fraction of our portfolio traded.

There are two major ways to designate trading signals (and a 3rd, cool option called lambda functions)

#### 1. Vectorized Assignment

Pandas gives us the ability to compare columns against each other, **_without having to loop through the the column_**.

Vectorization is a fancy way of saying this. You do not have to use this capability, but you will find it is often times more generalizable and straightforward to craft trading strategies with this technique.

A Simple Example:
_a signal that is 1 when the close price is above 100, 0 everywhere else_

```python
data['signal'] = 0
data['signal'](data['close'] > 100) = 1
```

This shows how you can assign sweeping signals all in one go.

#### 2. Looping

While not as fancy or fun, you could also loop through the table if you'd prefer, assigning a trading signal at each time point. We'd recommend only doing this when necessary.

A Simple Example:
_a signal that looks at the previous day's close and assigns a 1 if it was above today's_

```python
data['signal'] = 0

numIterations = len(data)
for i in range(2, numIterations)
    if data['close'][i-1] > data['close'][i]:
        data['signal'] = 1
```

#### 3. Lambda Functions

write about lambda functions here


