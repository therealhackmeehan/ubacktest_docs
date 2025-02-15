---
title: MACD Strategy
---

### Explanation & Rationale  

The **MACD Crossover Strategy** is a popular **momentum-based trading strategy** that seeks to identify **changes in market momentum** by observing the relationship between two **exponentially smoothed moving averages**.  

#### **Key Components of the Strategy:**  
1. **MACD (Moving Average Convergence Divergence):**  
   - The MACD is calculated as the **difference between a short-term (12-period) EMA** and a long-term (26-period) EMA. It helps in tracking **momentum** and identifying trend changes.  

2. **Signal Line:**  
   - The **Signal Line** is a **9-period EMA** of the MACD itself. It is used as a threshold to **generate buy or sell signals** when the MACD crosses it.  

3. **Buy & Sell Signals:**  
   - **Buy Signal (1):** When the **MACD crosses above the Signal Line**, indicating a **bullish shift in momentum**.  
   - **Sell Signal (-1):** When the **MACD crosses below the Signal Line**, signaling a **bearish shift in momentum**.  
   - If the MACD and Signal Line don't cross, the strategy remains **neutral (0)**.  

### Code

```python
'''
MACD Crossover Strategy.

Buy when the MACD crosses above the signal line.
Sell when the MACD crosses below the signal line.
This strategy uses the MACD for identifying momentum changes.
'''

import pandas as pd

def calculate_macd(series, short_window=12, long_window=26, signal_window=9):
    short_ema = series.ewm(span=short_window, adjust=False).mean()
    long_ema = series.ewm(span=long_window, adjust=False).mean()
    macd = short_ema - long_ema
    signal = macd.ewm(span=signal_window, adjust=False).mean()
    return macd, signal

def strategy(data):
    data['MACD'], data['Signal_Line'] = calculate_macd(data['close'])

    # Generate signals based on MACD crossover
    data['signal'] = 0
    data.loc[data['MACD'] > data['Signal_Line'], 'signal'] = 1
    data.loc[data['MACD'] < data['Signal_Line'], 'signal'] = -1

    return data
```
