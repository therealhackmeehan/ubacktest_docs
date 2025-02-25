---
title: RSI Indicator Strategy
---

### Explanation & Rationale

The **RSI Indicator Strategy** is based on the **Relative Strength Index (RSI)**, a momentum oscillator that measures the speed and change of price movements. The strategy follows the principle of **buying low and selling high** by using the RSI levels.

### Code

```python
'''
Buy Low, Sell High.

Sell stock when the Relative Strength Index (RSI) cracks above 70.
Buy stock when the RSI breaks below 30.
'''

import pandas as pd

def calculate_rsi(series, window):
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

    # Generate signals
    data['signal'] = data['RSI'].apply(lambda x: 1 if x > 70 else -1 if x < 30 else 0)

    return data
```