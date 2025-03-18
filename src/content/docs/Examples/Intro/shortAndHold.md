---
title: Short and Hold Strategy
---

### Explanation & Rationale

The **Short and Hold Strategy** is the inverse of the classic buy-and-hold approach, maintaining a constant short position on an asset. This strategy profits from declining prices but carries unlimited risk if the asset appreciates over time. While rarely used in isolation, it can serve as a stress test for bearish market conditions or as part of a hedging strategy.

### How to Make It Your Own

### Code

```python
'''
Short and Hold Strategy.

For every date, assign a shorted position of -1.
Learn more @ docs.ubacktest.com/examples/intro/shortandhold
'''

def strategy(data):
    data['signal'] = -1
    return data
```