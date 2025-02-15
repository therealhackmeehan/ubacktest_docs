---
title: Backtest Options
description: Running and Customizing a Basic Backtest
---

### Mandatory Options

IMAGE HERE.

To run a backtest, you must specify 4 mandatory options:

#### 1. Symbol

Choose the stock you want to backtest. We support the top ~10,000 most popular stocks.

:::caution
Ensure the stock has been publicly listed during your chosen date range. If you select a stock that went bankrupt before the start date, you will encounter an error when attempting to fetch data or run the test.
:::

#### 2. Start Date

Select the date/time for the backtest to begin. Your first data point will be **after** this date, not on it (i.e., the start date is exclusive).

#### 3. End Date

Choose when you'd like to stop the backtest, exit all positions, and view the results.

#### 4. Trading Frequency

Set how often you want to execute trades, within market hours.

### Random Selection

If you prefer a random stock from the S&P 500 and a random time interval (between 1 month and 1 year), you can select this option. Be aware that errors may arise if the random time interval doesn’t align with the stock’s IPO or availability.

### Reset Button

Press the reset button to return to the default backtest settings:

- **Symbol:** AAPL  
- **Start Date:** 6 months ago  
- **End Date:** Today  
- **Trading Frequency:** 1 day  