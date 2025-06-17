---
title: Exponential Moving Average Crossover
---

### Explanation & Rationale  

The Exponential Moving Average (EMA) Crossover strategy identifies short-term trend shifts by comparing a faster-moving 12-day EMA with a slower 26-day EMA. When the 12-day EMA crosses above the 26-day EMA, it signals upward momentum and a potential buying opportunity, whereas a downward crossover suggests weakening momentum and a selling signal. Since EMAs give more weight to recent prices, this strategy reacts quickly to market changes, making it effective for capturing short-term trends.

### Code

```python
'''
Exponential Moving Average (EMA) Crossover Strategy.

Buy when the 12-day EMA crosses above the 26-day EMA.
Sell when the 12-day EMA crosses below the 26-day EMA.
EMAs respond faster than SMAs, making this strategy better for short-term trends.
Learn more @ docs.ubacktest.com/examples/moving-averages/emacrossover
'''

import pandas as pd

def calculate_ema(series, window):
    return series.ewm(span=window, adjust=False).mean()

def strategy(data):
    # generate two distinct exponential MAs
    data['EMA_12'] = calculate_ema(data['close'], window=12)
    data['EMA_26'] = calculate_ema(data['close'], window=26)

    # Generate crossover signals
    data['signal'] = 0
    data.loc[data['EMA_12'] > data['EMA_26'], 'signal'] = 1
    data.loc[data['EMA_12'] < data['EMA_26'], 'signal'] = -1

    return data
```