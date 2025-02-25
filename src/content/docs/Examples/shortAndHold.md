---
title: Short and Hold
---

### Explanation & Rationale  

The **Short and Hold Strategy** is one of the simplest yet aggressive trading approaches, focusing solely on short-selling. The strategy assigns a fixed short position to every trading day, regardless of the market conditions or price movements.

### Code

```python
'''
Short and Hold Strategy.

For every date, assign a shorted position of -1.
'''

def strategy(data):

    data['signal'] = -1
    return data
```