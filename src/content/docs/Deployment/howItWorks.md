---
title: How it Works
description: Learn how to the trading signals are generated, live.
---

### How It Works  

**Deploy your trading strategy to the cloud and automate execution.**  

Our **beta deployment** process is designed to help you transition from backtesting to real-time execution. With this setup, your strategy can run live, making simulated trades and adapting dynamically to market data.  

### Alpaca Integration

We use **Alpaca** for trade execution. Alpaca is a commission-free trading platform that provides a robust API for algorithmic trading. Our framework generates a Python script that integrates seamlessly with Alpaca’s API, allowing for smooth execution of your trading strategy.  

### Execution Frequency

Your strategy will execute at the **desired trading frequency**, whether that’s hourly, daily, or based on specific market events. Follow our [step-by-step tutorial](deployment/tutorial) to deploy your Python script, which will run autonomously in the cloud—no manual intervention required.  

### How Your Strategy Works

At each execution interval, your script will:  

1. **Analyze Market Data** – Retrieve the latest market prices and indicators.  
2. **Generate Trading Signals** – Apply your strategy’s logic to determine whether to buy, sell, or hold.  
3. **Execute Trades** – Send orders to Alpaca’s API based on the latest signals.  

### Example: RSI Strategy

Let’s say you have an **[RSI-based strategy](examples/rsi/)**:  

- After applying your `strategy` function, the RSI is below 30 and the most recent signal calculated as a buy (`1`).
- The system automatically places trades based on these signals at your chosen frequency.  

This same process applies to any strategy you develop—whether it’s momentum-based, mean reversion, or machine-learning-driven.  

### Deploy & Monitor

Once deployed, your script will continue running on the cloud, executing trades and logging performance. You can monitor its behavior in real-time and make adjustments as needed.  

Ready to bring your strategy to life? **[Follow our tutorial to get started](deployment/tutorial/).**