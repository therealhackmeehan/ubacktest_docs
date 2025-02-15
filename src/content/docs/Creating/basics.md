---
title: Basics
description: What is behind a strategy
---

### How do we define a strategy?  

A strategy is a python function, defined by name as `strategy`. This function takes in stock data as an input and returns the stock data with a column of trading signals.

**Every trading strategy, _no matter how complicated_, will have these bones:**

```python
def strategy(data):

    # do whatever you want in here (:

    return data
```

As long as we have these bones, we can do whatever else we need to determine these signals. It is ok to have additional helper functions and other instances of logic as a part of our strategy!

:::caution
If you fail to create a function named `strategy`, as we've defined above, your strategy will never be valid and will not run against stock data. Start every strategy by laying out the above foundation!
:::

### Where do we put the trading signals?

The data that we return (using `return data`), must contain a column of trading signals, named 'signal'. You can add as many columns as you need to the DataFrame, as long as you have one named `signal`. If you add more columns to the DataFrame, you will be able to view them later alongside the result of your trading strategy.

:::caution
If the table that you return does not have a column named `signal` (case insensitive), your strategy will fail every time. Our software searches specifically for this column!
:::

### What columns do we have access to in the stock data?

**Every stock data DataFrame will have `open`, `close`, `high`, `low`, `volume`, and `timestamp` columns.** Feel free to use these columns wherever you need in creating trading signals! It is recommended that in your analysis you do not name columns of these 6 names to reserve their uniqueness for analysis.

### How do we use this strategy?

Once we've defined a strategy, it is _not_ tied to any particlar stock or date range. It is a platform for backtesting with whatever stock or time range, or additoinal backtest options that you so desire. 
