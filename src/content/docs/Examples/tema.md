---
title: Triple Exponential Moving Average
---

### Explanation & Rationale

The **Triple Exponential Moving Average (TEMA)** strategy is a trend-following strategy designed to smooth out price data and reduce lag compared to traditional moving averages. By using the **TEMA**, this strategy provides clearer signals for buy and sell decisions, especially in volatile markets.
     
### Code

```python
'''
TEMA Crossover Strategy.

Buy when the price crosses above the Triple Exponential Moving Average (TEMA).
Sell when the price crosses below the TEMA.
TEMA smooths price data to give clearer signals and reduce lag.
'''

import pandas as pd

def calculate_tema(data, window=14):
    ema1 = data['close'].ewm(span=window, adjust=False).mean()
    ema2 = ema1.ewm(span=window, adjust=False).mean()
    ema3 = ema2.ewm(span=window, adjust=False).mean()
    tema = 3 * (ema1 - ema2) + ema3
    return tema

def strategy(data):
    data['TEMA'] = calculate_tema(data)

    # Generate signals based on TEMA crossover
    data['signal'] = 0
    data.loc[data['close'] > data['TEMA'], 'signal'] = 1  # Buy signal (cross above)
    data.loc[data['close'] < data['TEMA'], 'signal'] = -1  # Sell signal (cross below)

    return data
```