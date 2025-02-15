---
title: Advanced Backtest Options
description: Some Optional Options for Ultimate Customizability
---

### Advanced Options

IMAGE HERE.

Click the `advanced options` dropdown to reveal 3 additional customization options.

#### 1. Time @ Which to Trade

Select from `high`, `low`, `open`, or `close` to specify the time you want to execute trades, corresponding to the data column used in your backtest.

For instance, choosing `open` means your strategy is backtested against the stock's opening prices, simulating a trade just after 9:30 AM. By default, `close` is used.

:::danger
Avoid using `high` or `low` for backtesting, as these introduce bias. At the time of the test, you wouldn't know the exact high or low for that period.
:::

#### 2. Trading Cost

This option defines the cost per trade, applied on both **buys** and **sells**. The cost is calculated as a percentage of the trade value. While it may seem insignificant, for high-frequency strategies, trading costs can significantly impact overall performance.

#### 3. Burn-in Period

For strategies relying on historical data (e.g., using a 50-day moving average), you can define a burn-in period, allowing the strategy to “warm up” before the first trade. This ensures the strategy has enough data to generate signals from the start.

> **Example**:  
> If your strategy uses a 50-day moving average, set the burn-in period to 50 days before your selected start date. This gives the strategy time to develop valid signals before the first trading day.

IMAGE COMPARISON HERE.