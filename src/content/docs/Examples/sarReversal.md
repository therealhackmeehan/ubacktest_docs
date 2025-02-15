---
title: Parabolic SAR Trend Reversal
---

### Explanation & Rationale  

The **Parabolic SAR Trend Reversal Strategy** aims to capture potential trend reversals using the Parabolic SAR indicator. This strategy generates buy and sell signals based on price movement crossing the SAR line, which helps to identify shifts in market trends, providing timely entry and exit points for traders.

#### **Key Components:**  

1. **Parabolic SAR Indicator:**
   - The **Parabolic SAR** helps identify the direction of the market and potential trend reversals. When the price crosses above the SAR, it signals a potential bullish reversal, and when the price crosses below the SAR, it indicates a potential bearish reversal.
   - The **Acceleration Factor (AF)** and **Extreme Point (EP)** are critical in determining the speed at which the SAR moves with the price. The AF increases gradually, but it is capped at a **max_step** to prevent excessive acceleration in volatile markets.

2. **Parabolic SAR Calculation:**  
   - The SAR calculation follows the same principle as other Parabolic SAR strategies, but with added logic to switch the trend when the price crosses the SAR.
   - In an **uptrend**, the SAR is adjusted upward as the price increases, and it will never go below the previous period’s low. If the price falls below the SAR, the trend is considered to reverse, switching to a **downtrend**.
   - In a **downtrend**, the SAR is adjusted downward as the price decreases and will never go above the previous period’s high. If the price rises above the SAR, the trend switches back to an **uptrend**.

3. **Strategy Logic:**
   - **Buy signal (+1):** A buy signal is generated when the price crosses above the Parabolic SAR, indicating a potential bullish reversal.
   - **Sell signal (-1):** A sell signal is generated when the price crosses below the Parabolic SAR, signaling a potential bearish reversal.
   - **Hold (0):** If the price does not cross the SAR, no trade signal is generated.

4. **Trend Reversal Confirmation:**
   - This strategy is focused on capturing trend reversals, making it well-suited for volatile markets where trend shifts can lead to significant profit opportunities.
   - The switching of trend direction upon a price crossover ensures the strategy remains adaptive to changing market conditions, with entry points only triggered after a trend reversal is confirmed.

### Code

```python
'''
Parabolic SAR Trend Reversal Strategy.

Buy when the price crosses above the Parabolic SAR (bullish reversal).
Sell when the price crosses below the Parabolic SAR (bearish reversal).
Parabolic SAR helps identify potential trend reversals.
'''

import pandas as pd

def calculate_parabolic_sar(data, step=0.02, max_step=0.2):
    sar = data['close'].copy()
    uptrend = True
    ep = data['high'].max()  # Extreme point
    af = step  # Acceleration factor
    sar.iloc[0] = data['low'].iloc[0]
    
    for i in range(1, len(data)):
        sar.iloc[i] = sar.iloc[i-1] + af * (ep - sar.iloc[i-1])
        
        if uptrend:
            sar.iloc[i] = min(sar.iloc[i], data['low'].iloc[i-1])  # Prevent SAR from going below previous low
            if data['close'].iloc[i] < sar.iloc[i]:
                uptrend = False
                ep = data['low'].iloc[i]  # Switch to downtrend
                sar.iloc[i] = ep
        else:
            sar.iloc[i] = max(sar.iloc[i], data['high'].iloc[i-1])  # Prevent SAR from going above previous high
            if data['close'].iloc[i] > sar.iloc[i]:
                uptrend = True
                ep = data['high'].iloc[i]  # Switch to uptrend
                sar.iloc[i] = ep
                
        af = min(af + step, max_step)
    
    return sar

def strategy(data):
    data['SAR'] = calculate_parabolic_sar(data)

    # Generate signals based on Parabolic SAR crossovers
    data['signal'] = 0
    data.loc[data['close'] > data['SAR'], 'signal'] = 1  # Buy signal
    data.loc[data['close'] < data['SAR'], 'signal'] = -1  # Sell signal

    return data
```