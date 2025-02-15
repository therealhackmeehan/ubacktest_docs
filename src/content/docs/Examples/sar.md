---
title: Parabolic SAR Strategy
---

### Explanation & Rationale  

The **Parabolic SAR (Stop and Reverse) Strategy** uses the Parabolic SAR indicator to capture and follow strong price trends, providing clear buy and sell signals based on price movement relative to the SAR line. This trend-following strategy is effective for identifying the direction of the market and making trades during established trends.

#### **Key Components:**  

1. **Parabolic SAR Indicator:**
   - The **Parabolic SAR** is a trend-following indicator that provides potential entry and exit points. It places dots above the price during a bearish trend and below the price during a bullish trend.  
   - The indicator adjusts over time based on price movements, with the **Acceleration Factor (AF)** and **Extreme Point (EP)** influencing how quickly the SAR adapts to changes in the trend.
   - **Buy signal (+1):** Generated when the price is above the Parabolic SAR, indicating a bullish trend.
   - **Sell signal (-1):** Generated when the price is below the Parabolic SAR, indicating a bearish trend.

2. **Parabolic SAR Calculation:**  
   - **Initial SAR:** The first SAR value is set to the low of the first period.
   - If the price is higher than the previous SAR value, the **EP** (Extreme Point) is updated to the highest price (in the case of an uptrend), and the **AF** is increased incrementally, up to a maximum value (max_step).  
   - If the price is lower than the previous SAR value, the **EP** is updated to the lowest price (in the case of a downtrend), and the **AF** is similarly adjusted.

3. **Strategy Logic:**
   - **Buy signal (+1):** A buy signal is generated when the closing price is above the Parabolic SAR, indicating that the price is in an uptrend, and the market is likely bullish.
   - **Sell signal (-1):** A sell signal is triggered when the closing price falls below the Parabolic SAR, signaling the start of a bearish trend.
   - **Hold (0):** There is no explicit hold condition in this simple strategy, as the signals automatically adjust based on trend reversals, with the price moving above or below the SAR.

### Code

```python
'''
Parabolic SAR Strategy.

Buy when the Parabolic SAR is below the price (bullish trend).
Sell when the Parabolic SAR is above the price (bearish trend).
The Parabolic SAR helps capture strong trends by providing entry and exit signals.
'''

import pandas as pd

def calculate_parabolic_sar(data, step=0.02, max_step=0.2):
    sar = data['close'].copy()
    af = step
    ep = data['high'].max()
    sar[0] = data['low'].iloc[0]  # Initial value of SAR
    for i in range(1, len(data)):
        sar[i] = sar[i-1] + af * (ep - sar[i-1])
        if data['close'].iloc[i] > sar[i-1]:
            ep = data['high'].iloc[i]
            af = min(af + step, max_step)
        else:
            ep = data['low'].iloc[i]
            af = min(af + step, max_step)
    return sar

def strategy(data):
    data['SAR'] = calculate_parabolic_sar(data)

    # Generate signals based on SAR trend
    data['signal'] = 0
    data.loc[data['close'] > data['SAR'], 'signal'] = 1  # Buy signal
    data.loc[data['close'] < data['SAR'], 'signal'] = -1  # Sell signal

    return data
```