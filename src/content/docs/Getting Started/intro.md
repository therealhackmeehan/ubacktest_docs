---
title: Introduction
description: Your first trading strategy—let's get started!
---

## Understanding Trading Signals

At its core, your task is simple: **assign a column of buy/sell signals to a table of past stock data.**

### Trading Signal Basics
- **1** → Buy
- **-1** → Short
- **0** → No action

These signals guide the backtesting engine, which applies them to historical data and evaluates the outcome had you traded accordingly.

### What Does This Look Like?
Imagine you have stock data structured like this:

<TABLE>

Your job is to generate a new column of signals. The backtest engine will then simulate trades based on those signals, allowing you to analyze performance, visualize key metrics, and refine your approach.

### Does This Sound Complicated?
No worries! We provide all the resources to help you start backtesting confidently. The core principles are straightforward. In fact, a basic **buy-and-hold** strategy takes just three lines of Python code:

```python
def strategy(data):
    data['signal'] = 1  # Always buy
    return data
```

With this foundation, you're ready to explore and refine your own trading strategies!

