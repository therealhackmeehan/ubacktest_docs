---
title: How it Works
description: Learn how to the trading signals are generated, live.
---

### Set Your Strategy Free

**Deploy your trading strategy to the cloud and automate execution.**  

Our **beta deployment** process is designed to help you transition from backtesting to real-time execution. With this setup, your strategy can run live, making simulated trades and adapting dynamically to market data.  

### Alpaca Integration

We recommend [**Alpaca**](https://alpaca.markets) for trade execution. Alpaca is a commission-free trading platform that provides a robust API for algorithmic trading. Our framework generates a Python script that integrates with Alpaca’s API (or more specifically, Alpaca's Python SDK), allowing for smooth execution of your trading strategy.  

### Automated Execution

Your strategy will execute at a **specified trading frequency**, whether that’s hourly, daily, or another interval of your choosing. Follow our [step-by-step tutorial](/deployment/tutorial/) to deploy your Python script, which will run autonomously in the cloud—no manual intervention required.  

# How does this work?

### Execution Process  

At each execution interval (e.g., daily), your script will run, performing the following steps:  

1. **Gather Market Data** – Retrieve the latest prices and indicators to assess current market conditions.  

2. **Generate Trading Signals** – Apply your beloved `strategy` function to recent market data; use the most recent signal to determine whether to **buy, sell, or hold**.  

3. **Calculate Trade Size** – Determine the number of shares to buy or sell based on your portfolio value and cash balance.  
   > **Example:** A new trading signal of **0.7** appears, and you currently hold no positions. With **$100,000 in cash**, you aim to allocate **$70,000** to the stock.
4. **Execute Trade** – Using the calculated share quantity, submit a **buy** or **sell** order through Alpaca.  

##### Example Order Submission  

```python
trading_client.submit_order(
    symbol="AAPL",
    notional=70000.00,
    side="buy",
    type="market",
    time_in_force="day",
)
```  

### What Happens if an Error Occurs?

If your strategy encounters a coding error or any other issue during execution, **your current position will remain unchanged**—no new trades will be placed.  

To ensure your strategy performs as expected, **regularly monitor your portfolio**. An error-prone strategy can severely impact its effectiveness, potentially preventing trades from being executed at all.

### How Can I Track/Monitor My Strategy?

You can monitor your orders and portfolio directly on [Alpaca](https://alpaca.markets).  

However, we understand that you may want deeper insights—whether it’s identifying where your strategy went wrong or examining specific calculations. That’s why we’ve integrated **Google Cloud Logging**, allowing you to track and analyze your strategy’s performance in detail.

This will all be covered in the [step-by-step tutorial](/deployment/tutorial/).

___

### Important Note on Fractional Trading

To execute trades based on specified dollar amounts, we rely on fractional shares. Alpaca supports this for **buy orders**, but [**fractional short selling is not yet available**](https://docs.alpaca.markets/docs/fractional-trading#:~:text=We%20do%20not%20support%20short%20sales%20in%20fractional%20orders.%20All%20fractional%20sell%20orders%20are%20marked%20long.). All short sales are rounded down to the nearest whole share. For instance, if your strategy signals a short sale of 31.55 shares of AAPL, only 31 shares will be sold. While any subsequent buy orders will rebalance your portfolio, this rounding may affect your strategy's execution.  

:::danger  
To reiterate, Alpaca does not currently support fractional short selling. As a result, all short sales and buybacks of long positions are rounded down to the nearest full share. This will impact expected performance and is one of the _key reasons why deployment remains in **BETA**_.  
:::
___

#### Ready to Rock!

We've covered the basics of the deployment process and discussed the hazards of trading with real capital. Now, you're ready to bring your strategy to life: **[Follow our tutorial to get started](tutorial/)!**