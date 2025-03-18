---
title: Bollinger Bands Strategy
---

### Explanation & Rationale  

The Bollinger Bands Strategy capitalizes on the tendency of stock prices to revert to their mean after reaching extreme levels. It generates buy signals when the price moves back above the lower Bollinger Band, suggesting a potential upward reversal, and short signals when the price falls below the upper band, indicating a possible downward move. This approach assumes that price fluctuations are often temporary and that prices tend to oscillate within the bands rather than trending indefinitely.

### How to Make It Your Own

### Code

```python
'''
Bollinger Bands Strategy.

Buy stock when the price dips then moves up through the lower Bollinger Band.
Short stock when the price pops and then falls below the upper Bollinger Band.
This strategy assumes mean reversion.
Learn more @ docs.ubacktest.com/examples/bollinger-bands/bollinger
'''

import pandas as pd
import numpy as np

def calculate_bollinger_bands(series, window=20, num_std=2):

    # construct bollinger bands (moving avg +/- std)
    sma = series.rolling(window=window).mean()
    std = series.rolling(window=window).std()
    
    upper_band = sma + (std * num_std)
    lower_band = sma - (std * num_std)

    return upper_band, lower_band

def strategy(data):
    data['Upper_Band'], data['Lower_Band'] = calculate_bollinger_bands(data['close'], window=20)

    # Initialize 'signal' column
    data['signal'] = np.nan  # Start with NaN

    # Assign signals where close notches back across threshold
    data.loc[(data['close'].shift(1) < data['Lower_Band'].shift(1)) & (data['close'] > data['Lower_Band']), 'signal'] = 1
    data.loc[(data['close'].shift(1) > data['Upper_Band'].shift(1)) & (data['close'] < data['Upper_Band']), 'signal'] = -1

    return data
```