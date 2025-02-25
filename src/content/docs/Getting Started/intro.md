---
title: Introduction
description: Your first trading strategy—let's get started!
---

Welcome! We’ll get you started with building your first trading strategy, and don’t worry—it's easier than it sounds!

### What Are Trading Signals?

At its core, creating a trading strategy means **deciding when to buy, sell, or do nothing**. We do this by assigning **trading signals** to a table of stock data.

### Trading Signal Basics:
- **1** → Buy
- **-1** → Short
- **0** → No action

:::tip
You can assign signals to fractional values as well! For instance, a **signal of .5** indicates buying the asset with **half (50%)** the principal in your portfolio.
::: 

These signals will guide the backtesting engine to simulate what would’ve happened if you'd followed those decisions with historical stock data.

### Here’s What It Looks Like:
The backtest engine will supply you with data that looks like this:

```
     high    low     open    close   volume    timestamp
0    1.0034  0.9863  0.9983  1.0000  65434500  1708007400
1    1.0054  0.9881  0.9976  0.9916  49701400  1708093800
2    0.9922  0.9790  0.9887  0.9875  53665600  1708439400
3    0.9947  0.9826  0.9896  0.9916  41529700  1708525800
4    1.0060  0.9924  0.9979  1.0028  52292200  1708612200
...    ...     ...     ...     ...      ...         ...
```

Your goal is to analyze this historical stock data, (hopefully) uncover patterns, and generate a **column of signals** that dictate buy/sell actions—just as if you were making decisions in real-time with the data at hand. These signals might look like:

```
signal
0
1
1
1
1
... 
```

Don't worry, we will show you how to do this.

### What Happens Next?
The backtesting engine will __take these signals and simulate trades__, showing you how a strategy would have performed in the past, without introducing the bias of the future. This gives you the chance to evaluate your approach and refine it to improve your results.

### Does It Sound Hard?
Don't fear! We’re here to make it easy for you. The following is all that is required for a simple **buy-and-hold strategy**:

```python
def strategy(data):
    data['signal'] = 1  # Always buy
    return data
```

That’s it! You can tweak it further as you learn and grow in building more complex strategies. 

Ready to dive in? Let’s get started!
