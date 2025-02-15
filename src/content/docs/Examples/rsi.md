---
title: RSI Indicator Strategy
---

### Explanation & Rationale

The **RSI Indicator Strategy** is based on the **Relative Strength Index (RSI)**, a momentum oscillator that measures the speed and change of price movements. The strategy follows the principle of **buying low and selling high** by using the RSI levels.

#### **How the Strategy Works:**
1. **RSI Calculation:**
   - The **RSI** formula uses a window (commonly 14 periods) to calculate the **average gain** and **average loss** over the specified period.
   - **RSI Values** range from 0 to 100. An RSI value above 70 typically indicates that a stock is **overbought**, while an RSI value below 30 indicates that the stock is **oversold**.

2. **Signal Generation:**
   - The strategy generates buy or sell signals based on RSI:
     - **Buy signal (1):** When the RSI drops below 30 (indicating an oversold condition, suggesting a potential buying opportunity).
     - **Sell signal (-1):** When the RSI rises above 70 (indicating an overbought condition, suggesting a potential selling opportunity).
     - **Hold signal (0):** When the RSI is between 30 and 70, indicating a neutral condition where no action is taken.

#### **Why Use This Strategy?**
- **Contrarian Approach:** The strategy follows a **contrarian** approach, betting on price reversals when stocks are overbought or oversold. It assumes that after hitting extreme RSI levels, price movements are likely to reverse, presenting a good opportunity to trade.
- **Momentum Trading:** By using the RSI to identify overbought and oversold levels, this strategy aims to capitalize on **momentum** shifts in the market.
- **Widely Used:** The RSI is one of the most **popular and widely used indicators** in technical analysis, making this strategy accessible to many traders and investors.

#### **Why 30 and 70 for the RSI Levels?**
- **30 and 70 Levels:** These are standard levels widely accepted in the industry as indicators of overbought and oversold conditions.
  - **RSI > 70**: The stock is considered **overbought**, signaling a potential sell (bearish signal).
  - **RSI < 30**: The stock is considered **oversold**, signaling a potential buy (bullish signal).

#### **Limitations:**
- **False Signals:** The strategy can generate **false signals** during strong trends. For example, in a strong uptrend, the RSI may stay above 70 for an extended period without the price reversing.
- **Lagging Indicator:** The RSI is a **lagging indicator**, meaning that it may not react quickly enough to sudden market changes, potentially causing delays in entry or exit.
- **No Trend Consideration:** This strategy does not account for the prevailing market trend. It can be less effective during trending periods where prices stay overbought or oversold for extended periods.

#### **Who Should Use This Strategy?**
- **Contrarian Traders:** This strategy is ideal for traders who believe in **mean reversion**, where extreme price movements (overbought/oversold conditions) are expected to revert back to normal levels.
- **Momentum Traders:** Traders who follow **momentum** and want to act when a trend is showing signs of exhaustion (overbought or oversold) may find this strategy useful.
- **Beginner Traders:** The strategy is relatively simple and straightforward, making it an excellent starting point for traders new to technical indicators.

### Code

```python
'''
Buy Low, Sell High.

Sell stock when the Relative Strength Index (RSI) cracks above 70.
Buy stock when the RSI breaks below 30.
'''

import pandas as pd

def calculate_rsi(series, window):
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

    # Generate signals
    data['signal'] = data['RSI'].apply(lambda x: 1 if x > 70 else -1 if x < 30 else 0)

    return data
```