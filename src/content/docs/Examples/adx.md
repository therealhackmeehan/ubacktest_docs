---
title: ADX Indicator Strategy
---

### Explanation & Rationale  

The **Average Directional Index (ADX) Indicator Strategy** is designed to identify strong trends and generate buy/sell signals based on trend strength. The strategy uses three key components:  

1. **+DI (Positive Directional Indicator):** Measures the strength of upward movement.  
2. **-DI (Negative Directional Indicator):** Measures the strength of downward movement.  
3. **ADX (Average Directional Index):** Quantifies trend strength, regardless of direction.  

#### **Key Components:**  
1. **Trend Confirmation with ADX:**  
   - The ADX value indicates whether the market is trending or ranging.  
   - If ADX is **above 25**, it signals a strong trend, making trend-following trades more reliable.  

2. **Entry & Exit Conditions:**  
   - **Buy Signal (+1):** When the **+DI crosses above -DI** and ADX is above 25, indicating a strong uptrend.  
   - **Sell Signal (-1):** When the **-DI crosses above +DI** and ADX is above 25, indicating a strong downtrend.  
   - If ADX is below 25, the market is considered weak or ranging, so no trades are taken.  

3. **Filtering Out Weak Trends:**  
   - Many trend-following strategies suffer from false signals in choppy markets.  
   - The ADX filter ensures that trades are only taken when a strong trend exists, improving signal quality and reducing whipsaws.  

### Code

```python
'''
ADX Trend Strength Strategy.

Buy when the +DI crosses above the -DI and the ADX is above 25 (strong uptrend).
Sell when the -DI crosses above the +DI and the ADX is above 25 (strong downtrend).
The ADX helps to confirm the strength of a trend.
'''

import pandas as pd

def calculate_adx(data, window=14):
    high = data['high']
    low = data['low']
    close = data['close']

    up_move = high.diff()
    down_move = low.diff().abs()

    plus_dm = (up_move.where(up_move > down_move, 0)).rolling(window=window).sum()
    minus_dm = (down_move.where(down_move > up_move, 0)).rolling(window=window).sum()

    tr = pd.concat([high - low, (high - close.shift()).abs(), (low - close.shift()).abs()], axis=1).max(axis=1)
    atr = tr.rolling(window=window).mean()

    plus_di = (plus_dm / atr) * 100
    minus_di = (minus_dm / atr) * 100
    adx = (abs(plus_di - minus_di) / (plus_di + minus_di)).rolling(window=window).mean() * 100

    return plus_di, minus_di, adx

def strategy(data):
    data['+DI'], data['-DI'], data['ADX'] = calculate_adx(data)

    # Generate signals based on ADX trend strength
    data['signal'] = 0
    data.loc[(data['+DI'] > data['-DI']) & (data['ADX'] > 25), 'signal'] = 1  # Buy signal
    data.loc[(data['-DI'] > data['+DI']) & (data['ADX'] > 25), 'signal'] = -1  # Sell signal

    return data
```

