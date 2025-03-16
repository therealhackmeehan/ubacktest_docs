---
title: Common Pitfalls
description: Some things to be aware of...
---

:::danger  
##### If a strategy seems too good to be true, it probably is.  
:::  

### Be Skeptical and Critical  

If your backtests show consistent double or triple-digit returns, you might be unintentionally introducing flaws that inflate performance. Here’s what to watch out for:

### 1. Lookahead Bias  

Using future data in your strategy, even unintentionally, makes your results unrealistic.  

> **Example:**  
> A moving average that incorporates future prices rather than lagging behind can give your strategy unfair foresight, making it seem far more effective than it actually is.  

### 2. Survivorship Bias  

If you're only testing on stocks that have done well, your results will be skewed.  

> **Example:**  
> Backtesting only on today's top-performing stocks ignores the ones that didn’t survive or flourish. This can lead to an overestimation of your strategy’s real-world success.  

### 3. Trading Costs  

High-frequency strategies may seem unstoppable—until you factor in trading fees and slippage. Even small costs can erode profits over time. While its not fun or inspiring, you _can_ [incorporate trading costs into your strategy](/running/advancedbacktestoptions/).

---
:::tip[Stay Positive!]
Strong strategies do exist, but realistic expectations are key. Start with simple, robust ideas and refine them with skepticism and rigor.  
:::