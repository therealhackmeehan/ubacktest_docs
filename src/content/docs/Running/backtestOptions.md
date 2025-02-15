---
title: Backtest Options
description: Running and Customizing a Basic Backtest
---

### Mandatory Options

IMAGE HERE.

All backtests require you to specify 4 mandatory options.

#### 1. Symbol

The stock you'd like to backtest against. We support the top ~10,000 most popular stocks.

:::caution
Make sure the stock that you have selected exists, or has gone public, in between the start and end date. As expected, you will receive an error if you try to gather data and run a test on a stock that has gone bankrupt several years prior.
:::

#### 2. Start Date

The day/time which you'd like to start the backtest. Your first data point will occur _after_ this data point, not _on_ this data point. (I.E. Not Inclusive)

#### 3. End Date

The day/time which you'd like to pause your strategy, exit all positions, and see what you've got.

#### 4. Trading Frequency

As it sounds, this controls the frequency at which you place your trade, constrained to within market hours.

### Random Selection

If you'd like to select a random stock in the S&P 500, alongside a random time interval, ranging between 1 month and 1 year. 

Do note that you will receive errors in this selection, because the random time interval may not align with the random's stock IPO or availability.

### Reset Button

To reset the backtest defaults, press this button.

This will provide you with the following defaults:

- **Symbol:** AAPL
- **StartDate:** 6 Months Ago
- **EndDate:** Today
- **Trading Frequency:** 1 day
