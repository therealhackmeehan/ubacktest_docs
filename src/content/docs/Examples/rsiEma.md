---
title: RSI with Exponential Moving Average Confirmation
---

---

### Explanation & Rationale  

The **RSI with Exponential Moving Average (EMA) Confirmation** strategy builds upon the classic **Relative Strength Index (RSI)** by incorporating an **Exponential Moving Average (EMA)** to smooth the RSI calculation. The smoothing effect of the EMA helps to reduce the noise and make the RSI more responsive to recent price movements, which can enhance the timing of trade signals.  

#### **Key Components:**  

1. **RSI Indicator with EMA Smoothing:**
   - The **Relative Strength Index (RSI)** is a momentum oscillator that measures the speed and change of price movements. It traditionally uses a 14-day period to calculate the average gains and losses, and then generates a value between 0 and 100.
   - In this strategy, the **RSI calculation is smoothed using an Exponential Moving Average (EMA)**, which places greater weight on more recent data points. This results in a more reactive RSI that adjusts faster to price changes, making it more suitable for detecting momentum shifts.
   - The **Buy signal (+1)** is generated when the smoothed RSI crosses below 30, indicating the asset is oversold.
   - The **Sell signal (-1)** is generated when the smoothed RSI crosses above 70, indicating the asset is overbought.

2. **Exponential Moving Average (EMA):**
   - The **EMA** is used to smooth the RSI values, as opposed to a simple moving average (SMA), which gives equal weight to all data points in the window. The EMA gives more weight to the most recent price changes, making it more sensitive and responsive to the current market conditions.
   - This smoothing effect helps filter out some of the noise and false signals that can occur with the traditional RSI, particularly during periods of sideways market movement.

3. **Strategy Logic:**
   - **Buy signal (+1):** When the RSI, smoothed by the EMA, crosses below the threshold of 30, indicating that the stock is oversold and may be due for a rebound.
   - **Sell signal (-1):** When the RSI, smoothed by the EMA, crosses above the threshold of 70, indicating that the stock is overbought and may be due for a reversal.
   - **Hold (0):** When the RSI is between 30 and 70, the strategy avoids taking any action, reducing the likelihood of entering trades during neutral market conditions.

### Code

```python
'''
Buy Low, Sell High (Smoothed RSI).

Sell stock when the Relative Strength Index (RSI) crosses above 70.
Buy stock when the RSI crosses below 30.
Uses an Exponential Moving Average (EMA) for smoothing RSI calculation.
'''

import pandas as pd

def calculate_rsi_ema(series, window=14):
    delta = series.diff()

    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)

    avg_gain = gain.ewm(span=window, adjust=False).mean()
    avg_loss = loss.ewm(span=window, adjust=False).mean()

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))

    return rsi

def strategy(data):
    data['RSI'] = calculate_rsi_ema(data['close'], window=14)

    # Generate signals
    data['signal'] = data['RSI'].apply(lambda x: 1 if x > 70 else -1 if x < 30 else 0)

    return data
```