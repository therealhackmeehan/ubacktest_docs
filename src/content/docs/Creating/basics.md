---
title: Basics
description: What is behind a strategy
---

### What is a Strategy?

A strategy is a Python function named `strategy` that takes stock data as input and returns the same data with a column of trading signals.

**All strategies, regardless of complexity, follow this structure:**

```python
def strategy(data):
    # Define your logic here
    return data
```

As long as this structure is in place, you can add any logic or helper functions needed to generate trading signals.

:::caution
The function must be named `strategy`, or your strategy will be invalid and won't run. Always start with this basic structure!
:::

### Where to Place the Trading Signals?

The returned data must include a column called `signal` (case insensitive) with trading signals. You can add additional columns for analysis, but the `signal` column is essential.

:::caution
If your table lacks a column named `signal`, your strategy will fail. Our software specifically looks for this column!
:::

### Available Stock Data Columns

Every stock data DataFrame includes the following columns:  
`open`, `close`, `high`, `low`, `volume`, and `timestamp`. These are available for use in generating trading signals. Avoid naming any additional columns with these names to preserve their intended use.

### Using the Strategy

Once defined, your strategy is not tied to a specific stock or date range. It can be applied to any stock, time range, or backtesting setup you choose.