---
title: Bollinger Bands Strategy
---

### Explanation & Rationale  

The **Bollinger Bands Strategy** is a mean-reversion approach that identifies overbought and oversold conditions based on price deviations from a moving average. It assumes that prices tend to revert to their mean after reaching extreme levels.  

#### **Key Components:**  
1. **Bollinger Bands Calculation:**  
   - The **middle band** is a **20-period simple moving average (SMA)** of the closing price.  
   - The **upper band** is calculated as **SMA + (2 × standard deviation)**, representing an overbought level.  
   - The **lower band** is calculated as **SMA - (2 × standard deviation)**, indicating an oversold level.  

2. **Entry & Exit Conditions:**  
   - **Buy Signal (+1):** Triggered when the price touches or falls below the **lower Bollinger Band**, signaling an oversold condition and a potential rebound.  
   - **Sell Signal (-1):** Triggered when the price touches or rises above the **upper Bollinger Band**, suggesting an overbought condition and potential price decline.  
   - No trade is taken when the price is within the bands.  

3. **Mean Reversion Assumption:**  
   - This strategy assumes that extreme price movements away from the moving average are temporary and will eventually revert back to the mean.  
   - Works best in **range-bound markets** but may underperform in strong trending conditions.  

### Code

```python
'''
Bollinger Bands Strategy.

Sell stock when the price touches or rises above the upper Bollinger Band.
Buy stock when the price touches or drops below the lower Bollinger Band.
This strategy assumes mean reversion.
'''

import pandas as pd

def calculate_bollinger_bands(series, window=20, num_std=2):
    sma = series.rolling(window=window).mean()
    std = series.rolling(window=window).std()
    
    upper_band = sma + (std * num_std)
    lower_band = sma - (std * num_std)

    return upper_band, lower_band

def strategy(data):
    data['Upper_Band'], data['Lower_Band'] = calculate_bollinger_bands(data['close'], window=20)

    # Generate signals
    data['signal'] = data.apply(
        lambda row: 1 if row['close'] <= row['Lower_Band'] 
        else -1 if row['close'] >= row['Upper_Band'] 
        else 0, axis=1
    )

    return data
```
