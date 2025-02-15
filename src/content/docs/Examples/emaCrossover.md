---
title: Exponential Moving Average Crossover
---

### Explanation & Rationale  

The **Exponential Moving Average (EMA) Crossover Strategy** is a popular **trend-following strategy** that identifies **bullish and bearish trends** based on two EMAs of different lengths.  

#### **Key Components:**  
1. **EMA Calculation:**  
   - The **12-day EMA** (shorter-term) reacts faster to price changes.  
   - The **26-day EMA** (longer-term) smooths out fluctuations.  
   - The crossover between these two EMAs generates trading signals.  

2. **Buy & Sell Signals:**  
   - **Buy Signal (1):** When the **12-day EMA crosses above the 26-day EMA**, indicating a **bullish trend**.  
   - **Sell Signal (-1):** When the **12-day EMA crosses below the 26-day EMA**, signaling a **bearish trend**.  
   - If no crossover occurs, the strategy **stays neutral (0)**.  

3. **Why Use This Strategy?**  
   - **Faster Trend Detection:** Since **EMAs** weight recent prices more heavily than **Simple Moving Averages (SMAs)**, they react **quicker to market changes**.  
   - **Avoids Whipsaws in Sideways Markets:** Unlike shorter-term indicators, using a **longer EMA (26-day) reduces false signals**.  
   - **Common in MACD Trading:** The **12-day and 26-day EMA crossover** is a core concept behind the **MACD (Moving Average Convergence Divergence) indicator**.  

### Code

```python
'''
Exponential Moving Average (EMA) Crossover Strategy.

Buy when the 12-day EMA crosses above the 26-day EMA.
Sell when the 12-day EMA crosses below the 26-day EMA.
EMAs respond faster than SMAs, making this strategy better for short-term trends.
'''

import pandas as pd

def calculate_ema(series, window):
    return series.ewm(span=window, adjust=False).mean()

def strategy(data):
    data['EMA_12'] = calculate_ema(data['close'], window=12)
    data['EMA_26'] = calculate_ema(data['close'], window=26)

    # Generate crossover signals
    data['signal'] = 0
    data.loc[data['EMA_12'] > data['EMA_26'], 'signal'] = 1
    data.loc[data['EMA_12'] < data['EMA_26'], 'signal'] = -1

    return data
```
