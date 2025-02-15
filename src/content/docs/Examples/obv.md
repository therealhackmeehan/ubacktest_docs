---
title: On-Balance Volume Strategy
---

### Explanation & Rationale

The **On-Balance Volume (OBV) Strategy** is a **momentum-based trading strategy** that uses the **On-Balance Volume** indicator in combination with a **20-day Simple Moving Average (SMA)** to generate buy and sell signals.

#### **How the Strategy Works:**
1. **On-Balance Volume (OBV) Calculation:**  
   - OBV is a volume-based indicator that **adds or subtracts volume** based on whether the price closed higher or lower compared to the previous day.
   - If the price closes higher, the volume for that day is added to the OBV.
   - If the price closes lower, the volume is subtracted.
   - If the price closes unchanged, the OBV remains the same.
   - The OBV is a **cumulative sum** of these values, providing a picture of the **volume flow** in the market.

2. **Simple Moving Average of OBV:**  
   - A **20-day SMA** of the OBV is used to smooth out the OBV values and identify the underlying trend.  
   - This helps to filter out short-term fluctuations and focus on the longer-term momentum.

3. **Signal Generation:**  
   - **Buy Signal:** The strategy generates a **buy signal** when the OBV crosses **above** the 20-day SMA, indicating a potential **bullish breakout** supported by rising volume.
   - **Sell Signal:** Conversely, a **sell signal** occurs when the OBV crosses **below** the 20-day SMA, indicating **bearish confirmation** and potential trend reversal.

#### **Why Use This Strategy?**
- **Volume as a Leading Indicator:** OBV incorporates volume data, which can be a **leading indicator** of price movement. Volume often precedes price action, and large movements in OBV may signal an impending price change.
- **Trend Confirmation:** The strategy uses OBV crossovers with a moving average to **confirm momentum** and generate signals when momentum is strong enough to justify a trade.
- **Momentum Trading:** It is designed to capture **momentum** in the market, relying on the assumption that significant moves in volume often precede significant price moves.

#### **Limitations:**
- **False Signals:** Like any momentum strategy, the OBV strategy can generate **false signals** during periods of low volatility or sideways market action.
- **Volume Manipulation:** The OBV indicator assumes that volume is a true reflection of market sentiment, but in some cases, **volume spikes** may be caused by market manipulation or large institutional trades, which can skew the signal.
- **Lagging Indicator:** While OBV can provide early insights into volume trends, it still operates with **lag**, as it reacts to price movements and volume changes after they occur.

#### **Who Should Use This Strategy?**
- **Momentum Traders:** This strategy is suitable for traders looking to **capture trends** based on volume confirmation.
- **Intermediate to Advanced Traders:** Since the strategy involves interpreting volume trends and market momentum, it is more appropriate for traders who understand these dynamics.

### Code

```python
'''
On-Balance Volume (OBV) Strategy.

Buy when the OBV crosses above the 20-day SMA (bullish confirmation).
Sell when the OBV crosses below the 20-day SMA (bearish confirmation).
OBV helps to capture momentum with volume as a leading indicator.
'''

import pandas as pd

def calculate_obv(data):
    obv = [0]
    for i in range(1, len(data)):
        if data['close'].iloc[i] > data['close'].iloc[i-1]:
            obv.append(obv[-1] + data['volume'].iloc[i])
        elif data['close'].iloc[i] < data['close'].iloc[i-1]:
            obv.append(obv[-1] - data['volume'].iloc[i])
        else:
            obv.append(obv[-1])
    return pd.Series(obv, index=data.index)

def calculate_sma(series, window=20):
    return series.rolling(window=window).mean()

def strategy(data):
    data['OBV'] = calculate_obv(data)
    data['SMA_20'] = calculate_sma(data['OBV'])

    # Generate signals based on OBV crossover
    data['signal'] = 0
    data.loc[data['OBV'] > data['SMA_20'], 'signal'] = 1  # Buy signal
    data.loc[data['OBV'] < data['SMA_20'], 'signal'] = -1  # Sell signal

    return data
```