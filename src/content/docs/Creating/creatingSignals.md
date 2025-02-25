---
title: Creating a Column of Trading Signals
description: How to programatically create trading signals.
---

### Recap

By now, you should be a little bit familiar with Pandas DataFrames and how to create a column of constant or empty signals.

To create a simple column of buy signals, you can use:

```python
data['signal'] = 1
```

### More Advanced Signals

We often need to create more complex signals, instead of just constants like `-1` or `1`. There are several ways to designate trading signals:

#### 1. Vectorized Assignment

Pandas allows us to compare columns without looping, which is called **vectorization**. This method is more efficient and often more readable for creating trading strategies.

**Example**: A signal of `1` when the close price is above 100, and `0` otherwise.

```python
data['signal'] = 0  # Initialize with default value
data.loc[data['close'] > 100, 'signal'] = 1
```

Or for an even cleaner syntax:

```python
data['signal'] = 0  # Initialize with default value
data['signal'] = (data['close'] > 100).astype(int)
```

This efficiently assigns values across the entire column in one step. It may take a little getting used to, but its quite poetic.

#### 2. Looping

While vectorization is preferred for efficiency, you can loop through the DataFrame if necessary. However, looping can be slower and should be used sparingly.

**Example**: A signal that assigns `1` if the previous day's close was greater than today's close:

```python
data['signal'] = 0

for i in range(1, len(data)):
    if data['close'][i-1] > data['close'][i]:
        data['signal'][i] = 1
```

#### 3. Lambda Functions

Lambda functions allow you to create small, anonymous functions that can be applied to DataFrame columns. This is useful for more customized signal logic without defining a separate function.

**Example**: A lambda function that assigns `1` if the close price is greater than the moving average of the last 5 days:

```python
data['signal'] = data['close'].apply(
    lambda x: 1 if x > data['close'].rolling(window=5).mean().iloc[-1] 
    else 0
    )
```

This method is flexible for more complex logic but should be used with caution for performance reasons.

See the [examples](/examples/) for specific use cases involving these methods!

### Other Columns in the DataFrame

We recommend adding all key metrics as columns to your DataFrame. Our software automatically detects these additional columns, allowing you to view them alongside your strategy results for deeper insights.  

> **Example:** If you include moving averages as columns in your DataFrame—such as `data['sma_10']` and `data['sma_50']`—an additional chart will be displayed below the main chart:  
> ![User Defined Plots](../../../assets/yesBurnin.png)

### More Resources

- For more documentation on windowing operations that you can perform on DataFrames, which are immensely helpful for our financial calculations: [Click Here](https://pandas.pydata.org/docs/user_guide/window.html)