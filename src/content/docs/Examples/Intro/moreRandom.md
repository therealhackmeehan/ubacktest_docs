---
title: (More) Random Strategy
---

### Explanation & Rationale  

The (More) Random Strategy assigns a random float between -1 and 1 to each date, simulating an entirely unpredictable trading approach. This method serves as a useful benchmark for evaluating whether structured strategies outperform pure randomness in generating returns. While not a viable trading strategy on its own, it provides insight into market efficiency and the role of randomness in financial outcomes.

### How to Make It Your Own

### Code

```python
'''
(More) Random Strategy.

For every date, choose a random float value between -1 and 1.
Learn more @ docs.ubacktest.com/examples/intro/morerandom
'''

import numpy as np

def strategy(data):
    data['signal'] = np.random.uniform(-1, 1, size=len(data))
    return data
```