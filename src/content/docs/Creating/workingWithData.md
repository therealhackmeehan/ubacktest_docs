---
title: Working With Data
description: Let's talk about DataFrames
---

### About the Stock Data

All stock data is stored in **Pandas DataFrames**. If you're not familiar with Pandas DataFrames, think of them as a highly optimized table designed for data analysis and manipulation.

```
     high    low     open    close   volume    timestamp
0    1.0034  0.9863  0.9983  1.0000  65434500  1708007400
1    1.0054  0.9881  0.9976  0.9916  49701400  1708093800
2    0.9922  0.9790  0.9887  0.9875  53665600  1708439400
3    0.9947  0.9826  0.9896  0.9916  41529700  1708525800
4    1.0060  0.9924  0.9979  1.0028  52292200  1708612200
...    ...     ...     ...     ...      ...         ...
```

 Pandas is an **exceptionally robust** library for data science, especially for tasks like working with stock data. Be sure to leverage its full capabilities when crafting your strategies.

### Working with DataFrames

Understanding how to work with DataFrames is key to effectively creating and manipulating trading signals. The more you know about DataFrame operations, the more you can do programmatically with your data.

### Adding Trading Signals from the DataFrame

:::note
The official term for a column in a Pandas DataFrame is a `series`, so you may see that language used interchangeably across the web.
:::

To implement trading signals, you need to create a new column in your DataFrame, named `signal`, with values ranging from `-1` (short) to `1` (buy).

You can access or create this column like this: `data['signal']`.

**To assign a constant value to the signal column**, you simply set `data['signal']`:

- `data['signal'] = 1` creates a column with all `1`s (buy and hold strategy).
- `data['signal'] = -1` creates a column with all `-1`s (short and hold strategy).
- `data['signal'] = 'lol'` creates a column filled with the string `'lol'` _(this will cause an error, avoid doing this)_.

If you run `data['signal'] = 1`, your final signals column will look something like this:

```
signal
1
1
1
1
... 
1
1
1
1
```

### Handling Missing Signals

If you leave the `signal` column mostly empty, Pandas will automatically fill empty entries with the most recent valid value using a **forward fill**. This means any gaps in the signal column are filled with the most recent trading signal.

>```
>signal
>1
>NaN
>NaN
>NaN
>NaN
>```
>becomes
>```
>signal
>1
>1
>1
>1
>1
>```

:::tip
If there are gaps in your signal column, **they will be filled with the previous value (forward fill)**. This is useful for strategies like buy-and-hold, where you don't technically need to explicitly fill every value with a buy signal, just the first timepoint.
:::

### More Resources

We recommend scanning through the Pandas documentation. They do a better job than we do in describing the DataFrame and its capabilities!

- A brief intro to DataFrames: ([Click Here](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html))
- Pandas, a 10-minute crash course: ([Click Here](https://pandas.pydata.org/docs/user_guide/10min.html))
- DataFrames, for nerds, via the official API documentation: ([Click Here](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html))