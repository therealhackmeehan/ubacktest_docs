---
title: ADX Indicator Strategy
---

### Explanation & Rationale  

The ADX Trend Strength strategy combines the Average Directional Index (ADX) with Directional Indicators (+DI and -DI) to confirm strong trends before entering a trade. A buy signal is generated when +DI crosses above -DI, indicating upward momentum, while ADX above 25 confirms trend strength; similarly, a short signal occurs when -DI crosses above +DI with ADX above 25, signaling a strong downtrend. This approach helps filter out weak trends and avoid false signals, ensuring trades align with significant market movements.

### Code

```python
'''
ADX Trend Strength Strategy.

Buy when the +DI crosses above the -DI and the ADX is above 25 (strong uptrend).
Short when the -DI crosses above the +DI and the ADX is above 25 (strong downtrend).
The ADX helps to confirm the strength of a trend.
Learn more @ docs.ubacktest.com/examples/other-indicators/adx
'''

import pandas as pd
import numpy as np

def calculate_adx(data, window=14):

    # Compute Positive/Negative Directional Movement
    up_move = data['high'].diff()
    down_move = data['low'].diff().abs()

    # Compute +DM, -DM
    plus_dm = np.where((up_move > down_move) & (up_move > 0), up_move, 0)
    minus_dm = np.where((down_move > up_move) & (down_move > 0), down_move, 0)
    
    # Compute Smoothed +DM and -DM using EMA
    plus_dm = pd.Series(plus_dm, index=data.index).ewm(span=window, adjust=False).mean()
    minus_dm = pd.Series(minus_dm, index=data.index).ewm(span=window, adjust=False).mean()

    # Compute ATR
    high_low = data['high'] - data['low']
    high_close = (data['high'] - data['close'].shift()).abs()
    low_close = (data['low'] - data['close'].shift()).abs()

    tr = pd.concat([high_low, high_close, low_close], axis=1)
    atr = tr.max(axis=1).rolling(window=window).mean()
   
    plus_di = (plus_dm / atr) * 100
    minus_di = (minus_dm / atr) * 100
    adx = (abs(plus_di - minus_di) / (plus_di + minus_di)).rolling(window=window).mean() * 100

    return plus_di, minus_di, adx

def strategy(data):
    data['+DI'], data['-DI'], data['ADX'] = calculate_adx(data)

    # Generate signals based on ADX trend strength. Only authorize action if ADX > 25
    data['signal'] = np.nan
    data.loc[(data['+DI'] > data['-DI']) & (data['ADX'] > 25), 'signal'] = 1  # Buy signal
    data.loc[(data['-DI'] > data['+DI']) & (data['ADX'] > 25), 'signal'] = -1  # Short signal

    return data
```