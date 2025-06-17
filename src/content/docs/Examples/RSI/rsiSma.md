---
title: RSI with Moving Average Confirmation
---

### Explanation & Rationale  

The Buy Low, Sell/Short High with Trend Confirmation strategy combines RSI with the 50-day Simple Moving Average (SMA) to reduce false signals in volatile markets. A buy signal is generated when the RSI crosses below 30 and the stock is above its 50-day SMA, indicating an oversold condition in an uptrend. Conversely, a short signal occurs when the RSI crosses above 70 and the stock is below its 50-day SMA, suggesting an overbought condition in a downtrend, helping to filter out less reliable signals.

### Code

```python
'''
Buy Low, Sell/Short High with Trend Confirmation.

Short stock when RSI crosses above 70 **and** the stock is below its 50-day SMA.
Buy stock when RSI crosses below 30 **and** the stock is above its 50-day SMA.
This helps reduce false signals in volatile markets.
Learn more @ docs.ubacktest.com/examples/rsi/rsisma
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
    data['SMA_50'] = data['close'].rolling(window=50).mean()

    # Initialize 'signal' column
    data['signal'] = np.nan  # Start with NaN

    # Assign signals where RSI crosses threshold
    data.loc[(data['RSI'] < 30) & (data['close'] < data['SMA_50']), 'signal'] = 1
    data.loc[(data['RSI'] > 70) & (data['close'] > data['SMA_50']), 'signal'] = -1

    return data
```