---
title: Donchian Channel Strategy
---

### Explanation & Rationale  

The **Donchian Channel Breakout Strategy** is a trend-following system that helps traders capture breakouts and trend continuation. It is widely used in **trend-following systems**, such as the **Turtle Trading strategy**.  

#### **Key Components:**  
1. **Donchian Channel Calculation:**  
   - The **Upper Band** is the **highest high** over a specified period (default: 20 days).  
   - The **Lower Band** is the **lowest low** over the same period.  
   - These bands form a price channel that adapts to market volatility.  

2. **Buy & Sell Signals:**  
   - **Buy Signal (1):** When the **closing price** crosses **above the Upper Band**, signaling an **uptrend breakout**.  
   - **Sell Signal (-1):** When the **closing price** crosses **below the Lower Band**, signaling a **downtrend breakout**.  
   - If the price remains within the channel, **no trade (0)** is executed.  

3. **Why Use This Strategy?**  
   - **Trend-Following:** The strategy helps traders **ride strong trends** and avoid choppy, sideways markets.  
   - **Breakout Confirmation:** Instead of buying too early, it waits for a confirmed **breakout beyond recent highs/lows**.  
   - **Simple & Effective:** Works well in **highly volatile markets** where price trends persist.  

### Code

```python
'''
Donchian Channel Breakout Strategy.

Buy when the price crosses above the upper band (breakout to the upside).
Sell when the price crosses below the lower band (breakout to the downside).
The Donchian Channel identifies breakout points and trend continuation.
'''

import pandas as pd

def calculate_donchian_channel(data, window=20):
    data['Upper_Band'] = data['high'].rolling(window=window).max()
    data['Lower_Band'] = data['low'].rolling(window=window).min()
    return data

def strategy(data):
    data = calculate_donchian_channel(data)

    # Generate signals based on Donchian Channel breakouts
    data['signal'] = 0
    data.loc[data['close'] > data['Upper_Band'], 'signal'] = 1  # Buy signal (breakout)
    data.loc[data['close'] < data['Lower_Band'], 'signal'] = -1  # Sell signal (breakout)

    return data
```
