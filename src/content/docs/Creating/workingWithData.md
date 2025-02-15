---
title: Working With Data
description: Let's talk about DataFrames
---

### About the Stock Data  

All data tables are Pandas DataFrames. If you're not familiar with Pandas DataFrames, you can think of it as a normal table. (Except optimized for further calculation and analysis).

### Pandas DataFrames

So all stock data, as manipulated inside of your 'strategy' function, is part of a Pandas DataFrame. This enables unlimited room for analysis. Pandas is an **incredibly robust** platform for data science and analysis, and is by far the best option for working with something like stock data. Use the full extent of Pandas to your advantage! We will talk about 

### Working with DataFrames

As we've mentioned, it is worth it to learn a little bit about DataFrames and some operations that you can perform on them. For as much as you know how to work with DataFrames, you can apply that knowledge to programatically creating trading signals.

### Creating Trading Signals from Columns in DataFrame

As we've mentioned, you must add a column to your dataframe that is populated with trading signals, which can range from -1 (short) to 1 (buy).

Our new column of signals is created/accessed with the following: `data['signal']`.

**To create a column with a constant value, you can set `data['signal']` to a constant.**

- `data['signal'] = 1` creates a column of ones (buy and hold strategy)
- `data['signal'] = -1` creates a column of negative ones (short and hold strategy)
- `data['signal'] = 'lol'` creates a column with the string 'lol' _(don't do this, it will error)_

### What happens with missing signals?

If we were to create a `signal` column, but leave it mostly empty, the strategy would still work fine. All empty values are filled with a forward fill. This means that empty columns are filled with the most recent trading signal.

:::tip
If we leave gaps in our signal column, **they will fill with the most previous value _(forward fill)_**. This is great because it extends a signal like buy (1) until the next specified signal. As an advanved user, you can use this systematically to build buy and hold strategies without filling every last value with a buy signal.
:::

 