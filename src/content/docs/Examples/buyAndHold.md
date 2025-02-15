---
title: Buy and Hold Strategy
---

### Explanation & Rationale  

The **Buy and Hold Strategy** is one of the simplest trading approaches. It assumes that markets generally trend upward over time, making it ideal for long-term investors.  

#### **Key Components:**  
1. **Single Buy Signal:**  
   - The strategy assigns a **buy signal (1) to every date in the dataset**, meaning the position is always long.  
   - There are **no sell signals (-1)** or neutral signals (0).  

2. **No Trading Logic:**  
   - Unlike technical or momentum-based strategies, this approach does not use indicators, moving averages, or price breakouts.  
   - The strategy does not attempt to time the market—**once an asset is bought, it is held indefinitely**.  

3. **Why Use This Strategy?**  
   - **Low Transaction Costs:** Since it avoids frequent buying and selling, transaction fees and taxes are minimized.  
   - **Captures Long-Term Growth:** This strategy works well in assets with **historical long-term growth trends**, such as stock indices (e.g., S&P 500).  
   - **Simplicity & Passive Investing:** It requires no active decision-making, making it attractive for passive investors.  

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

