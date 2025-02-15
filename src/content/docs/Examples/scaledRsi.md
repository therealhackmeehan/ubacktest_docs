---
title: RSI Indicator Strategy (Scaled)
---

### Explanation & Rationale  

The **RSI Indicator Strategy (Scaled)** takes the classic **Relative Strength Index (RSI)** approach and scales the buy and sell signals based on the RSI value's deviation from the neutral 50 level. This strategy allows for proportional trading, where the position size or strength of buy/sell signals increases as the RSI moves further from the midpoint (50). 

#### **Key Components:**  

1. **RSI Indicator:**
   - The **Relative Strength Index (RSI)** is a momentum oscillator that measures the speed and change of price movements. It fluctuates between 0 and 100 and is used to identify overbought or oversold conditions in a market.
   - An RSI value **above 70** indicates overbought conditions (potential sell signal), while an RSI value **below 30** suggests oversold conditions (potential buy signal). 
   - In this strategy, we adjust the signals based on the **distance from the neutral level of 50** (instead of using fixed buy/sell thresholds like 30 and 70).

2. **RSI Calculation:**  
   - The calculation involves determining the average gains and losses over a specified period (e.g., 14 periods), then scaling those averages to calculate the RSI.
   - This approach identifies periods of rapid price changes that might indicate trends or reversals.

3. **Scaled Signal Calculation:**  
   - The signal is **scaled** based on how far the RSI is from the neutral 50 level. A value of **1** indicates a very strong buy signal (when RSI is close to 0), and a value of **-1** indicates a very strong sell signal (when RSI is close to 100).
   - The formula used to calculate the signal is:  
     ```python
     data['signal'] = (50 - data['RSI']) / 50
     ```
     - When the RSI is **below 50**, the signal will be positive, and the closer it is to 0, the stronger the buy signal.
     - When the RSI is **above 50**, the signal will be negative, and the closer it is to 100, the stronger the sell signal.

4. **Signal Strength:**  
   - **Buy signal (+1):** The signal strength increases as the RSI value approaches 0. The closer the RSI is to 0, the more aggressive the buy signal will be.
   - **Sell signal (-1):** The signal strength increases as the RSI value approaches 100. The closer the RSI is to 100, the more aggressive the sell signal will be.
   - **Neutral signal (0):** If the RSI is around 50, the strategy will have a neutral signal, meaning no action is suggested.

### Code

```python
'''
Scaled Buy Low, Sell High.

Buy/Sell proportional to how low or high the RSI is.
I.E. buy a lot when really low, sell a lot when really high.
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

    # Scaled signal: -1 to 1 range, based on RSI deviation from 50
    data['signal'] = (50 - data['RSI']) / 50  # Closer to -1 is Strong Sell, Closer to 1 is Strong Buy

    return data
```

## Explanation
