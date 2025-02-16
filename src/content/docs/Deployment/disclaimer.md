---
title: Disclaimer
description: It is risky to deploy untested strategies.
---

**Trading strategies with real capital carries significant risk.**  

### Test Before You Trade  

At **[Your Company Name]**, we are dedicated to helping you develop and test your trading strategies. We understand that once you find a promising strategy, you’ll want to see how it performs in live conditions.  

That’s why we’ve built a **beta framework** that allows you to take your Python-based strategy and apply it to real-time market data.  

### Where Do We Trade?  

We utilize and recommend **Alpaca’s API** for executing trades and strategies. Our framework generates a Python script that integrates seamlessly with your existing strategy.  

### How Does It Work?  

We provide a deployable script that interacts with Alpaca’s **Paper Trading API**. This means your strategy will execute trades in real-time—**without risking real money**—allowing you to test it safely in a simulated environment.  

### The Risks of Live Trading  

While it is technically easy to switch from **paper trading** to **live trading** by changing the API endpoint, doing so without thorough testing is **highly risky**.  

Even minor oversights—such as [lookahead bias](/creating/pitfalls) in your strategy—can lead to significant losses in real trading.  

### Using Real Money  

If you choose to connect the deployed script to Alpaca’s live trading API (which links to a real brokerage account), **you assume full responsibility for any financial risks**.  

:::danger  
We are **not liable for any losses** incurred while using our beta deployment feature with real money. This tool is designed strictly for **paper trading** and strategy testing.  

Even small logical errors that go unnoticed in backtesting could lead to major losses in both paper and live trading.  

Again, honest mistakes on both our end and your end can be devastating.
:::  

### Paper Trading is Highly Recommended  

That said, we **strongly encourage** you to use our framework for **paper trading**. Testing in live market conditions—without financial risk—is a valuable opportunity to refine your strategy before considering real trading.