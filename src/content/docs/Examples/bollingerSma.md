---
title: Bollinger Bands with Moving Average Confirmation
---

### Explanation & Rationale  

The **Bollinger Bands with Moving Average Confirmation** strategy enhances the traditional Bollinger Bands approach by incorporating a **50-day simple moving average (SMA)** as a trend filter. This prevents counter-trend trades and ensures that signals align with the broader market trend.  

#### **Key Components:**  
1. **Bollinger Bands Calculation:**  
   - The **middle band** is a **20-period SMA** of the closing price.  
   - The **upper band** is calculated as **SMA + (2 × standard deviation)**, marking an overbought level.  
   - The **lower band** is calculated as **SMA - (2 × standard deviation)**, marking an oversold level.  

2. **50-Day SMA as a Trend Filter:**  
   - A longer **50-day SMA** is used to determine the overall trend.  
   - This helps filter out false signals that might occur in choppy or sideways markets.  

3. **Entry & Exit Conditions:**  
   - **Buy Signal (+1):** Triggered when the price **touches or drops below the lower Bollinger Band** but remains **above the 50-day SMA** (indicating a bullish trend).  
   - **Sell Signal (-1):** Triggered when the price **touches or rises above the upper Bollinger Band** but remains **below the 50-day SMA** (indicating a bearish trend).  
   - No trade is taken if the price is within the Bollinger Bands or does not meet the SMA condition.  

4. **Why Use Moving Average Confirmation?**  
   - The **50-day SMA helps avoid false signals** that occur when price briefly moves beyond the Bollinger Bands but lacks trend strength.  
   - It ensures that **buy trades are taken in an uptrend** and **sell trades in a downtrend**, reducing the risk of betting against market momentum.  

### Code

```python
'''
Bollinger Bands Strategy with Moving Average Confirmation.

Sell stock when the price is above the upper Bollinger Band **and** below the 50-day SMA.
Buy stock when the price is below the lower Bollinger Band **and** above the 50-day SMA.
This ensures we trade in the direction of the larger trend.
'''

import pandas as pd

def calculate_bollinger_bands(series, window=20, num_std=2):
    sma = series.rolling(window=window).mean()
    std = series.rolling(window=window).std()
    
    upper_band = sma + (std * num_std)
    lower_band = sma - (std * num_std)

    return upper_band, lower_band

def calculate_sma(series, window=50):
    return series.rolling(window=window).mean()

def strategy(data):
    data['Upper_Band'], data['Lower_Band'] = calculate_bollinger_bands(data['close'], window=20)
    data['SMA_50'] = calculate_sma(data['close'], window=50)

    # Generate signals with trend confirmation
    data['signal'] = data.apply(
        lambda row: 1 if row['close'] <= row['Lower_Band'] and row['close'] > row['SMA_50'] 
        else -1 if row['close'] >= row['Upper_Band'] and row['close'] < row['SMA_50'] 
        else 0, axis=1
    )

    return data
```
