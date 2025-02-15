---
title: Stochastic Oscillator Strategy
---

### Explanation & Rationale

The **Stochastic Oscillator Strategy** is designed to identify overbought and oversold conditions in the market, helping traders capture potential momentum reversals. It uses the **%K** and **%D** lines of the stochastic oscillator, a momentum indicator, to generate buy and sell signals based on specific conditions.

#### **Key Components:**

1. **Stochastic Oscillator (%K and %D):**
   - The **%K** line is a measure of the current price's position relative to the highest high and the lowest low over a specified period (typically 14 days). It indicates the momentum of the price movement.
   - The **%D** line is the 3-day moving average of the %K line, smoothing the signal to help identify trend changes.
   - Both %K and %D oscillate between 0 and 100, and values above 80 indicate overbought conditions, while values below 20 indicate oversold conditions.

   The **Stochastic Oscillator** is calculated as follows:
   ```python
   stoch_k = 100 * (data['close'] - low_min) / (high_max - low_min)
   stoch_d = stoch_k.rolling(window=3).mean()  # 3-day moving average of %K
   ```

2. **Signal Generation:**
   - **Buy Signal (Oversold Reversal):** A buy signal is generated when the **%K** line crosses above the **%D** line while both lines are below 20 (indicating oversold conditions). This suggests a potential reversal of the downward momentum.
   
     ```python
     data.loc[(data['%K'] < 20) & (data['%K'] > data['%D']), 'signal'] = 1  # Buy signal
     ```
   
   - **Sell Signal (Overbought Reversal):** A sell signal is generated when the **%K** line crosses below the **%D** line while both lines are above 80 (indicating overbought conditions). This suggests a potential reversal of the upward momentum.
   
     ```python
     data.loc[(data['%K'] > 80) & (data['%K'] < data['%D']), 'signal'] = -1  # Sell signal
     ```
     
### Code

```python
'''
Stochastic Oscillator Strategy.

Buy when the %K line crosses above the %D line below 20 (oversold condition).
Sell when the %K line crosses below the %D line above 80 (overbought condition).
This strategy helps capture momentum reversals.
'''

import pandas as pd

def calculate_stochastic_oscillator(data, window=14):
    low_min = data['low'].rolling(window=window).min()
    high_max = data['high'].rolling(window=window).max()
    stoch_k = 100 * (data['close'] - low_min) / (high_max - low_min)
    stoch_d = stoch_k.rolling(window=3).mean()  # 3-day moving average of %K
    return stoch_k, stoch_d

def strategy(data):
    data['%K'], data['%D'] = calculate_stochastic_oscillator(data)

    # Generate signals based on stochastic crossover
    data['signal'] = 0
    data.loc[(data['%K'] < 20) & (data['%K'] > data['%D']), 'signal'] = 1  # Buy signal
    data.loc[(data['%K'] > 80) & (data['%K'] < data['%D']), 'signal'] = -1  # Sell signal

    return data
```