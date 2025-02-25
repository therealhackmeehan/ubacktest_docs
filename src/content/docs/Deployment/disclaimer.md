---
title: Disclaimer
description: It is risky to deploy untested strategies.
---

### **Trading with Real Money is Risky—Test First**  

At **uBacktest**, our goal is to help you build and refine your trading strategies before putting real money on the line. A strategy may look great on paper, but live market conditions introduce new challenges and risks.  

### **Beta Deployment: Trade, But Safely**  

Our **beta framework** lets you deploy your Python-based strategy in real-time market conditions—using **paper trading** to simulate actual trades without financial risk.  

### **Paper vs. Live Trading**  

- **Paper Trading (Recommended)**  
  Our system is designed for **fake/paper money**, allowing you to test your strategy in real market conditions without the risk of losing capital.  

- **Live Trading (Use at Your Own Risk)**  
  Switching from **paper trading** to **live trading** is as simple as changing the API endpoint, but this is **highly risky** without thorough testing. Even small errors—like [lookahead bias](/creating/pitfalls)—can cause real financial loss.  

### **Proceed with Caution**  

:::danger  
If you connect your deployed script to Alpaca’s live trading API, you **assume full responsibility** for any losses.  

We are **not liable** for any financial risks associated with live trading. This tool is designed strictly for **strategy testing**—not financial guarantees.  

Even minor coding mistakes or logical errors can result in significant losses.  
:::  

### **Refine Before You Risk**  

We **strongly recommend** using our framework for **paper trading first**. Testing in real market conditions—without financial exposure—lets you improve your strategy before deciding whether to trade live.