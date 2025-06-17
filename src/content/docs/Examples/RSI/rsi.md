---
title: RSI Indicator Strategy
---

### Explanation & Rationale  

The Buy Low, Sell/Short High strategy uses the Relative Strength Index (RSI) to identify overbought and oversold conditions in the market. A buy signal is generated when the RSI drops below 30, indicating the stock is oversold and potentially due for a reversal, while a short signal occurs when the RSI exceeds 70, signaling the stock is overbought and may be due for a pullback. This strategy aims to capture price reversals by trading at extreme price levels, assuming that the market will correct itself after moving too far in one direction.

### Code

```python
'''
Buy Low, Sell/Short High.

Buy stock when the RSI breaks below 30.
Short stock when the Relative Strength Index (RSI) cracks above 70.
Learn more @ docs.ubacktest.com/examples/rsi/rsi
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

    # Initialize 'signal' column
    data['signal'] = np.nan  # Start with NaN

    # Assign signals where RSI crosses threshold
    data.loc[data['RSI'] < 30, 'signal'] = 1
    data.loc[data['RSI'] > 70, 'signal'] = -1

    return data
```