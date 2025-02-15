---
title: RSI with Moving Average Confirmation
---

### Explanation & Rationale  

The **RSI with Moving Average Confirmation** strategy refines traditional **RSI-based trading signals** by incorporating a **50-day Simple Moving Average (SMA)** to confirm the prevailing market trend. This helps reduce false signals, especially in volatile or sideways markets, by ensuring that trades align with the overall trend direction.

#### **Key Components:**  

1. **RSI Indicator:**
   - The **Relative Strength Index (RSI)** is a momentum oscillator used to identify overbought and oversold conditions, with typical thresholds set at 70 (overbought) and 30 (oversold).
   - **Buy signal (+1):** Generated when the RSI drops below 30, signaling that the stock is oversold.
   - **Sell signal (-1):** Generated when the RSI rises above 70, signaling that the stock is overbought.

2. **50-Day Simple Moving Average (SMA):**
   - The **50-day Simple Moving Average (SMA)** represents the average closing price over the past 50 days, providing a smoothed line that reflects the medium-term market trend.
   - The SMA is used to determine whether the stock is in an uptrend or downtrend, filtering out signals that contradict the overall market direction.
   - **SMA Confirmation:** Trades are only considered if they align with the trend indicated by the 50-day SMA:
     - **Buy signal (+1):** Only when the RSI is below 30 (oversold) **and** the stock price is above the 50-day SMA, suggesting the stock is in an uptrend and may be due for a rebound.
     - **Sell signal (-1):** Only when the RSI is above 70 (overbought) **and** the stock price is below the 50-day SMA, suggesting the stock is in a downtrend and may be due for a correction.

3. **Strategy Logic:**
   - **Buy signal (+1):** Triggered when the RSI crosses below 30 (oversold) **and** the stock price is above its 50-day SMA, indicating that the stock is in an uptrend and could experience a reversal.
   - **Sell signal (-1):** Triggered when the RSI crosses above 70 (overbought) **and** the stock price is below its 50-day SMA, suggesting the stock is in a downtrend and might see a pullback.
   - **Hold (0):** When neither condition is met, the strategy avoids entering any trades, reducing the risk of acting on false or premature signals.

### Code

```python
'''
Buy Low, Sell High with Trend Confirmation.

Sell stock when RSI crosses above 70 **and** the stock is below its 50-day SMA.
Buy stock when RSI crosses below 30 **and** the stock is above its 50-day SMA.
This helps reduce false signals in volatile markets.
'''

import pandas as pd

def calculate_rsi(series, window=14):
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
    data['SMA_50'] = data['close'].rolling(window=50).mean()

    # Generate signals with SMA confirmation
    data['signal'] = data.apply(
        lambda row: 1 if row['RSI'] > 70 and row['close'] < row['SMA_50'] 
        else -1 if row['RSI'] < 30 and row['close'] > row['SMA_50'] 
        else 0, axis=1
    )

    return data
```