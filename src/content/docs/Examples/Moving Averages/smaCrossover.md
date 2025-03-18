---
title: Simple Moving Average Crossover
---

### Explanation & Rationale  

The Simple Moving Average (SMA) Crossover strategy relies on the intersection of a shorter-term 10-day SMA and a longer-term 50-day SMA to identify shifts in market trends. A "golden cross" occurs when the 10-day SMA crosses above the 50-day SMA, signaling a potential buy, while a "death cross" happens when the 10-day SMA crosses below the 50-day SMA, suggesting a sell. This strategy is effective for capturing long-term trends and minimizing noise by focusing on the interaction between these two moving averages.

### How to Make It Your Own

### Code

```python
'''
Simple Moving Average (SMA) Crossover Strategy.

Buy when the 10-day SMA crosses above the 50-day SMA (golden cross).
Short when the 10-day SMA crosses below the 50-day SMA (death cross).
This strategy captures long-term trends.
Learn more @ docs.ubacktest.com/examples/moving-averages/smacrossover
'''

import pandas as pd

def calculate_sma(series, window):
    return series.rolling(window=window).mean()

def strategy(data):
    data['SMA_10'] = calculate_sma(data['close'], window=10)
    data['SMA_50'] = calculate_sma(data['close'], window=50)

    # Generate crossover signals
    data['signal'] = 0
    data.loc[data['SMA_10'] > data['SMA_50'], 'signal'] = 1
    data.loc[data['SMA_10'] < data['SMA_50'], 'signal'] = -1

    return data
```