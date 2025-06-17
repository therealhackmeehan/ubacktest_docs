---
title: Buy and Hold Strategy
---

### Explanation & Rationale  

The Classic Buy & Hold Strategy is a long-term investment approach where an asset is purchased and held without attempting to time the market. By setting a buy signal for every date, this strategy ensures continuous exposure to the asset, avoiding short-term fluctuations and benefiting from long-term appreciation. This simple yet effective approach is widely used by passive investors seeking to reduce trading costs and maximize compounding returns over time.

### Code

```python
'''
Classic Buy & Hold Strategy. 

Set a buy signal to every date.
Learn more @ docs.ubacktest.com/examples/intro/buyandhold
'''

def strategy(data):
    data['signal'] = 1
    return data
```