---
title: Buy and Hold Strategy
---

### Explanation & Rationale  

The **Buy and Hold Strategy** is one of the simplest trading approaches. It assumes that markets generally trend upward over time, making it ideal for long-term investors.  

### Code 

```python
'''
Classic Buy & Hold Strategy.

Set a buy signal to every date.
'''

def strategy(data):

    data['signal'] = 1
    return data
```

