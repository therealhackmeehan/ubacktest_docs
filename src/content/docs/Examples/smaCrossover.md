---
title: Simple Moving Average Crossover
---

### Explanation & Rationale

The **Simple Moving Average (SMA) Crossover Strategy** is a classic technical analysis strategy designed to capture long-term trends by using two different SMAs—one for the short term (50-day) and one for the long term (200-day). The strategy generates buy and sell signals based on the crossovers between these two moving averages.

### Code

```python
'''
Simple Moving Average (SMA) Crossover Strategy.

Buy when the 50-day SMA crosses above the 200-day SMA (golden cross).
Sell when the 50-day SMA crosses below the 200-day SMA (death cross).
This strategy captures long-term trends.
'''

import pandas as pd

def calculate_sma(series, window):
    return series.rolling(window=window).mean()

def strategy(data):
    data['SMA_50'] = calculate_sma(data['close'], window=50)
    data['SMA_200'] = calculate_sma(data['close'], window=200)

    # Generate crossover signals
    data['signal'] = 0
    data.loc[data['SMA_50'] > data['SMA_200'], 'signal'] = 1
    data.loc[data['SMA_50'] < data['SMA_200'], 'signal'] = -1

    return data
```