---
title: Working With Data
description: Let's talk about DataFrames
---

### Your Role  

Your primary task is to take stock data, analyze it, and extract meaningful trends to generate buy and sell signals based on logical, programmatic rules.  

#### What does this involve?  

It can mean many things, not limited to but including:  

- Calculating moving averages and identifying buy signals at low points.  
- Detecting trend reversals using indicators like RSI or MACD.  
- Parsing historical price data to find patterns in volatility.  

To do this effectively, you need to understand the structure of the available data within your strategy function.

### About the Stock Data

All stock data is stored in **Pandas DataFrames**. If you're not familiar with Pandas DataFrames, think of them as a highly optimized table designed for data analysis and manipulation.

> Pandas is an **exceptionally robust** library for data science, especially for tasks like working with stock data. Be sure to leverage its full capabilities when crafting your strategies.

```
     high    low     open    close   volume    timestamp
0    1.0034  0.9863  0.9983  1.0000  65434500  1708007400
1    1.0054  0.9881  0.9976  0.9916  49701400  1708093800
2    0.9922  0.9790  0.9887  0.9875  53665600  1708439400
3    0.9947  0.9826  0.9896  0.9916  41529700  1708525800
4    1.0060  0.9924  0.9979  1.0028  52292200  1708612200
...    ...     ...     ...     ...      ...         ...
```

As pictured above, every stock data DataFrame includes the following columns:  
`open`, `close`, `high`, `low`, `volume`, and `timestamp`. 
These are available for use in generating trading signals. Avoid naming any additional columns with these names to preserve their intended use.

:::caution  
All stock data is _normalized_ to start at $1. This won’t affect most trading strategies, but if your strategy depends on absolute dollar movements, adjustments may be needed.  

> For example, a stock that originally moves from $100 to $110 will instead be represented as moving from $1 to $1.10. This scaling ensures consistency across different stocks.  
:::

On the [next page](/creating/creatingsignals/), you'll learn how to access data—such as `close` prices—calculate key metrics, and generate trading signals.

### Adding Constant Trading Signals to the DataFrame

To implement trading signals, you need to create a new column in your DataFrame, named `signal`, with values ranging from `-1` (short) to `1` (buy).

**To assign a constant value to the signal column**, you simply set `data['signal']` to a constant:

- `data['signal'] = 1` creates a column with all `1`s (buy and hold strategy).
- `data['signal'] = -1` creates a column with all `-1`s (short and hold strategy).
- `data['signal'] = 'lol'` creates a column filled with the string `'lol'` _(this will cause an error, avoid doing this)_.

If you run and return `data['signal'] = 1`, your final signals column will look something like this:

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

### More Resources

We recommend scanning through the Pandas documentation. They do a better job than we do in describing the DataFrame and its capabilities!

- A brief intro to DataFrames: ([Click Here](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html))
- Pandas, a 10-minute crash course: ([Click Here](https://pandas.pydata.org/docs/user_guide/10min.html))
- DataFrames, for nerds, via the official API documentation: ([Click Here](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html))