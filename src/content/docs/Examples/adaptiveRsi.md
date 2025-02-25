---
title: RSI Indicator with Adaptive Bounds
---

### Explanation & Rationale  

The **Relative Strength Index (RSI)** is a momentum oscillator used to identify overbought and oversold conditions in a stock's price. Traditional RSI strategies use fixed thresholds (e.g., 70 for overbought and 30 for oversold). However, this approach may not adapt well to different market conditions and levels of volatility.  

This strategy enhances the RSI indicator by introducing **adaptive bounds** based on the rolling mean and standard deviation of the RSI over a 50-period window.    

### Code

```python
'''
Buy Low, Sell High with Adaptive RSI Levels.

Sell stock when RSI exceeds a dynamic upper threshold (mean RSI + standard deviation).
Buy stock when RSI drops below a dynamic lower threshold (mean RSI - standard deviation).
This adapts entry/exit points based on volatility.
'''

import pandas as pd

def calculate_rsi(series, window=14):
    delta = series.diff()

    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)

    avg_gain = gain.rolling(window=window, min_periods=1).mean()
    avg_loss = loss.rolling(window=window, min_periods=1).mean()

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))

    return rsi

def strategy(data):
    data['RSI'] = calculate_rsi(data['close'], window=14)
    
    # Compute adaptive thresholds
    rsi_mean = data['RSI'].rolling(window=50).mean()
    rsi_std = data['RSI'].rolling(window=50).std()
    
    upper_threshold = rsi_mean + rsi_std
    lower_threshold = rsi_mean - rsi_std

    # Generate adaptive signals
    data['signal'] = data.apply(
        lambda row: 1 if row['RSI'] > upper_threshold else -1 if row['RSI'] < lower_threshold else 0, axis=1
    )

    return data
```

