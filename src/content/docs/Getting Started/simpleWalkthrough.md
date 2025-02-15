---
title: Your First Strategy
description: Walking through a simple strategy  
---

### Introduction  

This guide walks you through a simple example to help you get oriented with the backtesting framework and its core principles. You'll soon see that the possibilities are endless.  

### The Example Strategy  

To start, we’ll implement a very basic strategy: assigning a random trading signal each day.  

The strategy randomly chooses between:  
- **Buy (1)** – Going long on the asset  
- **Short (-1)** – Betting against the asset  

Of course, this is not a strategy you'd want to use in real life, but it's a great way to get familiar with the framework.  

### Strategy Code  

```python title="randomStrategy.py"
'''
Random Trading Strategy

Assigns a random signal (-1 or 1) to each trading day.
'''

import numpy as np

def strategy(data):
    data['signal'] = np.random.choice([-1, 1], size=len(data))
    return data
```

### Understanding the Strategy Function  

Every trading strategy is defined as a Python function named `strategy`. This function:  
1. **Accepts** a table of stock data as input.  
2. **Modifies** the table by adding a `signal` column.  
3. **Returns** the updated table, which the backtesting engine will use.  

The dataset always contains columns such as:  
- `timestamp`, `open`, `close`, `high`, `low`, `volume`  

You can use this data however you like to build and refine your trading strategies.  

### Applying Our Random Strategy  

A valid trading strategy must include a **`signal` column**, which determines whether to buy or short an asset on each trading day.  

In our case, we simply assign random -1 or 1 values to the column. We use the numpy library, and make sure the number of signals is equal to the number of timepoints:

```python
data['signal'] = np.random.choice([-1, 1], size=len(data))
```

Once this is done, we return the modified dataset—**with the `signal` column added**—and the backtest engine takes care of the rest!  

### Running the Strategy in the Editor  

Now that our strategy is ready, let’s run it against real stock data.  

1. Open the **Strategy Editor**.  
2. Select a stock and a date range.  
3. Run the strategy.  

For this example, we'll use **AAPL** stock from **Jan 1, 2022, to Mar 1, 2022**.  

### Backtest Results  

If you've followed along, you'll see a chart displaying your portfolio's performance.  

- The **blue line** represents the trading signals over time.  
- The portfolio starts with **$1** and fluctuates based on the random signals.  
- As expected, a purely random strategy **loses money** due to transaction costs and lack of an edge.  

### Next Steps  

- **Save your results** to compare later.  
- **Try different stocks & time periods** to see variations in performance.  
- **Modify the strategy** to introduce more structure—maybe adding trend-following or mean-reversion rules!  
- **Try one of our many examples!**

### Can I Actually Make Money?  

Maybe. If you're serious about deploying a profitable strategy, check out our **Deployment Section** to learn how to launch strategies with real capital.  

