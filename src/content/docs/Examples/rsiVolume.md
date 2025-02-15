---
title: RSI with Volume Confirmation
---

### Explanation & Rationale  

The **RSI with Volume Confirmation** strategy enhances traditional **RSI-based trading signals** by incorporating **volume data** to ensure that price movements are supported by strong trading activity. This strategy helps to validate the strength of price movements, preventing trades that lack sufficient market momentum.

#### **Key Components:**  

1. **RSI Indicator:**
   - The **Relative Strength Index (RSI)** is a momentum oscillator used to identify overbought and oversold conditions, typically with a threshold of 70 (overbought) and 30 (oversold).
   - **Buy signal (+1):** Generated when the RSI crosses below 30, indicating the asset is oversold and potentially due for a reversal.
   - **Sell signal (-1):** Generated when the RSI crosses above 70, indicating the asset is overbought and could be due for a pullback.

2. **Volume Confirmation:**
   - The **50-day average volume** is calculated to understand the stock's typical trading activity. This serves as a baseline to evaluate whether current volume levels are above average.
   - **Volume Confirmation:** Ensures that trades are only made when volume is **above** the 50-day moving average, indicating that there is sufficient market participation to support the price movement.
   - **Buy signal (+1):** Generated when the RSI is below 30 (indicating an oversold condition) **and** the volume is above its 50-day average, ensuring that the buy signal is supported by increased market interest.
   - **Sell signal (-1):** Generated when the RSI is above 70 (indicating an overbought condition) **and** the volume is above its 50-day average, confirming that the sell signal is backed by strong momentum.

3. **Strategy Logic:**
   - **Buy signal (+1):** When the RSI drops below 30 (oversold) and the volume is above the 50-day average, suggesting that the stock may be ready for a rebound with strong buying pressure.
   - **Sell signal (-1):** When the RSI rises above 70 (overbought) and the volume is above the 50-day average, indicating that the stock is likely to face a reversal with significant selling pressure.
   - **Hold (0):** When neither of the conditions is met, the strategy avoids executing any trades, reducing the likelihood of acting on weak or unsustained price movements.

### Code

```python
'''
Buy Low, Sell High with Volume Confirmation.

Sell stock when RSI crosses above 70 **and** volume is above its 50-day average.
Buy stock when RSI crosses below 30 **and** volume is above its 50-day average.
This ensures strong momentum behind the signals.
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
    data['Avg_Volume'] = data['volume'].rolling(window=50).mean()

    # Generate signals with volume confirmation
    data['signal'] = data.apply(
        lambda row: 1 if row['RSI'] > 70 and row['volume'] > row['Avg_Volume'] 
        else -1 if row['RSI'] < 30 and row['volume'] > row['Avg_Volume'] 
        else 0, axis=1
    )

    return data
```