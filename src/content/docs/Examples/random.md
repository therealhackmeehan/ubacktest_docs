---
title: Random Strategy
---

### Explanation & Rationale

The **Random Strategy** is a **completely random trading strategy** that assigns a trading signal (buy, hold, or short) for every date in the dataset.

### Code

```python
'''
Random.

For every date in the table, randomly assign either a 

buy (1),
hold (0),
or short (-1).
'''

import numpy as np

def strategy(data):

    # use the numpy.random function to choose from the three options.
    data['signal'] = np.random.choice([-1, 0, 1], size=len(data))
    return data
```
