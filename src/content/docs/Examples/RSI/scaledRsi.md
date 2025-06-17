---
title: RSI Indicator Strategy (Scaled)
---

### Explanation & Rationale  

The Scaled Buy Low, Sell High strategy takes a proportional approach to trading based on the RSI's deviation from its neutral value of 50. The strategy scales buy and sell signals: the further the RSI is from 50, the larger the position size, with more buying occurring when the RSI is very low (indicating oversold conditions) and more selling when the RSI is very high (indicating overbought conditions). This approach aims to capture more significant price movements by adjusting position size according to the strength of the trend.

### Code

```python
'''
Scaled Buy Low, Sell High.

Buy/Sell proportional to how low or high the RSI is.
I.E. buy a lot when really low, sell a lot when really high.
Learn more @ docs.ubacktest.com/examples/rsi/scaledrsi
'''

import pandas as pd

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

    # Scaled signal: -1 to 1 range, based on RSI deviation from 50
    data['signal'] = (50 - data['RSI']) / 50

    return data
```