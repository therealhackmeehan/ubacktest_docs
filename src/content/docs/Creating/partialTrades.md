---
title: Partial Portfolio Allocation
description: Simulate maintaining some of your portfolio as cash.
---

### No Need to Go All In.

In real-world trading, it’s often wise to avoid committing your entire portfolio to a single position. This page covers the principles and strategies behind trading with a fraction of your portfolio (I.E. _50%_) while keeping the remainder in cash.  

### What Does a Fractional Signal of **0.5** Really Mean?  

A signal of **0.5** represents allocating **50% of your portfolio** to a position while keeping the other 50% in cash. It’s a way to maintain exposure to the market while managing risk:

```python
data['signal'] = .5
```

:::note
Your signal doesn't have to be __.5__! Trading signals can even be specified up to four decimal places.  

For example, to allocate **12.23%** of your portfolio, set the signal to **.1223**. To allocate **55%** of your portfolio, set the signal to **.55**. You get the point.
:::

### What Do **Consecutive Signals of 0.5** Mean?  

If a strategy produces a **0.5 signal multiple days in a row**, it does **not** mean that the portfolio is rebalancing daily. Instead, it means:  

- **On the first day**, 50% of the portfolio is allocated to the position.  
- **On subsequent days**, no further action is taken unless the signal changes.  

This is identical to a signal of **1** over multiple days, where the portfolio is fully invested once and then held steady.  

The portfolio only rebalances when the signal **changes**—whether to **0.6**, **0.4**, or even **0.501**. Any shift triggers an adjustment to the portfolio's allocation.  

### To Summarize

A **$10,000 portfolio** with a **0.5 trading signal** will be allocated as follows:  

- **$5,000 invested** in the selected asset  
- **$5,000 held in cash**  

This allocation remains unchanged until the signal shifts away from .5, triggering a rebalance.

### A Note on Examples

Most of our examples focus on **all-in trading signals** of **-1 or 1**, but we're expanding on this!  

Check out [this example](/examples/rsi/scaledrsi/) for inspiration on **scaling your allocation** based on confidence.  

This feature can be **incredibly useful**—whether you're making a full buy-in or a more cautious allocation. We encourage you to experiment with the existing examples and introduce **middle-ground cases** where your signals are less decisive than a full commitment.