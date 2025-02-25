---
title: (More) Random Strategy
---

### Explanation & Rationale

The **(More) Random Strategy** is a **randomized trading strategy** where the signals for buying, selling, or holding are **chosen randomly** within a specified range. This strategy is designed to randomly assign a value between -1 and 1 for every date.

### Code

```python
'''
(More) Random Strategy.

For every date, choose a random float value between -1 and 1.
'''

import numpy as np

def strategy(data):

    numberOfDates = len(data)
    data['signal'] = np.random.uniform(-1, 1, size=numberOfDates)

    return data
```