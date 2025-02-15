---
title: Bollinger Bands Breakout
---

### Explanation & Rationale  

The **Bollinger Bands Breakout Strategy** is a trend-following approach that identifies strong momentum by detecting price breakouts beyond Bollinger Bands. Unlike the mean-reversion Bollinger Bands strategy, which assumes price will revert to the average, this breakout strategy assumes that **strong price movements will continue in the breakout direction**.  

#### **Key Components:**  
1. **Bollinger Bands Calculation:**  
   - The **middle band** is a **20-period simple moving average (SMA)** of the closing price.  
   - The **upper band** is calculated as **SMA + (2 × standard deviation)**, representing an overbought threshold.  
   - The **lower band** is calculated as **SMA - (2 × standard deviation)**, representing an oversold threshold.  

2. **Entry & Exit Conditions:**  
   - **Buy Signal (+1):** Triggered when the price **breaks above the upper Bollinger Band**, indicating a strong bullish trend.  
   - **Sell Signal (-1):** Triggered when the price **breaks below the lower Bollinger Band**, suggesting strong bearish momentum.  
   - No trade is taken when the price remains within the bands.  

3. **Momentum-Based Assumption:**  
   - Unlike mean-reversion strategies, this breakout approach assumes that once the price breaks through an extreme level, it will continue in that direction rather than reversing.  
   - It is most effective in **trending markets**, as prices tend to follow momentum rather than returning to the mean.  
   - Works well when combined with **volume confirmation** or additional trend indicators to filter false breakouts.  

### Code

```python
'''
Bollinger Band Breakout Strategy.

Buy stock when the price breaks above the upper Bollinger Band.
Sell stock when the price breaks below the lower Bollinger Band.
This strategy assumes strong momentum continues in the breakout direction.
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

    # Generate signals for breakouts
    data['signal'] = data.apply(
        lambda row: 1 if row['close'] > row['Upper_Band'] 
        else -1 if row['close'] < row['Lower_Band'] 
        else 0, axis=1
    )

    return data
```
