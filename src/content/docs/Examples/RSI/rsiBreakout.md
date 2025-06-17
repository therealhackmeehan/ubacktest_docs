---
title: RSI Breakout Strategy
---

### Explanation & Rationale  

The Buy Low, Sell/Short High upon RSI exit strategy takes a more conservative approach by waiting for confirmation before entering a trade. A buy signal is generated when the RSI crosses above 30, confirming the stock has moved out of the oversold zone, while a sell or short signal occurs when the RSI crosses below 70, indicating the stock has exited the overbought zone. This strategy aims to reduce the risk of false signals by waiting for the RSI to exit extreme levels before acting, making it a more cautious method than the classic RSI strategy.

### Code

```python
'''
Buy Low, Sell/Short High upon RSI exit.

Buy when RSI crosses above 30 (instead of below).
Sell when RSI crosses below 70 (instead of above).

More conservative than classic RSI because it waits for confirmation.
Learn more @ docs.ubacktest.com/examples/rsi/rsibreakout
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
    data['signal'] = np.nan  
    
    # Detect RSI moving **above** 30 (bullish signal)
    bullish_cross = (data['RSI'].shift(1) < 30) & (data['RSI'] > 30)
    data.loc[bullish_cross, 'signal'] = 1
    
    # Detect RSI moving **below** 70 (bearish signal)
    bearish_cross = (data['RSI'].shift(1) > 70) & (data['RSI'] < 70)
    data.loc[bearish_cross, 'signal'] = -1
    
    return data
```