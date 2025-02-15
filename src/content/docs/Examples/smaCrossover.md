---
title: Simple Moving Average Crossover
---

### Explanation & Rationale

The **Simple Moving Average (SMA) Crossover Strategy** is a classic technical analysis strategy designed to capture long-term trends by using two different SMAs—one for the short term (50-day) and one for the long term (200-day). The strategy generates buy and sell signals based on the crossovers between these two moving averages.

#### **Key Components:**

1. **Simple Moving Averages (SMA):**
   - An **SMA** is the average of a stock's price over a set period of time. The 50-day SMA represents the average closing price of the stock over the last 50 days, and the 200-day SMA represents the average closing price over the last 200 days.
   - The strategy uses two SMAs to identify when short-term trends (50-day) cross over long-term trends (200-day).

2. **Crossover Signals:**
   - **Golden Cross (Buy Signal):** When the 50-day SMA crosses **above** the 200-day SMA, it suggests that the stock's price is likely in an uptrend. This is the signal to buy.
   - **Death Cross (Sell Signal):** When the 50-day SMA crosses **below** the 200-day SMA, it suggests that the stock's price is likely in a downtrend. This is the signal to sell.
   
   The code generates these signals as follows:

   ```python
   data.loc[data['SMA_50'] > data['SMA_200'], 'signal'] = 1  # Buy signal (Golden Cross)
   data.loc[data['SMA_50'] < data['SMA_200'], 'signal'] = -1  # Sell signal (Death Cross)
   ```

3. **Signal Generation:**
   - The `signal` column is assigned a value of **1** (buy) when the 50-day SMA crosses above the 200-day SMA, and **-1** (sell) when the 50-day SMA crosses below the 200-day SMA.

   ```python
   data['signal'] = 0
   data.loc[data['SMA_50'] > data['SMA_200'], 'signal'] = 1  # Buy signal
   data.loc[data['SMA_50'] < data['SMA_200'], 'signal'] = -1  # Sell signal
   ```

### Code

```python
'''
Simple Moving Average (SMA) Crossover Strategy.

Buy when the 50-day SMA crosses above the 200-day SMA (golden cross).
Sell when the 50-day SMA crosses below the 200-day SMA (death cross).
This strategy captures long-term trends.
'''

import pandas as pd

def calculate_sma(series, window):
    return series.rolling(window=window).mean()

def strategy(data):
    data['SMA_50'] = calculate_sma(data['close'], window=50)
    data['SMA_200'] = calculate_sma(data['close'], window=200)

    # Generate crossover signals
    data['signal'] = 0
    data.loc[data['SMA_50'] > data['SMA_200'], 'signal'] = 1
    data.loc[data['SMA_50'] < data['SMA_200'], 'signal'] = -1

    return data
```