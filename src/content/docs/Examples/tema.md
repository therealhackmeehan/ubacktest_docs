---
title: Triple Exponential Moving Average
---

### Explanation & Rationale

The **Triple Exponential Moving Average (TEMA)** strategy is a trend-following strategy designed to smooth out price data and reduce lag compared to traditional moving averages. By using the **TEMA**, this strategy provides clearer signals for buy and sell decisions, especially in volatile markets.

#### **Key Components:**

1. **Triple Exponential Moving Average (TEMA):**
   - The **TEMA** is a combination of three **Exponential Moving Averages (EMAs)** with different levels of smoothing.
   - The formula for **TEMA** is:
     \[
     TEMA = 3 \times (EMA1 - EMA2) + EMA3
     \]
     Where:
     - **EMA1** is the 1st EMA (smoothed over the specified window),
     - **EMA2** is the 2nd EMA (smoothed again over the same window),
     - **EMA3** is the 3rd EMA (smoothed a third time).

     This triple smoothing process helps in reducing the lag found in standard EMAs and makes the **TEMA** more responsive to recent price changes.

   The **TEMA** is calculated as follows:
   ```python
   ema1 = data['close'].ewm(span=window, adjust=False).mean()
   ema2 = ema1.ewm(span=window, adjust=False).mean()
   ema3 = ema2.ewm(span=window, adjust=False).mean()
   tema = 3 * (ema1 - ema2) + ema3
   ```

2. **Signal Generation (TEMA Crossover):**
   - **Buy Signal:** A buy signal is generated when the **price** crosses above the **TEMA**. This suggests the start of an upward trend, and the strategy aims to capture this momentum.
     ```python
     data.loc[data['close'] > data['TEMA'], 'signal'] = 1  # Buy signal
     ```
   
   - **Sell Signal:** A sell signal is generated when the **price** crosses below the **TEMA**. This suggests the start of a downward trend, signaling an exit from the position.
     ```python
     data.loc[data['close'] < data['TEMA'], 'signal'] = -1  # Sell signal
     ```
     
### Code

```python
'''
TEMA Crossover Strategy.

Buy when the price crosses above the Triple Exponential Moving Average (TEMA).
Sell when the price crosses below the TEMA.
TEMA smooths price data to give clearer signals and reduce lag.
'''

import pandas as pd

def calculate_tema(data, window=14):
    ema1 = data['close'].ewm(span=window, adjust=False).mean()
    ema2 = ema1.ewm(span=window, adjust=False).mean()
    ema3 = ema2.ewm(span=window, adjust=False).mean()
    tema = 3 * (ema1 - ema2) + ema3
    return tema

def strategy(data):
    data['TEMA'] = calculate_tema(data)

    # Generate signals based on TEMA crossover
    data['signal'] = 0
    data.loc[data['close'] > data['TEMA'], 'signal'] = 1  # Buy signal (cross above)
    data.loc[data['close'] < data['TEMA'], 'signal'] = -1  # Sell signal (cross below)

    return data
```