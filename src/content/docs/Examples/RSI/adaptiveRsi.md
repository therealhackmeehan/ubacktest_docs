---
title: RSI Indicator Strategy with Adaptive Bounds
---

### Explanation & Rationale  

The Buy Low, Sell/Short High with Adaptive RSI Levels strategy adjusts entry and exit points based on market volatility by dynamically setting the Relative Strength Index (RSI) thresholds. A buy signal is triggered when the RSI drops below the lower threshold (mean RSI - standard deviation), indicating an oversold condition, while a sell or short signal occurs when the RSI exceeds the upper threshold (mean RSI + standard deviation), signaling an overbought condition. This approach adapts to changing market conditions by recalculating thresholds based on recent volatility, offering a more flexible method for capturing potential reversals.

### How to Make It Your Own

### Code

```python
'''
Buy Low, Sell/Short High with Adaptive RSI Levels.

Short stock when RSI exceeds a dynamic upper threshold (mean RSI + standard deviation).
Buy stock when RSI drops below a dynamic lower threshold (mean RSI - standard deviation).
This adapts entry/exit points based on volatility.
Learn more @ docs.ubacktest.com/examples/rsi/adaptiversi
'''

import pandas as pd
import numpy as np

def calculate_rsi(series, window):
    delta = series.diff()

    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)

    avg_gain = gain.rolling(window=window).mean()
    avg_loss = loss.rolling(window=window).mean()

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))

    return rsi

def strategy(data):
    data['RSI'] = calculate_rsi(data['close'], window=14)
    
    # Compute adaptive thresholds
    rsi_mean = data['RSI'].rolling(window=50).mean()
    rsi_std = data['RSI'].rolling(window=50).std()
    
    data['upper_threshold'] = rsi_mean + rsi_std
    data['lower_threshold'] = rsi_mean - rsi_std

    # Initialize 'signal' column
    data['signal'] = np.nan  # Start with NaN

    # Assign signals where RSI crosses threshold
    data.loc[data['RSI'] < data['lower_threshold'], 'signal'] = 1
    data.loc[data['RSI'] > data['upper_threshold'], 'signal'] = -1

    return data
```