---
title: RSI with Bollinger Bands Confirmation
---

---

### Explanation & Rationale  

The **RSI with Bollinger Bands Confirmation** strategy integrates two powerful technical indicators: the **Relative Strength Index (RSI)** and **Bollinger Bands**. By combining these indicators, the strategy seeks to enhance the reliability of trade signals, especially in volatile or ranging markets.  

#### **Key Components:**  

1. **RSI Indicator:**
   - The **Relative Strength Index (RSI)** is a momentum oscillator used to identify overbought and oversold conditions, typically with thresholds set at 70 (overbought) and 30 (oversold).
   - **Buy signal (+1):** When the RSI drops below 30, indicating the asset is oversold.
   - **Sell signal (-1):** When the RSI rises above 70, indicating the asset is overbought.

2. **Bollinger Bands:**
   - **Bollinger Bands** consist of a **simple moving average (SMA)** and two **standard deviation bands** above and below the SMA. These bands help identify price volatility and potential overbought or oversold conditions.
   - The upper and lower bands are typically set two standard deviations away from the moving average, representing levels of extreme price movement.

3. **Strategy Logic:**
   - **Buy signal (+1):** Generated when the RSI is below 30 (indicating oversold conditions) **and** the stock price is near the lower Bollinger Band. This condition suggests that the price is low and there is a potential reversal.
   - **Sell signal (-1):** Generated when the RSI is above 70 (indicating overbought conditions) **and** the stock price is near the upper Bollinger Band. This condition indicates that the stock may be overpriced and due for a pullback.
   - **Hold (0):** When neither buy nor sell conditions are met, the strategy does not trigger any trades, avoiding unnecessary actions during uncertain price movements.

4. **Trade Confirmation:**
   - The **Bollinger Bands** act as a confirmation tool for the RSI signals. In ranging or choppy markets, the RSI might give false signals. However, confirming the RSI signals with price proximity to the Bollinger Bands (either upper or lower) filters out some of these false positives.

### Code

```python
'''
Buy Low, Sell High with Bollinger Bands.

Sell stock when RSI crosses above 70 **and** the price is near the upper Bollinger Band.
Buy stock when RSI crosses below 30 **and** the price is near the lower Bollinger Band.
This helps avoid false RSI signals in ranging markets.
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

def calculate_bollinger_bands(series, window=20, num_std=2):
    sma = series.rolling(window=window).mean()
    std = series.rolling(window=window).std()
    
    upper_band = sma + (std * num_std)
    lower_band = sma - (std * num_std)

    return upper_band, lower_band

def strategy(data):
    data['RSI'] = calculate_rsi(data['close'], window=14)
    data['Upper_Band'], data['Lower_Band'] = calculate_bollinger_bands(data['close'], window=20)

    # Generate signals with Bollinger Band confirmation
    data['signal'] = data.apply(
        lambda row: 1 if row['RSI'] > 70 and row['close'] >= row['Upper_Band'] 
        else -1 if row['RSI'] < 30 and row['close'] <= row['Lower_Band'] 
        else 0, axis=1
    )

    return data
```