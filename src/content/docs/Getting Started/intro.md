---
title: Introduction
description: Your first trading strategy—let's get started!
---

Welcome! We’ll get you started with building your first trading strategy, and don’t worry—it's easier than it sounds!

### What is a Trading Strategy?

At its core, creating a trading strategy means **deciding when to buy, sell, or do nothing**. We do this by assigning **trading signals** to a table of stock data.

### Trading Signal Basics:
- **1** → Buy
- **-1** → Short
- **0** → No Investment

:::tip
You can assign signals to fractional values as well! For instance, a **signal of .5** indicates buying the asset with **half (50%)** the principal in your portfolio, and preserving the other 50% as cash. Learn more (later on)
::: 

These signals will guide the backtesting engine to simulate what would’ve happened if you'd followed those decisions with historical stock data.

### Here’s What It Looks Like:

Your strategy will **parse through historical stock data**, (hopefully) uncover patterns, and generate a **column of signals** that dictate buy/sell actions—just as if you were making decisions in real-time with the data at hand. The end result of signals might look as simple as this:

```
signal
0
1
1
1
1
... 
```

_Don't worry, we will show you how to do this._

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
