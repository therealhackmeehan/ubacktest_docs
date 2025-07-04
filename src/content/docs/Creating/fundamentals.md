---
title: Fundamentals
description: What is behind a strategy
---

### What Defines a Strategy?

A trading strategy is a Python function named `strategy` that takes stock data as input and returns the same data with a column of trading signals.

**All strategies, regardless of complexity, follow this structure:**

```python
def strategy(data):

    # Define your strategy logic in here! #

    return data
```

As long as this structure is in place, you can add any logic or helper functions needed to generate trading signals.

:::caution
You must define a function named `strategy`, or your strategy will be invalid and won't run. Always start with this basic skeleton structure!
:::

### Where to Place the Trading Signals?

The returned data must include a column called `signal` (case insensitive) with trading signals. You can (and should) add additional columns for analysis, but the `signal` column is essential.

:::caution
If your table lacks a column named `signal`, your strategy will fail. Our software specifically looks for this column!
:::

Keep reading this documentation to learn more about creating trading signals.

### Using the Strategy

Once defined, your strategy is not tied to a specific stock or date range. It can be applied to any stock, time range, or backtesting setup you choose.

All trades are simulated to execute **at the closing price** to eliminate feedforward bias and ensure that indicators like the high and low of the period remain valid for decision-making. We considered making this configurable, but enforcing execution at close provides a clear and realistic benchmark while preventing lookahead issues in backtesting.