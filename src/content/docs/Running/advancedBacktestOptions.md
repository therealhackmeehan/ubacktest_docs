---
title: Advanced Backtest Options
description: Some Optional Options for Ultimate Customizability
---

### Advanced Options

IMAGE HERE.

Press the `advanced options` dropdown, and you will see 3 more options.

#### 1. Time @ Which To Trade

You can select `high`, `low`, `open`, or `close`.

This specifies the time at which you execute your trade, or the column of data that you were to use in the backtest.

For example, if you were to select `open`, you would be backtesting your strategy against the stocks opening prices and simulating as if you were to place the trade just after 9:30:00 AM. `close` is the default.

:::danger
It is advised that you do not use the `high` or `low` columns to run your strategy because that introduces bias. Think about it... at the time of the test, how would you know when you're at the `high` or `low`?
:::

#### 2. Trading Cost

Just as you'd expect, this value outlines the cost per trade execution. This trading cost is applied at both **buys** and **sells**. It is calculated as a percentage of the trade's value. 

This trading cost may not seem like a lot, but for strategies that you planned to execute on a frequent basis, it can have disastrous effects!!

#### 3. Burn-in Period

For strategies that require a fair amount of previous stock data, in order to calculate a signal at the previous day, you may want to specify an approximate burn in period that gives the strategy plenty of time develop even before the first day of trading.

> For example:
> You are creating a strategy that relies on a 50-day moving average. Instead of waiting until day 50 for your strategy to become valid, specify a burnin date about 50 days prior to that of the start date that you've selected.

Image comparison.
