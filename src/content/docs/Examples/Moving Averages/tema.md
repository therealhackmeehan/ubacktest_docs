---
title: Triple Exponential Moving Average
---

### Explanation & Rationale  

The TEMA Crossover strategy uses the Triple Exponential Moving Average (TEMA) to smooth price data and generate more accurate buy and sell signals with reduced lag compared to traditional moving averages. A buy signal occurs when the price crosses above the TEMA, indicating upward momentum, while a sell signal is generated when the price crosses below the TEMA, suggesting a potential downtrend. By applying three levels of exponential smoothing, the TEMA strategy helps filter out market noise and provides clearer trend-following signals.

### How to Make It Your Own

### Code

```python
'''
TEMA Crossover Strategy.

Buy when the price crosses above the Triple Exponential Moving Average (TEMA).
Short when the price crosses below the TEMA.
TEMA smoothes price data to give clearer signals and reduce lag.
Learn more @ docs.ubacktest.com/examples/moving-averages/tema
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
    data.loc[data['close'] < data['TEMA'], 'signal'] = -1  # Short signal (cross below)

    return data
```