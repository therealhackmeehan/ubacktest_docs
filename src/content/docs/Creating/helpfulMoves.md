---
title: Helpful Methods & Indicators
description: A collection of handy metrics and signals that are good to know and use.
---

Here's a collection of essential Pandas functions, tips, tricks, and indicators commonly used in trading metric and signal calculations. Even when not indicators themselves, many of these form the foundation for financial indicators that power buy/sell decisions. 

You'll notice a bunch of the following indicators/metrics make use of the `rolling()` function. Read more about it [here](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html). The `ewm()` method is also integral to many trading indicators. You can read more about it [here](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.ewm.html).

## Basic Utilities and Metrics

### Simple Moving Average (SMA)  
```python
data['sma_10'] = data['close'].rolling(window=10).mean()
```  
Calculates the average closing price over the last 10 periods to smooth out short-term fluctuations. 

### Exponential Moving Average (EMA)  
```python
data['ema_10'] = data['close'].ewm(span=10, adjust=False).mean()
```  
Applies more weight to recent prices, making it more responsive to price changes than SMA. 

### Average Gain  
```python
data['gain'] = data['close'].diff().clip(lower=0).rolling(window=14).mean()
```  
Measures the average positive price changes over a 14-period window.  

### Average Loss  
```python
data['loss'] = -data['close'].diff().clip(upper=0).rolling(window=14).mean()
```  
Measures the average negative price changes over a 14-period window.  

### Relative Strength Index (RSI)  
```python
rs = data['gain'] / data['loss']
data['rsi_14'] = 100 - (100 / (1 + rs))
```  
A momentum indicator that measures the speed and change of price movements, ranging from 0 to 100.  

### Rate of Change (ROC)  
```python
data['roc_10'] = data['close'].pct_change(periods=10) * 100
```  
Measures the percentage change in price over the last 10 periods to identify momentum shifts.  

### Log Returns  
```python
data['log_return'] = np.log(data['close'] / data['close'].shift(1))
```  
Computes the logarithmic return between consecutive closing prices for a normalized measure of returns.  

### Cumulative Return  
```python
data['cumulative_return'] = (1 + data['close'].pct_change()).cumprod()
```  
Tracks the compounded return over time, useful for evaluating long-term performance.  

### Rolling Maximum (Highest Close Over N Days)  
```python
data['rolling_max_20'] = data['close'].rolling(window=20).max()
```  
Finds the highest closing price over the last 20 periods to identify resistance levels.  

### Rolling Minimum (Lowest Close Over N Days)  
```python
data['rolling_min_20'] = data['close'].rolling(window=20).min()
```  
Finds the lowest closing price over the last 20 periods to identify support levels.

## Indicators

Why not take it one step farther while we're at it, and put our Pandas knowledge to the test?

### Commodity Channel Index (CCI)  
```python
data['tp'] = (data['high'] + data['low'] + data['close']) / 3
data['sma_tp'] = data['tp'].rolling(window=20).mean()
data['mad'] = data['tp'].rolling(window=20).apply(lambda x: pd.Series(x).mad())
data['cci_20'] = (data['tp'] - data['sma_tp']) / (0.015 * data['mad'])
```
Measures how far the price is from its average to detect trends.  

### Williams %R (Momentum Indicator)
```python
data['highest_high'] = data['high'].rolling(window=14).max()
data['lowest_low'] = data['low'].rolling(window=14).min()
data['williams_r_14'] = -100 * (data['highest_high'] - data['close']) / (data['highest_high'] - data['lowest_low'])
```
Shows the current price relative to the highest high over 14 periods.  

### Ulcer Index (Risk Indicator) 
```python
data['drawdown'] = (data['close'] - data['close'].cummax()) / data['close'].cummax()
data['ulcer_index'] = data['drawdown'].rolling(window=14).apply(lambda x: (x**2).mean()**0.5)
```
Tracks downside risk by measuring the depth and duration of drawdowns.  

### Chande Momentum Oscillator (CMO)
```python
data['cmo_numerator'] = data['gain'].rolling(window=14).sum() - data['loss'].rolling(window=14).sum()
data['cmo_denominator'] = data['gain'].rolling(window=14).sum() + data['loss'].rolling(window=14).sum()
data['cmo_14'] = 100 * (data['cmo_numerator'] / (data['cmo_denominator'] + 1e-10))
```
Measures trend strength by comparing the sum of gains and losses.  

### Donchian Channels (Breakout Indicator)
```python
data['donchian_high_20'] = data['high'].rolling(window=20).max()
data['donchian_low_20'] = data['low'].rolling(window=20).min()
```
Shows the highest and lowest prices over a set period to detect breakouts.  

### Detrended Price Oscillator (DPO) 
```python
data['sma_20'] = data['close'].rolling(window=20).mean()
data['dpo'] = data['close'].shift(10) - data['sma_20']
```
Removes long-term trends to focus on shorter-term cycles.  

### Chaikin Money Flow (CMF - Volume-Based Indicator)
```python
data['mfm'] = ((data['close'] - data['low']) - (data['high'] - data['close'])) / (data['high'] - data['low'] + 1e-10)
data['mfv'] = data['mfm'] * data['volume']
data['cmf_20'] = data['mfv'].rolling(window=20).sum() / data['volume'].rolling(window=20).sum()
```
Analyzes buying and selling pressure based on price and volume movement.

### Z-Score (Standardized Price Deviation)
```python
data['rolling_mean'] = data['close'].rolling(window=20).mean()
data['rolling_std'] = data['close'].rolling(window=20).std()
data['z_score'] = (data['close'] - data['rolling_mean']) / (data['rolling_std'] + 1e-10)
```
Measures price deviations relative to its mean for spotting outliers.

___

:::tip[Don't Feel Constrained]
These quick Pandas-specific metrics are useful, but feel free to create your own using your logic, NumPy, or other libraries!
:::