---
title: Bollinger Bands with Moving Average Confirmation
---

### Explanation & Rationale  

This strategy refines traditional Bollinger Bands trading by incorporating the 50-day SMA to align trades with the broader trend. Buy signals are only generated when the price rebounds from the lower Bollinger Band while staying above the SMA, ensuring trades occur in an overall uptrend, while sell signals require a price drop from the upper band while remaining below the SMA, reinforcing a downtrend. This filter helps avoid counter-trend trades, improving the probability of success by ensuring trades follow the prevailing market direction.

### How to Make It Your Own

### Code

```python
'''
Bollinger Bands Strategy with Moving Average Confirmation.

Sell stock when the price is above the upper Bollinger Band **and** below the 50-day SMA.
Buy stock when the price is below the lower Bollinger Band **and** above the 50-day SMA.
This ensures we trade in the direction of the larger trend.
Learn more @ docs.ubacktest.com/examples/bollinger-bands/bollingersma
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

def calculate_sma(series, window=12):
    return series.rolling(window=window).mean()

def strategy(data):
    data['Upper_Band'], data['Lower_Band'] = calculate_bollinger_bands(data['close'], window=20)
    data['SMA_50'] = calculate_sma(data['close'], window=50)

    # Initialize 'signal' column
    data['signal'] = np.nan  # Start with NaN

    # Buy signal: Price crosses up through the lower band but remains under SMA_50
    data.loc[
        (data['close'].shift(1) < data['Lower_Band'].shift(1)) & (data['close'] > data['Lower_Band']) &
        (data['close'] < data['SMA_50']),
        'signal'
    ] = 1

    # Sell signal: Price crosses down from the upper band but remains above SMA_50
    data.loc[
        (data['close'].shift(1) > data['Upper_Band'].shift(1)) & (data['close'] < data['Upper_Band']) &
        (data['close'] > data['SMA_50']),
        'signal'
    ] = -1

    return data
```