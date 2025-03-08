---
title: Tutorial
description: A step by step guide to deployment.
---

# Deploy Your Trading Strategy in 8 Easy Steps

This guide will help you deploy your backtested trading strategy live with Alpaca and Google Cloud. We’ll walk you through each step, making sure everything is simple and clear.

---

### 1. Create an Alpaca Account

We use [Alpaca](https://alpaca.markets/) for commission-free trade execution with a well-maintained Python API.

**Steps:**
1. Sign up for a free account [here](https://app.alpaca.markets/signup).
2. Log in and go to the **Paper Trading** dashboard.
3. Allocate funds (e.g., $100,000) for testing.

![Alpaca Dashboard](../../../assets/alpaca_dashboard.png)

4. Generate your **API Key** and **Secret Key**.

![API keys](../../../assets/alpaca_keys.png)

---

### 2. Generate Code for Deployment

Once your strategy is backtested, you can generate the deployment code.

**Steps:**
1. Go to the strategy page in the backtesting platform.
2. Scroll to the **Deployment** section.

![Deployment Dashboard](../../../assets/light_deploy.png)

3. Fill in the required fields to match your backtest.
4. Click **Generate Code**—your strategy code will appear in the editor! You will need this code later.

:::caution  
Ensure your strategy is fully tested, as any unresolved bugs or logic gaps will carry over into the deployment script.  
:::

---

### 3. Create a Google Cloud Account

Create a Google Cloud account or log in with your existing Google account.

**Steps:**
1. Go to [Google Cloud](https://cloud.google.com/) and log in.
2. Access the **Console**.

![Cloud Dashboard](../../../assets/cloud_dashboard.png)

3. Search for **Cloud Run** and select **Cloud Run functions**.

![Search for Cloud Run](../../../assets/search_cloudrun.png)

---

### 4. Create a Cloud Function

In Google Cloud, you’ll create a function to run your trading strategy.

**Steps:**
1. Click on **Write Function**.

![Create Function](../../../assets/cloudrun_toolstrip.png)

2. Name the function (e.g., `test-ubacktest-script`).
3. Select **Python 3.12** for the runtime.
4. Set **Authentication** to **Require Authentication** (optional but recommended).
5. Click **Create** to set up the function.

![Create Function Flow](../../../assets/createService.png)

---

### 5. Copy-Paste Your Generated Code

Now, paste the generated code into the Cloud Function editor.

**Steps:**
1. Go to the **Source Code** section.

![Filler Code](../../../assets/editsource_init.png)

2. Paste your generated strategy code.

![My Code](../../../assets/editsource_python.png)

3. In the **requirements.txt** file, add dependencies like:
   - pandas
   - alpaca-py
   - numpy
   - (other required libraries)

![Reqs.txt](../../../assets/editsource_requirements.png)

4. After adding the code and dependencies, click **Deploy**. It may take a little while, but you should be sent to a home page that looks something like this:

![Successful Deploy](../../../assets/successCloudRun.png)

---

### 6. Set Environment Variables

Your strategy may need API keys or other credentials. Let’s set these up securely.

**Steps:**
1. Click **Edit & Deploy New Revision**.
2. Scroll to **Variables and Secrets**.
3. Paste your **API_KEY** and **API_SECRET** as environment variables.

![Environment Variables](../../../assets/envVars.png)

4. Click **Deploy**.

---

### 7. Set a Scheduler with Cloud Scheduler

To run your strategy on a schedule, use Google Cloud Scheduler.

**Steps:**
1. Search for **Cloud Scheduler** in the console.

![Search Cloud Scheduler](../../../assets/search_cloudscheduler.png)

2. Click **Create Job**.

![Empty Scheduler Console](../../../assets/empty_cloudscheduler.png)

3. Fill in the job details:
   - **Name**: Choose a name (e.g., `ubacktest-scheduler`).
   - **Frequency**: Set the frequency (e.g., daily at 9 AM). 
     - Here’s a quick guide to common cron-style frequency formats:
       - **`* * * * *`**: Every minute
       - **`*/5 * * * *`**: Every 5 minutes
       - **`*/15 * * * *`**: Every 15 minutes
       - **`*/30 * * * *`**: Every 30 minutes
       - **`0 * * * *`**: Every hour on the hour
       - **`0 9 * * *`**: Daily at 9 AM
       - **`0 0 * * *`**: Daily at midnight
       - **`0 0 1 * *`**: First day of every month at midnight

      :::caution
      This frequency must match that of the frequency you specified when generating code!
      :::

   - **Target**: Choose **HTTP** and enter your function’s URL. Your Cloud Run Function's URL can be found at the top of its home page:

![target](../../../assets/identifyURL.png)

4. Click **Create** to save the schedule.

![Set up cloud scheduler](../../../assets/defineSchedule.png)

---

# That's it! Your Strategy is Live!

By following these 7 steps, your trading strategy will be live on Alpaca and Google Cloud. 

[On the next page](./monitor), we will show you how to and make adjustments as needed to optimize your real-world trading!