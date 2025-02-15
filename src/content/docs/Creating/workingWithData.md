---
title: Working With Data
description: Let's talk about DataFrames
---

### About the Stock Data

All stock data is stored in Pandas DataFrames. If you're not familiar with Pandas, think of it as a highly optimized table designed for data analysis and manipulation.

### Pandas DataFrames

In your `strategy` function, stock data is handled as a Pandas DataFrame, providing you with a powerful framework for analysis. Pandas is an **exceptionally robust** library for data science, especially for tasks like working with stock data. Be sure to leverage its full capabilities when crafting your strategies.

### Working with DataFrames

Understanding how to work with DataFrames is key to effectively creating and manipulating trading signals. The more you know about DataFrame operations, the more you can do programmatically with your data.

### Creating Trading Signals from DataFrame Columns

To implement trading signals, you need to create a new column in your DataFrame, typically named `signal`, with values ranging from `-1` (short) to `1` (buy).

You can access or create this column like this: `data['signal']`.

**To assign a constant value to the signal column**, you simply set `data['signal']`:

- `data['signal'] = 1` creates a column with all `1`s (buy and hold strategy).
- `data['signal'] = -1` creates a column with all `-1`s (short and hold strategy).
- `data['signal'] = 'lol'` creates a column filled with the string `'lol'` _(this will cause an error, avoid doing this)_.

### Handling Missing Signals

If you leave the `signal` column mostly empty, Pandas will automatically fill empty entries with the most recent valid value using a **forward fill**. This means any gaps in the signal column are filled with the most recent trading signal.

:::tip
If there are gaps in your signal column, **they will be filled with the previous value (forward fill)**. This is useful for strategies like buy-and-hold, where you don't need to explicitly fill every value with a buy signal.
:::