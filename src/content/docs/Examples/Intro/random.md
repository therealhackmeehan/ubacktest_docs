---
title: Random Strategy
---

### Explanation & Rationale  

The Random Strategy assigns a buy, hold, or short signal to each date with equal probability, creating a completely unpredictable trading pattern. This approach provides a baseline for assessing whether structured strategies add value beyond pure chance. While it lacks any market logic, it can help test the robustness of backtesting frameworks and highlight the importance of systematic decision-making in trading.

### Code

```python
'''
Random.

For every date in the table, randomly assign either a 

buy (1),
hold (0),
or short (-1).
Learn more @ docs.ubacktest.com/examples/intro/random
'''

import numpy as np

def strategy(data):
    # use the numpy.random function to choose from the three options
    data['signal'] = np.random.choice([-1, 0, 1], size=len(data))
    return data
```