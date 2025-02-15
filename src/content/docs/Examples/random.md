---
title: Random Strategy
---

### Explanation & Rationale

The **Random Strategy** is a **completely random trading strategy** that assigns a trading signal (buy, hold, or short) for every date in the dataset.

#### **How the Strategy Works:**
1. **Signal Assignment:**
   - For each day in the dataset, the strategy randomly assigns one of three values to the `signal` column:
     - **1** for a **buy** signal.
     - **0** for a **hold** signal (no action).
     - **-1** for a **short** signal.
   - The random signals are generated using **NumPy's `random.choice()` function**, which selects one of the three options with equal probability.

#### **Why Use This Strategy?**
- **Randomness:** This strategy is essentially a **baseline** or **control** strategy to compare against other strategies. It does not rely on any market indicators, trends, or analysis but instead acts purely on random choice.
- **Benchmarking:** It can be used to **benchmark** the performance of other, more sophisticated strategies. If a more complex strategy cannot outperform the Random Strategy, it might indicate that the strategy lacks predictive power or market edge.
- **Experimentation:** This strategy can also serve as a starting point for experimenting with more advanced random or machine-learning-based strategies in the future.

#### **Limitations:**
- **No Predictive Power:** The Random Strategy has no predictive ability and does not consider any **market data** or indicators. It is purely a **stochastic** process.
- **Inefficient:** Since decisions are made randomly, this strategy will typically not yield profitable results over time. It is expected to perform poorly compared to other **rule-based** strategies or those with market analysis backing.
- **Risk of Losses:** With an equal probability of buy, hold, or short, the strategy might **result in frequent losses** due to its random nature.

#### **Who Should Use This Strategy?**
- **Benchmarking and Testing:** This strategy is best used by those testing other strategies to **compare performance** against a random choice model.
- **Beginner or Educational Purposes:** It can be useful for beginners to understand the randomness in decision-making, especially when contrasting the effectiveness of real trading signals.
- **Data Scientists and Researchers:** This strategy can serve as a baseline when developing new **machine learning models** or when testing the impact of randomness versus structured strategies.

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
