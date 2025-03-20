---
title: Average True Range (ATR) Strategy
---

### Explanation & Rationale 

The ATR Breakout Strategy uses the Average True Range (ATR) to identify significant price breakouts, adapting to market volatility. A buy signal is generated when the price exceeds the previous high plus a multiple of ATR, while a short signal occurs when the price drops below the previous low minus the ATR multiple, ensuring trades only occur during strong moves. This approach helps traders capture momentum-driven breakouts while dynamically adjusting stop-loss levels based on market conditions.

### How to Make It Your Own

### Code

```python
'''
ATR Breakout Strategy.

Buy when the price breaks above the previous high + ATR * multiplier.
Short when the price breaks below the previous low - ATR * multiplier.
This strategy captures volatility breakouts with dynamic stop-loss levels.
Learn more @ docs.ubacktest.com/examples/other-indicators/atr
'''

import pandas as pd
import numpy as np

def calculate_atr(data, window=14):

    high_low = data['high'] - data['low']
    high_close = (data['high'] - data['close'].shift()).abs()
    low_close = (data['low'] - data['close'].shift()).abs()

    tr = pd.concat([high_low, high_close, low_close], axis=1)
    atr = tr.max(axis=1).rolling(window=window).mean()

    return high_low, high_close, low_close, atr

def strategy(data):
    atr_multiplier = 1.5
    data['high_low'], data['high_close'], data['low_close'], data['ATR'] = calculate_atr(data)

    # Generate breakout signals based on ATR
    data['signal'] = np.nan
    data.loc[data['close'] > (data['high'].shift() + data['ATR'] * atr_multiplier), 'signal'] = 1  # Buy signal
    data.loc[data['close'] < (data['low'].shift() - data['ATR'] * atr_multiplier), 'signal'] = -1  # Short signal

    return data
```